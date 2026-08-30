import { apiUrl } from "../../config/api";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setShowSuccess(false);

    try {
      await axios.post(apiUrl("/api/public/contact"), formData);
      setFormData({ name: "", email: "", service: "", message: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Services data
  const services = [
    {
      title: "Career Assessment",
      number: "01",
      description:
        "Discover your strengths, interests, and ideal career paths through comprehensive assessments...",
    },
    {
      title: "Career Planning",
      number: "02",
      description:
        "Develop a strategic roadmap to achieve your short and long-term career objectives...",
    },
    {
      title: "Interview Coaching",
      number: "03",
      description:
        "Master the art of interviewing with personalized coaching and mock interview sessions...",
    },
    {
      title: "Resume Writing",
      number: "04",
      description:
        "Create a compelling resume that highlights your skills and experiences to stand out to employers...",
    },
  ];

  // Products data
  const products = [
    {
      title: "Career Compass",
      price: "Rs. 25,000",
      description:
        "Our flagship assessment tool that analyzes your skills, interests, values, and personality...",
    },
    {
      title: "Interview Simulator",
      price: "Rs. 10,000",
      description:
        "An AI-powered platform that simulates real interview scenarios for over 500 different positions...",
    },
    {
      title: "Career Mastery",
      price: "Rs. 50,000",
      description:
        "A comprehensive online course featuring 50+ video lessons, worksheets, and exercises...",
    },
  ];

  // Success stories data
  const successStories = [
    {
      name: "Fatima Ahmed",
      position: "Marketing Director",
      quote:
        "Nexera helped me transition from a stagnant role to a leadership position in marketing...",
      image: "girl.jpeg",
    },
    {
      name: "Ali Hassan",
      position: "Software Engineer",
      quote:
        "The career assessment helped me identify my strengths and find a role that truly aligns...",
      image: "boy.jpeg",
    },
    {
      name: "Zainab Khan",
      position: "Healthcare Administrator",
      quote:
        "The interview coaching was game-changing. I went from being nervous and unprepared...",
      image: "girl2.jpeg",
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: "10 Skills That Will Be in High Demand in Pakistan in 2024",
      category: "Career Development",
      date: "June 12, 2023",
      excerpt:
        "Stay ahead of the curve by developing these in-demand skills that Pakistani employers will be looking for...",
      image: "career.jpeg",
    },
    {
      title: "How to Answer the 'What's Your Weakness?' Question",
      category: "Interview Tips",
      date: "May 28, 2023",
      excerpt:
        "Master this challenging interview question with our expert strategies and example answers...",
      image: "weakness.avif",
    },
    {
      title: "Making a Successful Mid-Career Transition in Pakistan",
      category: "Career Change",
      date: "April 15, 2023",
      excerpt:
        "A step-by-step guide to navigating a career change in your 30s, 40s, or beyond...",
      image: "successfull.jpg",
    },
  ];

  return (
    <div className="home-page">
      <div className="noise-overlay"></div>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-text">Career Counseling</span>
              </div>
              <h1 className="hero-title">
                SHAPE
                <br />
                YOUR
                <br />
                <span className="hero-title-highlight">FUTURE</span>
              </h1>
              <p className="hero-description">
                Professional career guidance to help you discover your potential
                and achieve your career goals.
              </p>
              <div className="hero-buttons">
                <a href="#contact" className="btn btn-primary">
                  Contact Us For Details
                </a>
                <a href="/contact" className="btn btn-outline">
                  Book Appointment
                </a>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-border"></div>
              <div className="hero-image-container">
                <img
                  src="nexera.png"
                  alt="Career professional"
                  className="hero-image"
                  loading="lazy"
                />
                <div className="hero-image-gradient"></div>
                <div className="hero-image-overlay"></div>
                <div className="hero-image-light"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="main">
        {/* Mission & Vision Section */}
        <div id="mission-vision" className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-number">02</span>
                <h2 className="section-title">MISSION & VISION</h2>
              </div>
              <p className="section-description">
                Our purpose and the future we're working to create.
              </p>
            </div>

            <div className="mission-vision-grid">
              <div className="mission-vision-card">
                <div className="mission-vision-card-border"></div>
                <div className="mission-vision-card-inner">
                  <div className="mission-vision-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <h3 className="mission-vision-title">Our Mission</h3>
                  <p className="mission-vision-text">
                    To empower Pakistani youth to discover and pursue fulfilling
                    career paths that align with their unique strengths, values,
                    and aspirations.
                  </p>
                  <p className="mission-vision-subtext">
                    We are committed to providing personalized guidance,
                    cutting-edge resources, and unwavering support to help our
                    clients navigate the complexities of Pakistan's job market
                    and achieve their professional goals.
                  </p>
                </div>
              </div>

              <div className="mission-vision-card">
                <div className="mission-vision-card-border"></div>
                <div className="mission-vision-card-inner">
                  <div className="mission-vision-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <h3 className="mission-vision-title">Our Vision</h3>
                  <p className="mission-vision-text">
                    To create a Pakistan where every individual has the
                    opportunity to build a career that brings them purpose,
                    fulfillment, and success.
                  </p>
                  <p className="mission-vision-subtext">
                    We envision a future where career decisions are made with
                    confidence, where professional growth is accessible to all
                    Pakistanis, and where work becomes a source of meaning and
                    satisfaction in people's lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div id="our-story" className="section section-alt">
          <div
            className="hero-gradient"
            style={{ bottom: "25%", left: "25%", top: "auto" }}
          ></div>
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-number">03</span>
                <h2 className="section-title">OUR STORY</h2>
              </div>
              <p className="section-description">
                The journey that brought us to where we are today.
              </p>
            </div>

            <div className="story-grid">
              <div className="story-image-wrapper">
                <div className="story-image-border"></div>
                <div className="story-image-container">
                  <img
                    src="nexerastory.png"
                    alt="Our Story"
                    className="story-image"
                    loading="lazy"
                  />
                  <div className="story-image-gradient"></div>
                  <div className="story-image-overlay"></div>
                </div>
              </div>

              <div className="story-timeline">
                {[
                  {
                    title: "2008 - The Beginning",
                    text: "Nexera was founded by Dr. Ayesha Khan, a career psychologist with a vision to transform how Pakistanis approach their professional lives...",
                  },
                  {
                    title: "2013 - Expansion",
                    text: "After five years of consistent growth, we expanded our services to include corporate career development programs...",
                  },
                  {
                    title: "2018 - Digital Transformation",
                    text: "Recognizing the changing landscape, we launched our digital platform, making our services accessible to clients throughout Pakistan...",
                  },
                  {
                    title: "Today - Digital Transformation",
                    text: "Now with over 50 career experts and a presence in 12 cities across Pakistan, Nexera continues to lead the industry...",
                  },
                ].map((item, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-item-bg"></div>
                    <div className="timeline-item-inner">
                      <div className="timeline-content">
                        <div className="timeline-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </div>
                        <div>
                          <h3 className="timeline-title">{item.title}</h3>
                          <p className="timeline-text">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-number">04</span>
                <h2 className="section-title">SERVICES</h2>
              </div>
              <p className="section-description">
                Personalized career solutions for your goals.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-card-bg"></div>
                  <div className="service-card-inner">
                    <div className="service-header">
                      <h3 className="service-title">{service.title}</h3>
                      <span className="service-number">{service.number}</span>
                    </div>
                    <p className="service-description">{service.description}</p>
                    <a href="#" className="btn-ghost">
                      <Link to="/contact" className="btn btn-primary">
                        Learn More
                      </Link>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div id="products" className="section section-alt">
          <div
            className="hero-gradient"
            style={{ top: "50%", right: "25%" }}
          ></div>
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-number">05</span>
                <h2 className="section-title" style={{ textAlign: "left" }}>
                  OUR PRODUCTS
                </h2>
              </div>
              <p className="section-description">
                Career-boosting tools and resources.
              </p>
            </div>

            <div className="products-grid">
              {products.map((product, index) => (
                <div className="product-card" key={index}>
                  <div className="product-card-bg"></div>
                  <div className="product-card-inner">
                    <div className="product-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                        <line x1="12" y1="22" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      <Link to="/contact" className="btn btn-primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="section">
          <div className="container">
            <div className="about-grid">
              <div>
                <span className="section-number">06</span>
                <h2 className="about-section-title">
                  ABOUT
                  <br />
                  NEXERA
                </h2>

                <div className="about-image-wrapper">
                  <div className="about-image-border"></div>
                  <div className="about-image-container">
                    <img
                      src="about.jpeg"
                      alt="About Nexera"
                      className="about-image"
                      loading="lazy"
                    />
                    <div className="about-image-gradient"></div>
                    <div className="about-image-overlay"></div>
                  </div>
                </div>
              </div>

              <div>
                <p className="about-description">
                  Certified counselors offering expert career guidance evolving
                  job market.
                </p>

                <div className="about-features">
                  <div className="about-feature">
                    <h3 className="about-feature-title">
                      Certified Professionals
                    </h3>
                    <p className="about-feature-text">
                      Our team consists of certified career counselors with
                      extensive industry experience in Pakistan.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3 className="about-feature-title">
                      Personalized Approach
                    </h3>
                    <p className="about-feature-text">
                      We tailor our services to your unique needs, goals, and
                      circumstances within the Pakistani context.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3 className="about-feature-title">Proven Results</h3>
                    <p className="about-feature-text">
                      Our clients consistently achieve their career goals and
                      secure their dream positions in top Pakistani companies.
                    </p>
                  </div>

                  <div className="about-feature">
                    <h3 className="about-feature-title">
                      Industry Connections
                    </h3>
                    <p className="about-feature-text">
                      We maintain strong relationships with employers across
                      various industries throughout Pakistan.
                    </p>
                  </div>
                </div>

                <div className="about-stats">
                  <div className="about-stat">
                    <div className="about-stat-number">15+</div>
                    <div className="about-stat-label">Years Experience</div>
                  </div>

                  <div className="about-stat">
                    <div className="about-stat-number">95%</div>
                    <div className="about-stat-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div id="success-stories" className="section section-alt">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-number">07</span>
                <h2 className="section-title">SUCCESS STORIES</h2>
              </div>
              <p className="section-description">
                See how our guidance transformed careers.
              </p>
            </div>

            <div className="stories-grid">
              {successStories.map((story, index) => (
                <div className="story-card" key={index}>
                  <div className="story-card-bg"></div>
                  <div className="story-card-inner">
                    <div className="story-card-image-container">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="story-card-image"
                        loading="lazy"
                      />
                      <div className="story-card-image-gradient"></div>
                      <div className="story-card-image-overlay"></div>
                    </div>
                    <h3 className="story-card-name">{story.name}</h3>
                    <p className="story-card-position">{story.position}</p>
                    <p className="story-card-quote">"{story.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div id="blog" className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-number">08</span>
                <h2 className="section-title">BLOG</h2>
              </div>
              <p className="section-description">
                Insights and advice from our career experts.
              </p>
            </div>

            <div className="blog-grid">
              {blogPosts.map((post, index) => (
                <div className="blog-card" key={index}>
                  <div className="blog-card-bg"></div>
                  <div className="blog-card-inner">
                    <div className="blog-card-image-container">
                      <img
                        src={post.image}
                        alt="Blog post"
                        className="blog-card-image"
                        loading="lazy"
                      />
                      <div className="blog-card-image-gradient"></div>
                      <div className="blog-card-image-overlay"></div>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="blog-card-category">
                          {post.category}
                        </span>
                        <span className="blog-card-date">{post.date}</span>
                      </div>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <a href="#" className="btn-ghost">
                        <Link to="/blog">
                          <span>Read more</span>
                        </Link>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="section section-alt">
        <div
          className="hero-gradient"
          style={{ top: "50%", right: "25%" }}
        ></div>
        <div className="container">
          <div className="contact-grid">
            <div>
              <span className="section-number">09</span>
              <h2 className="section-title">GET IN TOUCH</h2>

              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">Email</p>
                    <p className="contact-text">nexera@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">Phone</p>
                    <p className="contact-text">+92 3090965587</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="contact-label">Address</p>
                    <p className="contact-text">
                      Faisalabad <br /> Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-hours">
                <h3 className="contact-hours-title">Office Hours</h3>
                <div className="hours-item">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <div className="contact-form-border"></div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="contact-form-title">Send a Message</h3>

                {/* Success Message */}
                <div
                  className={`bg-green-500 text-black p-2 text-sm font-semibold rounded mb-4 transition-all duration-300 ${
                    showSuccess ? "block" : "hidden"
                  }`}
                >
                  Message sent successfully!
                </div>
                {error && (
                  <div className="text-red-500 text-sm mb-2">{error}</div>
                )}

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="assessment">Career Assessment</option>
                    <option value="planning">Career Planning</option>
                    <option value="interview">Interview Coaching</option>
                    <option value="resume">Resume Writing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us about your career goals..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
