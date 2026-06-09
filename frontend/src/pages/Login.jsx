import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

import cloudLeft from "../assets/cloud_left.png";
import cloudCenter from "../assets/cloud_center.png";
import cloudRight from "../assets/cloud_right.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [cloudOpened, setCloudOpened] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <main className="auth-page">
    <div className="login-cloud-background">
      <img src={cloudLeft} alt="" className="login-bg-cloud cloud-left-bg" />
      <img src={cloudCenter} alt="" className="login-bg-cloud cloud-center-bg" />
      <img src={cloudRight} alt="" className="login-bg-cloud cloud-right-bg" />
    </div>
        
      <section
        className={`cloud-layer ${cloudOpened ? "cloud-opened" : ""}`}
        onClick={() => setCloudOpened(true)}
      >
        <img src={cloudLeft} alt="Pink Cloud" className="cloud-piece cloud_left" />
        <img src={cloudCenter} alt="Pink Cloud" className="cloud-piece cloud_center" />
        <img src={cloudRight} alt="Pink Cloud" className="cloud-piece cloud_right" />

        {!cloudOpened && (
          <div className="cloud-start-text">
            <h1>Capture what’s on your mind.</h1>
            <p>Click the cloud to begin</p>
          </div>
        )}
      </section>

      <section className={`auth-content ${cloudOpened ? "show-auth" : ""}`}>
      <h1>Welcome back.</h1>
      <h2 className="auth-subtitle">Capture what’s on your mind.</h2>

      {errorMessage && <p>{errorMessage}</p>}

      <form className="auth-card" onSubmit={handleSubmit}>
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
          />
        </div>

        <button type="submit" className="auth-button">Login</button>
      

      <p className="auth-link-text">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
      </form>
      </section>
    </main>
  );
};

export default Login;