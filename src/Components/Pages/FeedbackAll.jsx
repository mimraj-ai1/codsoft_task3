import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { getIdToken } from "../../auth/accessTokenOptions.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function FeedbackAll() {
  const [value, setValue] = React.useState(2);
  const [feedbackData, setFeedbackData] = useState([]);
  const { getIdTokenClaims, isAuthenticated, loginWithRedirect, user } = useAuth0();

  const fetchFeedback = React.useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/feedback`);
      const data = await response.json();
      setFeedbackData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleDelete = async (id) => {
    try {
      const token = await getIdToken(getIdTokenClaims);
      const res = await fetch(`${API_BASE}/feedback/${id}`, { 
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setFeedbackData((prev) => prev.filter((f) => f._id !== id));
      } else {
        alert("You are not authorized to delete this feedback.");
      }
    } catch (error) {
      console.error(error);
      alert("Please log in to perform this action.");
    }
  };

  function formatDate(date) {
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // hour12: true,
    });
  }

  return (
    <>
      <Navbar />
      <Header name="Feedbacks" />

      {/* feedback form */}
      <div className="container mt-4">
        <div className="row mt-4 wow fadeInUp" data-wow-delay="0.3s">
          <h1 className="text-center">Give your Feedback</h1>
          <form
            className="col-md-6 offset-md-3 mb-4 wow fadeInUp"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              if (!isAuthenticated) {
                alert("Please log in to post feedback.");
                loginWithRedirect();
                return;
              }
              const body = {
                name: form.name.value,
                comment: form.comment.value,
                image: form.image.value || undefined,
                rating: value,
                date: new Date().toISOString(),
              };
              try {
                const token = await getIdToken(getIdTokenClaims);
                const res = await fetch(`${API_BASE}/feedback/new`, {
                  method: "POST",
                  headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify(body),
                });

                if (res.ok) {
                  // --- START: Web3Forms Email Notification ---
                  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
                  if (web3formsKey) {
                    const notifyData = new FormData();
                    notifyData.append("access_key", web3formsKey);
                    notifyData.append("subject", "Feedback Received - OnLearny");
                    notifyData.append("from_name", "OnLearny Support");
                    notifyData.append("email", user?.email); // User email for auto-response
                    notifyData.append("message", `Hi ${body.name}, thank you for your feedback: "${body.comment}" with a rating of ${body.rating}/5. Your input helps us improve!`);
                    
                    fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: notifyData,
                    }).catch(e => console.error("Notification failed", e));
                  }
                  // --- END: Web3Forms Email Notification ---

                  form.reset();
                  setValue(2);
                  fetchFeedback();
                  alert("Feedback submitted successfully! A confirmation email has been sent.");
                } else {
                  const errorData = await res.json().catch(() => ({}));
                  alert(`Failed to post feedback: ${errorData.message || "Please make sure your profile is synced (logged in & updated)."}`);
                }
              } catch (err) {
                console.error(err);
                alert("Please log in to post feedback.");
              }
            }}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                id="feedbackName"
                placeholder="John Deo"
                required
              />
              <label htmlFor="feedbackName">Name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                name="comment"
                className="form-control"
                id="feedbackComment"
                placeholder="Enter Your Feedback"
                style={{ height: "100px" }}
                required
              />
              <label htmlFor="feedbackComment">Comment</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="image"
                className="form-control"
                id="feedbackImage"
                placeholder="Enter Your Image URL"
              />
              <label htmlFor="feedbackImage">Image Url</label>
            </div>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue ?? 2);
              }}
            />
            <br />
            <button type="submit" className="btn btn-primary">Submit</button>
            <hr />
          </form>
        </div>
      </div>

      <div className="text-center wow fadeInUp" data-wow-delay="0.3s">
        <h6 className="section-title bg-white text-center text-primary px-3">
          All Feedbacks of Users
        </h6>
        <h1 className="mb-5">All Feedbacks</h1>
      </div>

      <div className="row offset-md-2">
        {Array.isArray(feedbackData) && feedbackData.map((feedback) => (
          <div
            key={feedback._id}
            className="col-md-5 ms-2 mt-3 card mb-3 pl-2 wow fadeInUp"
            style={{ maxWidth: "540px" }}
            data-wow-delay="0.3s"
          >
            <button
              type="button"
              className="btn btn-link p-0 position-absolute top-0 end-0 text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(feedback._id)}
              aria-label="Delete feedback"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="row g-0">
              <div className="col-md-3 mt-3">
                <img
                  style={{ width: "6rem", height: "6rem" }}
                  src={feedback.image}
                  className="d-block border rounded-circle p-2 mx-auto mb-3"
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <p className="card-text mb-0 ps-3">
                  <small className="text-body-secondary">
                    {formatDate(new Date(feedback.date))}
                  </small>
                </p>
                <div className="card-body pt-0 mt-0">
                  <p className="card-text p-0 fw-bold">{feedback.name}</p>
                  <p className="card-text">{feedback.comment}</p>
                  <Rating name="read-only" value={feedback.rating} readOnly />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
