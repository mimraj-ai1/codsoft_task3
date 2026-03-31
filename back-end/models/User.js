const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  completedVideos: [{ type: Number }],
  lastWatchedIndex: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  auth0_id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  enrolledCourses: [{ type: String }],
  courseProgress: [progressSchema],
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
