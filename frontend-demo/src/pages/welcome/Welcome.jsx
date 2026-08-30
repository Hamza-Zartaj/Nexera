import React from "react";
import "./Welcome.css";

const Home = () => {
  return (
    <main className="hero welcome-page">
      <h1>Unlock Your Future with Nexera</h1>
      <p>
        Smart career decisions start here. <br />
        Explore paths, get expert guidance, and transform your potential.
        <br />
      </p>
      <p>Join thousands of learners shaping their careers today.</p>
      <a href="/Home" className="btn">
        Get Started
      </a>
    </main>
  );
};

export default Home;
