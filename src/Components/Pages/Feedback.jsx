import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { accessTokenSilentlyOpts } from "../../auth/accessTokenOptions.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Feedback() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please log in to submit feedback!");
      loginWithRedirect();
      return;
    }

    const form = e.target;
    
    const body = {
      name: form.name.value,
      image: form.image.value || undefined,
      comment: form.comment.value,
      rating: 5, 
      date: new Date().toISOString(),
    };

    try {
      const token = await getAccessTokenSilently(accessTokenSilentlyOpts());
      const res = await fetch(`${API_BASE}/feedback/new`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        navigate("/feedback");
        alert("Feedback submitted successfully!");
        form.reset();
      } else {
        const errorData = await res.json();
        alert(`Failed to submit: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please make sure you are logged in.");
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center mt-4">Give your Feedback</h1>
      <div className="feedback vh-100 d-flex justify-content-center">
        {!isAuthenticated ? (
          <div className="text-center mt-5">
            <p className="lead">You must be logged in to provide feedback.</p>
            <button 
              className="btn btn-primary px-5 py-3" 
              onClick={() => loginWithRedirect()}
            >
              Log In to Continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-50 mt-4">
            <input
              className="form-control mb-3"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              defaultValue={user?.name}
              required
            />
            <input
              className="form-control mb-3"
              type="text"
              name="image"
              id="image"
              placeholder="Image URL (optional)"
              defaultValue={user?.picture}
            />
            <textarea
              className="form-control mb-3"
              name="comment"
              id="comment"
              cols="50"
              rows="5"
              placeholder="Your comment..."
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
