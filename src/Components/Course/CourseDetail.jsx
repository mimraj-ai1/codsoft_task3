import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../Pages/Navbar';
import Footer from '../Pages/Footer';
import Coursecart from './Coursecart';
import coursesData from '../../data/coursesData';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = coursesData[courseId];

  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [isEnrolled, setIsEnrolled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [completedVideos, setCompletedVideos] = React.useState([]);

  React.useEffect(() => {
    const checkEnrollment = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const response = await axios.get(`${API_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user && response.data.user.enrolledCourses.includes(courseId)) {
            setIsEnrolled(true);
          }
          if (response.data.user && response.data.user.courseProgress) {
             const progress = response.data.user.courseProgress.find(p => p.courseId === courseId);
             if (progress && progress.completedVideos) {
                setCompletedVideos(progress.completedVideos);
             }
          }
        } catch (error) {
          console.error("Error checking enrollment:", error);
        }
      }
    };
    checkEnrollment();
  }, [isAuthenticated, courseId, getAccessTokenSilently]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      return loginWithRedirect();
    }
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(
        `${API_URL}/api/user/enroll`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEnrolled(true);
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Enrollment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteVideo = async (videoIndex) => {
    try {
      if (!completedVideos.includes(videoIndex)) {
         setCompletedVideos([...completedVideos, videoIndex]);
      }
      const token = await getAccessTokenSilently();
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(
        `${API_URL}/api/user/progress`,
        { courseId, videoIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="text-center wow fadeInUp mt-5" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Course</h6>
          <h1 className="mb-4">{course.title}</h1>
          
          <div className="mb-5">
            {isEnrolled ? (
              <button className="btn btn-success py-md-3 px-md-5 fw-bold" disabled>
                Enrolled ✅
              </button>
            ) : (
              <button 
                className="btn btn-primary py-md-3 px-md-5 fw-bold" 
                onClick={handleEnroll}
                disabled={loading}
              >
                {loading ? "Enrolling..." : "Enroll Now"}
              </button>
            )}
          </div>
        </div>
        
        <div className="container mt-6 d-flex justify-content-center w-100">
          <div className="row row-cols-1 row-cols-md-2 g-3 d-flex justify-content-center w-100">
            {course.videos && course.videos.length > 0 ? (
              course.videos.map((video, index) => (
                <Coursecart 
                  key={index}
                  link={video.link}
                  title={video.title}
                  desc={video.desc}
                  isEnrolled={isEnrolled}
                  isCompleted={completedVideos.includes(index)}
                  onComplete={() => handleCompleteVideo(index)}
                />
              ))
            ) : (
              <p className="text-center">No video content available for this course yet.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
