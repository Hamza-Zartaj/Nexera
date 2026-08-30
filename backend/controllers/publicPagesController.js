import Feedback from "../models/Feedback.js";
import Contact from "../models/Contact.js";
import Blog from "../models/Blog.js";
import sendEmail from "../utils/emailUtil.js";

export const sendFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    const { name, email, message } = feedbackData;

    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();

    const adminMessage = `
New Feedback Received:

Name: ${name}
Email: ${email}
Message: ${message}
    `;

    await sendEmail(
      "nexerapk@gmail.com",
      "New Feedback from Nexera User",
      adminMessage
    );

    const userMessage = `Dear ${name},\n\nThanks for your valuable feedback!\n\nRegards,\nNexera Team`;
    await sendEmail(email, "Thank You for Your Feedback!", userMessage);

    res.status(201).json({ message: "Feedback submitted and emails sent." });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({
      error: "Server error. Feedback not submitted.",
      msg: error.message,
    });
  }
};

export const sendContact = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required." });
    }

    // Save to database
    const newContact = new Contact({ name, email, service, message });
    await newContact.save();

    // Email to Admin
    const adminMessage = `
New Contact Message:

Name: ${name}
Email: ${email}
Service: ${service}
Message: ${message}
    `;

    await sendEmail(
      "nexerapk@gmail.com",
      `New Contact Request: ${service}`,
      adminMessage
    );

    // Auto-reply to User
    const userReply = `Dear ${name},\n\nThank you for contacting Nexera.\nWe have received your message regarding "${service}". Our team will respond shortly.\n\nRegards,\nNexera Team`;

    await sendEmail(email, "We've received your message", userReply);

    res.status(201).json({ message: "Connected Successfully. Emails sent." });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      error: "Server error. Can't connect.",
      msg: error.message,
    });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found." });
    }
    res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({
      error: "Server error. Can't fetch blogs.",
      msg: error.message,
    });
  }
};

export const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({
      error: "Server error. Can't fetch blog.",
      msg: error.message,
    });
  }
};
