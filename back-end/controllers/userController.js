const User = require("../models/User");
const logger = require("../logger");

// ─── Enroll in a Course ───────────────────────────────────────────────────────
const enrollCourse = async (req, res) => {
  try {
    const auth0_id = req.auth.payload.sub;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    const user = await User.findOneAndUpdate(
      { auth0_id },
      { $addToSet: { enrolledCourses: courseId } }, // $addToSet prevents duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found in DB. Did you sync profile?" });
    }

    res.status(200).json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    logger.error("Failed to enroll course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ─── Get User Profile ─────────────────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const auth0_id = req.auth.payload.sub;
    
    // Find user in MongoDB using Auth0 Sub token
    const user = await User.findOne({ auth0_id });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    logger.error("Failed to fetch profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ─── Update Video Progress ────────────────────────────────────────────────────
const updateProgress = async (req, res) => {
  try {
    const auth0_id = req.auth.payload.sub;
    const { courseId, videoIndex } = req.body;

    if (!courseId || videoIndex === undefined) {
      return res.status(400).json({ message: "courseId and videoIndex are required." });
    }

    // 1. Find user and check if the course progress object already exists
    const user = await User.findOne({ auth0_id });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const progressIndex = user.courseProgress.findIndex(p => p.courseId === courseId);

    if (progressIndex > -1) {
      // Exists: Update it
      // if videoIndex wasn't previously completed, we push it
      if (!user.courseProgress[progressIndex].completedVideos.includes(videoIndex)) {
        user.courseProgress[progressIndex].completedVideos.push(videoIndex);
      }
      user.courseProgress[progressIndex].lastWatchedIndex = videoIndex;
    } else {
      // Doesn't exist: Create it natively
      user.courseProgress.push({
        courseId,
        completedVideos: [videoIndex],
        lastWatchedIndex: videoIndex
      });
    }

    await user.save();

    res.status(200).json({ success: true, courseProgress: user.courseProgress });
  } catch (error) {
    logger.error("Failed to update progress:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  enrollCourse,
  getProfile,
  updateProgress
};
