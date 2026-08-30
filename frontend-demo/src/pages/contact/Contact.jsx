import { apiUrl } from "../../config/api";
import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    captcha: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setShowSuccess(false);

    try {
      await axios.post(apiUrl("/api/public/feedback"), formData);
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        message: "",
        captcha: "",
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      setError("Failed to submit message. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      <section className="hero">
        <h1>Contact Nexera</h1>
        <p>We're here to guide you toward your future!</p>
      </section>

      <div className="main-contact main-container">
        <div className="info-section">
          <div className="section-header">
            <h1>Get In Touch With Us Now!</h1>
            <img
              src="contact-left.jpg"
              alt="Contact Info"
              className="header-image"
            />
          </div>
          <div className="main">
            <div className="info-grid">
              <div className="info-card">
                <i className="fas fa-phone"></i>
                <h4>Phone Number</h4>
                <p>+92 321 9876540</p>
              </div>
              <div className="info-card">
                <i className="fas fa-envelope"></i>
                <h4>Email</h4>
                <p>nexera@gmail.com</p>
              </div>
              <div className="info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h4>Location</h4>
                <p>Faisalabad, Pakistan</p>
              </div>
              <div className="info-card">
                <i className="fas fa-clock"></i>
                <h4>Working Hours</h4>
                <p>
                  Mon - Sat
                  <br />
                  09:00 AM to 06:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="section-header">
            <h2>We’d Love to Hear From You!</h2>
            <p>
              Whether you have a question or just want to say hi, drop us a
              message!
            </p>
          </div>

          {/* Success Message */}
          <div
            className={`bg-green-500 text-black p-2 text-sm font-semibold rounded mb-4 transition-all duration-300 ${
              showSuccess ? "block" : "hidden"
            }`}
          >
            Message sent successfully!
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

          <form onSubmit={handleFormSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile No"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <label>Please type the characters *</label>
            <div className="form-row">
              <div className="captcha-box">p s t 5 s</div>
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                required
              />
            </div>

            <p style={{ fontSize: "12px", color: "#bbb" }}>
              This helps us prevent spam. Thank you!
            </p>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13603.52790910575!2d73.0788498!3d31.4184717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392241b0af1eb149%3A0xc0e9ae21859e07d4!2sFaisalabad!5e0!3m2!1sen!2s!4v1712581234567"
              width="100%"
              height="250"
              style={{ border: 0, marginTop: "30px", borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Faisalabad Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
