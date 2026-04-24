import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { getIdToken } from "../../auth/accessTokenOptions.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
                  alert("Feedback submitted successfully.");
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



      <Footer />
    </>
  );
}
