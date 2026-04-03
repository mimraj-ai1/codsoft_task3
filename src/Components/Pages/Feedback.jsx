import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { accessTokenSilentlyOpts } from "../../auth/accessTokenOptions.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Feedback() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        alert("Failed to submit. Please ensure you are logged in!");
      }
    } catch (err) {
      console.error(err);
      alert("Please log in to submit feedback.");
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center mt-4">Give your Feedback</h1>
      <div className="feedback vh-100 d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="w-50 mt-4">
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            required
          />
          <input
            className="form-control mb-3"
            type="text"
            name="image"
            id="image"
            placeholder="Image URL (optional)"
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
      </div>
      <Footer />
    </>
  );
}
