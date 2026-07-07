import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import authImage from "../../assets/auth-image.png";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      login(data.token, data.user);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <h1 className="brand-title">
          💰 Expense Tracker
        </h1>

        <p className="brand-subtitle">
          Track income, monitor expenses and
          manage your finances effortlessly.
        </p>

        <img
          src={authImage}
          alt="Expense Tracker"
          className="login-image"
        />

        <p className="brand-text">
          Stay organized and achieve your
          financial goals with ease.
        </p>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h1>Welcome Back!</h1>

          <p className="login-desc">
            Login to your account to continue
          </p>

          <form onSubmit={handleSubmit}>

            <div className="auth-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-btn">
              Login
            </button>

          </form>

          <div className="auth-footer">
            Don't have an account?

            <button
              type="button"
              onClick={() =>
                navigate("/register")
              }
            >
              Sign Up
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;