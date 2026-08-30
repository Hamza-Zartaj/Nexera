import { apiUrl } from "../../config/api";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { user, login } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      navigate("/user/home");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      const newErrors = {};

      if (!formData.name) {
        newErrors.nameError = "Username is required";
      }

      if (!formData.email) {
        newErrors.emailError = "Email is required";
      }

      if (!formData.password) {
        newErrors.passwordError = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.passwordError = "Password must be at least 6 characters long";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      }

      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Check password length with regex (alternative approach)
    const passwordRegex = /^.{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrors({
        passwordError: "Password must be at least 6 characters long",
      });
      setIsSubmitting(false);
      return;
    }

    if (
      formData.password !== formData.confirmPassword ||
      formData.confirmPassword === ""
    ) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsSubmitting(false);
      return;
    }
    setErrors({});

    try {
      console.log("Submitting registration with data:", formData);
      const response = await axios.post(
        apiUrl("/api/auth/register"),
        {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = response.data;
      login(token, user);
      navigate("/user/home");
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="image-section">
          <img
            src="signup.jpg"
            alt="Sign Up Pic"
            className="background-image"
          />
        </div>

        <div className="signup-form-section">
          <div className="signup-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <i className="icon-user"></i>
                {errors.nameError && (
                  <div className="text-red-600 text-xs">
                    <span>{errors.nameError}</span>
                  </div>
                )}
              </div>

              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <i className="icon-email"></i>
                {errors.emailError && (
                  <div className="text-red-600 text-xs">
                    <span>{errors.emailError}</span>
                  </div>
                )}
              </div>

              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <i className="icon-password"></i>
                {errors.passwordError && (
                  <div className="text-red-600 text-xs">
                    <span>{errors.passwordError}</span>
                  </div>
                )}
              </div>

              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <i className="icon-password"></i>

                {errors.confirmPassword && (
                  <div className="text-red-600 text-xs">
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              {errors.general && (
                <div className="text-red-600 text-xs">
                  <span>{errors.general}</span>
                </div>
              )}
              <button
                type="submit"
                className="signup-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? <div className="spinner"></div> : "Sign Up"}
              </button>
            </form>

            <p className="redirect-text">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
