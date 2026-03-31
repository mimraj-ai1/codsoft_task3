import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import coursesData from "../../data/coursesData";

export default function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const response = await axios.get(`${API_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user) {
            setUserProfile(response.data.user);
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      <Navbar />

      {/* {isAuthenticated && (
                <>
                    <img src={user.picture} alt={user.name} />
                    <h1>{user.name}</h1>
                    <h1>{user.email}</h1>

                </>

            )} */}

      {isAuthenticated && (
        <>
          <section style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5">
              {/* <MDBRow>
                        <MDBCol>
                            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                <MDBBreadcrumbItem>
                                    <a href='#'>Home</a>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem>
                                    <a href="#">User</a>
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                            </MDBBreadcrumb>
                            </MDBCol>
                        </MDBRow> */}

              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        src={user.picture}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                      <p className="text-muted mb-1 mt-1">
                        Full Stack Developer
                      </p>
                      <p className="text-muted mb-4">
                        Chennai, Tamilnadu, India
                      </p>
                      {/* <div className="d-flex justify-content-center mb-2">
                                                <MDBBtn>Follow</MDBBtn>
                                                <MDBBtn outline className="ms-1">Message</MDBBtn>
                                            </div> */}
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                      <MDBListGroup flush className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fas icon="globe fa-lg text-warning" />
                          <MDBCardText>https://eLearining.com</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="github fa-lg"
                            style={{ color: "#333333" }}
                          />
                          <MDBCardText>Tr.-goswami</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="twitter fa-lg"
                            style={{ color: "#55acee" }}
                          />
                          <MDBCardText>@basantgoswmai_</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="instagram fa-lg"
                            style={{ color: "#ac2bac" }}
                          />
                          <MDBCardText>Tr..bharati.54</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon
                            fab
                            icon="facebook fa-lg"
                            style={{ color: "#3b5998" }}
                          />
                          <MDBCardText>Tr. bharati</MDBCardText>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.name}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>User Id</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.sub}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            +91 997 7XX XXXX
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            Chennai, Tamilnadu, India
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBRow>
                    <MDBCol md="12">
                      <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                          <MDBCardText className="mb-4">
                            <span className="text-primary font-italic me-1">
                              dashboard
                            </span>{" "}
                            My Learning
                          </MDBCardText>
                          
                          <div className="row g-3">
                            {userProfile && userProfile.enrolledCourses && userProfile.enrolledCourses.length > 0 ? (
                              userProfile.enrolledCourses.map((courseId) => {
                                const course = coursesData[courseId];
                                if (!course) return null;

                                const allProgress = userProfile.courseProgress || [];
                                const progressObj = allProgress.find(p => p.courseId === courseId);
                                const completedCount = progressObj ? progressObj.completedVideos.length : 0;
                                const totalVideos = course.videos ? course.videos.length : 1;
                                const progressPercentage = Math.round((completedCount / totalVideos) * 100);

                                let continueText = "Start Learning";
                                if (progressObj && progressObj.lastWatchedIndex !== undefined && course.videos) {
                                    const nextIndex = progressObj.lastWatchedIndex + 1;
                                    if (nextIndex < totalVideos) {
                                        continueText = `Next: ${course.videos[nextIndex].title}`;
                                    } else if (progressPercentage >= 100) {
                                        continueText = "Course Completed 🎉";
                                    } else {
                                        continueText = "Continue Learning";
                                    }
                                }

                                return (
                                  <div className="col-md-6" key={courseId}>
                                    <div className="card h-100 p-3 shadow-sm border-0 bg-light">
                                      <h5 className="mb-1">{course.title}</h5>
                                      <p className="text-muted small mb-3">
                                        {course.videos?.length || 0} Modules
                                      </p>
                                      
                                      <div className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                          <span className="small text-muted">{progressPercentage}% Completed</span>
                                          <span className="small text-muted">{completedCount}/{totalVideos}</span>
                                        </div>
                                        <div className="progress" style={{ height: "6px" }}>
                                          <div 
                                            className={`progress-bar ${progressPercentage === 100 ? 'bg-success' : 'bg-primary'}`} 
                                            role="progressbar" 
                                            style={{ width: `${progressPercentage}%` }}
                                          ></div>
                                        </div>
                                      </div>

                                      {progressPercentage < 100 && (
                                        <p className="small text-truncate text-secondary mb-3">
                                          <i className="fas fa-play-circle me-1"></i> {continueText}
                                        </p>
                                      )}

                                      <Link to={`/course/${courseId}`} className="btn btn-sm btn-outline-primary mt-auto">
                                        {progressPercentage === 100 ? "Review Course" : "Resume Learning"}
                                      </Link>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-muted mt-3">You have not enrolled in any courses yet.</p>
                            )}
                          </div>

                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
