import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date.toDateString();
    });
  };

  const times = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time.");
      return;
    }

    navigate("/user/appointment");
  };

  return (
    <div className="appointment-page">
      <section className="hero-section">
        <h1>Book Your Career Counseling Session</h1>
        <p>Pick your date and time for expert guidance.</p>
      </section>
      <div className="main">
        <section className="main-contact">
          <div className="info-section">
            <h3 className="section-heading">Choose a Date</h3>
            <div className="info-grid">
              {generateDates().map((date) => (
                <button
                  key={date}
                  className="submit-btn"
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>

            <h3 className="section-heading">Choose a Time</h3>
            <div className="info-grid">
              {times.map((time) => (
                <button
                  key={time}
                  className="submit-btn"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="form-title">Confirm Your Booking</div>
            <div className="form-subtitle">
              Please fill in your details below
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Selected Date"
                  value={selectedDate}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Selected Time"
                  value={selectedTime}
                  readOnly
                />
              </div>
              <textarea placeholder="Notes (optional)"></textarea>
              <div className="captcha-box">Q3X9F</div>
              <p className="captcha-note">
                Enter the above code when prompted.
              </p>
              <button type="submit" className="submit-btn">
                Confirm Appointment
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
        </section>

        <section className="pricing">
          <div className="section-header">
            <h2>Pricing (PKR)</h2>
            <p>Transparent and affordable session fees.</p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <h4>Career Counseling</h4>
              <p>₨ 3,000+</p>
            </div>
            <div className="info-card">
              <h4>Uni Admission Help</h4>
              <p>₨ 4,500+</p>
            </div>
            <div className="info-card">
              <h4>Resume/CV Review</h4>
              <p>₨ 2,000+</p>
            </div>
            <div className="info-card">
              <h4>Interview Coaching</h4>
              <p>₨ 3,500+</p>
            </div>
            <div className="info-card">
              <h4>LinkedIn Profile</h4>
              <p>₨ 2,500+</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Appointment;
