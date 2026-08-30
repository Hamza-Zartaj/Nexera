import { apiUrl } from "../../config/api";
import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const demoCredentials = {
    email: "demo@nexera.local",
    password: "demo123",
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (user) {
      navigate("/user/home");
    }
  }, [user, navigate]);

  const completeLogin = (token, userData) => {
    login(token, userData);
    navigate("/user/home");
  };

  const handleUseDemoCredentials = () => {
    setFormData(demoCredentials);
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.email || !formData.password) {
      const newErrors = {};

      if (!formData.email) {
        newErrors.emailError = "Email is required";
      }

      if (!formData.password) {
        newErrors.passwordError = "Password is required";
      }

      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post(apiUrl("/api/auth/login"), {
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = res.data;
      completeLogin(token, user);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors({ general: error.response.data.message });
      } else {
        console.error("Login error:", error);
        setErrors({ general: "An unexpected error occurred" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      setErrors({ general: "Google login did not return credentials" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await axios.post(apiUrl("/api/auth/google"), {
        token: credentialResponse.credential,
      });
      const { token, user } = res.data;
      completeLogin(token, user);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors({ general: error.response.data.message });
      } else {
        console.error("Google login error:", error);
        setErrors({ general: "Google login failed" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="nexera-header">Nexera</div>
      <div className="login-container">
        <div className="image-section">
          <img src="login.avif" alt="Login Pic" className="background-image" />
        </div>

        <div className="login-form-section">
          <div className="login-form-container">
            <h2>Log In</h2>
            <div className="demo-credentials" aria-label="Demo credentials">
              <div>
                <span>Demo email</span>
                <strong>{demoCredentials.email}</strong>
              </div>
              <div>
                <span>Demo password</span>
                <strong>{demoCredentials.password}</strong>
              </div>
              <button type="button" onClick={handleUseDemoCredentials}>
                Use demo credentials
              </button>
            </div>            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
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
                  placeholder="Enter your password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
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

              {errors.general && (
                <div className="text-red-600 text-xs">
                  <span>{errors.general}</span>
                </div>
              )}
              <button
                disabled={isSubmitting}
                type="submit"
                className="login-button"
              >
                Log In
              </button>
            </form>

            {googleClientId && (
              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setErrors({ general: "Google login failed" })}
                  useOneTap
                />
              </div>
            )}

            <p className="redirect-text">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
