import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ApplicationLogo from "../shared/ApplicationLogo";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setUserExists(true);
      console.log("User exists:", user);
    } else {
      setUserExists(false);
      console.log("No user found");
    }
  }, [user]);
  return (
    <>
      <header className={`navbar mobile-nav ${navOpen ? "open" : ""}`}>
        <Link to={"/home"} className="flex items-center justify-center">
          <ApplicationLogo />
        </Link>

        <div className="nav-icon" onClick={toggleNav}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <nav className="nav-links">
          <Link to={"/"} onClick={() => setNavOpen(false)}>
            Welcome Page
          </Link>
          <Link to={"/home"} onClick={() => setNavOpen(false)}>
            Home
          </Link>

          <Link to={"/about"} onClick={() => setNavOpen(false)}>
            About
          </Link>
          <Link to={"/blog"} onClick={() => setNavOpen(false)}>
            Blog
          </Link>
          <Link to={"/contact"} onClick={() => setNavOpen(false)}>
            Contact
          </Link>
          {/* <Link to={"/quiz"} onClick={() => setNavOpen(false)}>
            Quiz
          </Link> */}
          <Link to={"/feedback"} onClick={() => setNavOpen(false)}>
            Feedback
          </Link>
          {userExists ? (
            <Link to={"/user/home"} onClick={() => setNavOpen(false)}>
              Your Dashboard
            </Link>
          ) : (
            <Link to={"/login"} onClick={() => setNavOpen(false)}>
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
