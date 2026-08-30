import { apiUrl } from "../../config/api";
import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";
const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // <== for hidden div

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setShowSuccess(false);

    try {
      await axios.post(apiUrl("/api/public/feedback"), formData);
      setFormData({ name: "", email: "", message: "" });

      // Show success message for 3 seconds
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setErrors({ submit: "Failed to submit feedback." });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="feedback">
      <div className="form-section">
        <div className="nexera-header">Nexera</div>
        <div className="form-container">
          <h2>Feedback</h2>
          <p>We would love to hear your thoughts and suggestions!</p>

          <div
            className={`bg-green-500 text-black p-2 text-sm font-semibold rounded mb-4 transition-all duration-300 ${
              showSuccess ? "block" : "hidden"
            }`}
          >
            Feedback submitted successfully!
          </div>

          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Feedback"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            {errors.submit && <div className="error">{errors.submit}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <div className="image-section">
        <img src="feedback.jpg" alt="Feedback Pic" />
      </div>
    </div>
  );
};

export default Feedback;
