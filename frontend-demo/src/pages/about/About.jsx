import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="animated-heading">
            <span className="char from-top" style={{ animationDelay: "0s" }}>
              W
            </span>
            <span className="word" style={{ animationDelay: "0.1s" }}>
              elcome
            </span>

            <span className="char" style={{ animationDelay: "0.7s" }}>
              &nbsp;
            </span>
            <span
              className="char from-right"
              style={{ animationDelay: "0.5s" }}
            >
              t
            </span>
            <span className="word">o</span>
            <span
              className="char from-bottom"
              style={{ animationDelay: "0.9s" }}
            >
              &nbsp;
            </span>
            <span className="char from-top" style={{ animationDelay: "0.9s" }}>
              N
            </span>
            <span className="word">exer</span>

            <span
              className="char from-bottom"
              style={{ animationDelay: "0.9" }}
            >
              a
            </span>
          </h1>

          <p>Your partner in career growth and guidance.</p>
          <a href="#about" className="cta-btn">
            Learn More
          </a>
        </div>
      </section>

      <div className="top-level-container">
        <div className="main-container">
          <section id="about" className="about-grid">
            <div className="about-image left-image">
              <img src="left-image.jpg" alt="Left side" />
            </div>

            <div className="about-text">
              <h2>About Nexera</h2>
              <p>
                Nexera is a forward-thinking company focused on delivering
                innovative tech solutions that simplify complex challenges. With
                a passion for progress and a commitment to excellence, Nexera is
                reshaping the future of technology.
              </p>
            </div>

            <div className="about-image right-image">
              <img src="right-image.jpg" alt="Right side" />
            </div>
          </section>

          <section className="about-grid">
            <div className="block block1">
              <h2>Our Mission</h2>
              <p>
                Helping you find your true path through personalized career
                guidance and growth support. At Nexera, we understand that every
                individual’s journey is unique. That’s why we offer tailored
                career paths, mentorship, and skills development programs to
                unlock your full potential. Whether you're a student, a
                professional in transition, or someone seeking clarity, we’re
                here to walk with you every step of the way.
              </p>
            </div>

            <div className="block block2"></div>

            <div className="block block3">
              <h3>Founding Story</h3>
            </div>

            <div className="block block4">
              <p>
                Nexera was born from a simple realization — too many talented
                individuals feel lost in their career journey. Our founders,
                coming from diverse industries, saw a need for a bridge between
                ambition and direction. Through conversations, community input,
                and collaboration with career experts, Nexera became more than a
                platform — it became a purpose-driven space where people gain
                clarity and courage to move forward.
              </p>
            </div>

            <div className="block block5">
              <p>
                Built for dreamers. Backed by experts. Every feature of Nexera —
                from self-assessment tools to live coaching — is designed by
                professionals who have walked the path. We’re not just advisors;
                we’re companions on your career journey.
              </p>
            </div>

            <div className="block block6">
              <section id="about" className="about-grid">
                <div className="about-image.jpg"></div>
              </section>
            </div>

            <div className="block block7">
              <h2>Our Journey</h2>
              <p>
                From a vision to a community, Nexera grew through trust and
                transformation—serving individuals from different walks of life
                in discovering what’s next. Over the years, we’ve partnered with
                universities, corporate mentors, and psychologists to build a
                solid ecosystem of support. Today, Nexera serves thousands
                globally — helping people not just find jobs, but find
                themselves in their work.
              </p>
            </div>
          </section>

          <div className="text">
            <h2>Our Core Values</h2>
            <div className="values">
              <div className="value-card">
                <h3>Empathy</h3>
                <p>
                  We listen deeply and meet people where they are, with
                  compassion and care. Every client is treated as an individual,
                  not a number. We make space for stories, emotions, and dreams
                  that shape career choices.
                </p>
              </div>
              <div className="value-card">
                <h3>Integrity</h3>
                <p>
                  We offer honest advice and maintain ethical standards in every
                  step of the journey. Trust is the backbone of our personalized
                  guidance, and we never compromise on transparency,
                  authenticity, or values.
                </p>
              </div>
              <div className="value-card">
                <h3>Innovation</h3>
                <p>
                  We blend psychology, technology, and industry insights to
                  offer cutting-edge guidance. Our tools evolve with the world
                  of work, ensuring clients always receive the most relevant
                  advice.
                </p>
              </div>
              <div className="value-card">
                <h3>Growth</h3>
                <p>
                  We champion continuous learning, both for our clients and
                  ourselves. We believe that every experience holds a lesson,
                  and with the right mindset, everyone can grow beyond limits.
                </p>
              </div>
            </div>
          </div>

          <div className="cta">
            <p>
              We are always here for you, just a call away. Whether you’re
              seeking advice, direction, or simply someone to talk to about your
              goals — Nexera is your guide and your ally.
            </p>
            <a href="/contact">Start Your Journey</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
