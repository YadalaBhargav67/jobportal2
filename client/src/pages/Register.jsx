import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password and confirm password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "jobseeker",
        }),
      });

      // Backend sends JSON
      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Clear form after successful registration
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Duplicate email or other backend error
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Cannot connect to backend");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>Create Account</h1>

        <p className="subtitle">
          Join our Job Portal and start your career journey
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            Register
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;