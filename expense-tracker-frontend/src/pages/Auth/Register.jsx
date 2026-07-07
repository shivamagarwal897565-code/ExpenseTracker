import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

import authImage from "../../assets/auth-image.png";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      const data = await registerUser(form);

      alert(data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
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
          Manage income, expenses and build
          better financial habits.
        </p>

        <img
          src={authImage}
          alt="Expense Tracker"
          className="login-image"
        />

        <p className="brand-text">
          Start your financial journey with
          smart expense tracking.
        </p>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h1>Create Account</h1>

          <p className="login-desc">
            Create your account to get started
          </p>

          <form onSubmit={handleSubmit}>

            <div className="auth-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

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
              Register
            </button>

          </form>

          <div className="auth-footer">
            Already have an account?

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;