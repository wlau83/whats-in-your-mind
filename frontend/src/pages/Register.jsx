import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

import cloudLeft from "../assets/cloud_left.png";
import cloudCenter from "../assets/cloud_center.png";
import cloudRight from "../assets/cloud_right.png";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await register(formData.username, formData.email, formData.password);
      setSuccessMessage("Registration successful. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <main className="auth-page register-page">
    <div className="register-cloud-background">
        <img src={cloudLeft} alt="" className="register-cloud cloud-left-bg" />
        <img src={cloudCenter} alt="" className="register-cloud cloud-center-bg" />
        <img src={cloudRight} alt="" className="register-cloud cloud-right-bg" />
      </div>
      <section className="auth-content show-auth">
      <h1>Create Account</h1>
      <h2 className="auth-subtitle">Start your private thought journal.</h2>

      {errorMessage && <p className="auth-error">{errorMessage}</p>}
      {successMessage && <p className="auth-success">{successMessage}</p>}

      <form className="auth-card register-card" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>

        <button type="submit" className="auth-button">Register</button>
      

      <p className="auth-link-text">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      </form>
      </section>
    </main>
  );
};

export default Register;