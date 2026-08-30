import { apiUrl } from "../../config/api";
import React, { useEffect, useState } from "react";
import "./Blog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import striptags from "striptags";

const Blog = () => {
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        let res = await axios.get(apiUrl("/api/public/blogs"));
        setBlogs(res.data);
        console.log("Blogs fetched successfully:", res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  const handleBlogClick = (slug) => {
    navigate(`/blogs/${slug}`);
  };

  // const blogPosts = [
  //   {
  //     id: 1,
  //     image: "careerchoice.avif",
  //     title: "How to Prepare for a Career Change in 2025",
  //     content:
  //       "Essential steps to transition to a new career path. Understand the challenges and opportunities ahead. Build a roadmap tailored to your goals. Leverage available resources for a smoother transition. Learn how to update your skillset effectively. Gain confidence by connecting with mentors in your desired field.",
  //   },
  //   {
  //     id: 2,
  //     image: "future.avif",
  //     title: "The Future of Work: Skills That Will Matter Most",
  //     content:
  //       "Discover the skills employers will value most in the next decade. Understand emerging trends in the global job market. Learn the importance of adaptability and continuous learning. Prepare for technological changes that will reshape industries. Equip yourself with the tools for long-term career success.",
  //   },
  //   {
  //     id: 3,
  //     image: "salary.jpeg",
  //     title: "Negotiating Your Salary: Expert Strategies",
  //     content:
  //       "Learn how to negotiate the compensation package you deserve. Understand the importance of market research. Develop confidence in presenting your value proposition. Master techniques to handle counteroffers effectively. Achieve a win-win outcome for you and the employer.",
  //   },
  //   {
  //     id: 4,
  //     image: "resume.avif",
  //     title: "Crafting the Perfect Resume for Tech Jobs",
  //     content:
  //       "Tips on making your resume stand out in a competitive industry. Learn about the latest trends in resume design. Highlight your technical skills and achievements. Avoid common mistakes that can harm your application. Increase your chances of landing your dream job.",
  //   },
  //   {
  //     id: 5,
  //     image: "interview.jpg",
  //     title: "Mastering the Virtual Interview",
  //     content:
  //       "Strategies to make a strong impression online. Learn how to handle technical challenges during interviews. Understand the importance of body language and tone. Prepare thoroughly to showcase your skills confidently. Leave a lasting impression with thoughtful follow-ups.",
  //   },
  //   {
  //     id: 6,
  //     image: "linkedin.avif",
  //     title: "How to Optimize Your LinkedIn Profile",
  //     content:
  //       "Make your profile recruiter-ready with these simple steps. Highlight your achievements and professional experience. Use keywords to enhance visibility in recruiter searches. Engage with content to expand your professional network. Maintain an active presence to attract new opportunities.",
  //   },
  //   {
  //     id: 7,
  //     image: "networking.avif",
  //     title: "Networking Tips for Career Growth",
  //     content:
  //       "Learn how to grow professional relationships effectively. Build genuine connections that align with your goals. Utilize online platforms to expand your reach. Attend events to foster in-person interactions. Maintain consistency in nurturing your network over time.",
  //   },
  //   {
  //     id: 8,
  //     image: "freelance.avif",
  //     title: "Is Freelancing Right for You?",
  //     content:
  //       "Explore the pros and cons of becoming your own boss. Understand the challenges of managing freelance work. Learn about potential earnings and market trends. Build a portfolio that attracts high-value clients. Decide if freelancing aligns with your career aspirations.",
  //   },
  //   {
  //     id: 9,
  //     image: "remote.jpg",
  //     title: "Thriving in a Remote Work Environment",
  //     content:
  //       "How to stay productive and connected while working remotely. Create a workspace that boosts focus and efficiency. Learn effective time management strategies. Maintain clear communication with team members. Balance work-life integration for better mental health.",
  //   },
  //   {
  //     id: 10,
  //     image: "mentorship.jpeg",
  //     title: "The Power of Mentorship in Career Success",
  //     content:
  //       "Why having a mentor can be a game-changer for your growth. Understand how to find and approach the right mentor. Build a mutually beneficial mentorship relationship. Learn valuable lessons from an experienced perspective. Use mentorship to unlock new career opportunities.",
  //   },
  //   {
  //     id: 11,
  //     image: "worklife.jpg",
  //     title: "Balancing Work and Life in a Fast-Paced World",
  //     content:
  //       "Find out how to avoid burnout and maintain mental wellness. Learn to set boundaries between work and personal time. Discover relaxation techniques to reduce stress. Prioritize tasks for better time management. Build a sustainable work-life integration plan.",
  //   },
  // ];

  return (
    <div className="blogs-page">
      <div className="hero">
        <h1>All Blogs</h1>
        <p>
          Explore expert advice, resources, and inspiring stories to shape your
          professional journey and achieve your goals with confidence.
        </p>
      </div>

      <div className="blog">
        <div className="featured-post">
          <img src="tips.avif" alt="Featured Post" />
          <div className="featured-post-content">
            <h3>5 Career Pivots That Can Transform Your Professional Life</h3>
            <p>
              Discover how changing careers can open new doors and refresh your
              professional life. Learn how your current skills can help you
              switch to a new job. Find out how networking and talking to others
              can guide you through the change. See how learning new things and
              staying open to growth can make the transition easier. With the
              right mindset, you can adapt quickly and succeed in a new career.
              Make sure to stay confident and trust the process as you move
              forward.
            </p>

            <a href="#">Read Article</a>
          </div>
        </div>

        <div className="blog-grid">
          {blogs.map((post) => (
            <div
              className="blog-card"
              onClick={() => handleBlogClick(post.slug)}
              key={post.id}
            >
              <img src={post.image} alt={`Post ${post.id}`} />
              {post.tags && (
                <div className="flex gap-2 mx-3 my-2">
                  {post.tags.map((tag, index) => (
                    <div
                      className="rounded-full text-xs font-semibold py-1 px-6 bg-primaryPurple-600"
                      key={index}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
              <div className="blog-text">
                <h4>{post.title}</h4>
                <p className="line-clamp-4 overflow-hidden text-gray-600">
                  {striptags(post.body)}
                </p>
                <a href="#">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section id="newsletter" className="newsletter-section">
        <h2 className="newsletter-heading">Stay Updated</h2>
        <div className="newsletter-container">
          <div className="newsletter-box">
            <p className="newsletter-subheading">
              "Subscribe to our newsletter for exclusive deals and updates!"
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
