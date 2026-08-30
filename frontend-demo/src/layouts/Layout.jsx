import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Welcome from "@/pages/welcome/Welcome";
import Home from "@/pages/home/Home";
import About from "@/pages/about/About";
import Blog from "@/pages/blogs/Blog";
import Appointment from "@/pages/appointment/Appointment";
import Contact from "@/pages/contact/Contact";
import Quiz from "@/pages/quiz/Quiz";
import Signup from "@/pages/signup/Signup";
import Login from "@/pages/login/Login";
import Feedback from "@/pages/feedback/Feedback";
import SingleBlog from "../pages/blogs/SingleBlog";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/Signup" ||
    location.pathname === "/login" ||
    location.pathname === "/feedback";

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/blogs/:slug" element={<SingleBlog />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;
