import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../Components/Card";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { TECHNOLOGIES } from "../constants";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    skills: [],
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "role") {
      value = value.toLowerCase();
    }
    setForm({ ...form, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/v1/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message || "signup failed");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((sk) => sk !== skill),
    }));
  };

  return (
    <div className="signup-page">
      {/* Background Ambience */}
      <div className="auth-background-text">HIREDEVS</div>
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card padding="medium" className="signup-card">
        <h2 className="signup-title">
          Create Account
        </h2>

        <form onSubmit={handleSignup} autoComplete="off" className="signup-form">
          <Input
            id="email"
            type="text"
            label="Email"
            placeholder="Enter your email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Choose a password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <div className="signup-form-group">
            <span className="signup-section-label">Register as</span>
            <div className="signup-role-group">
              <label className={`radio-card ${form.role === 'user' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleChange}
                  className="hidden-radio"
                />
                <span className="radio-label">User</span>
              </label>
              <label className={`radio-card ${form.role === 'moderator' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="moderator"
                  checked={form.role === "moderator"}
                  onChange={handleChange}
                  className="hidden-radio"
                />
                <span className="radio-label">Developer</span>
              </label>
            </div>
          </div>

          <div className="signup-form-group">
            <label className="signup-section-label" htmlFor="skills">
              Select Skills (optional)
            </label>
            <div className="skills-select-wrapper">
              <select
                id="skills"
                name="skills"
                value={form.skills}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(o => o.value);
                  setForm(prev => ({ ...prev, skills: selected }));
                }}
                multiple
                className="skills-select"
              >
                {TECHNOLOGIES.map((tech, idx) => (
                  <option key={idx} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              <div className="skills-hint">
                Ctrl+Click to select multiple
              </div>
            </div>

            {form.skills.length > 0 && (
              <div className="skills-chips-container">
                {form.skills.map((sk, idx) => (
                  <span key={idx} className="skill-chip">
                    {sk}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(sk)}
                      className="chip-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="signup-submit-btn"
          >
            Sign Up
          </Button>

          <div className="signup-footer">
            Already have an account?{' '}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
