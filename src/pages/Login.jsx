import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Card from '../Components/Card';
import Input from '../Components/Input';
import Button from '../Components/Button';
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // User Added: Backend connection test
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`https://hiredevs-backend-152a.onrender.com/`);
        // this is just for testing and starting the backend server 
        console.log("Backend Wake-up:", res.status);
      } catch (error) {
        console.error("Failed to connect to backend:", error);
      }
    };
    init();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message || "Login failed")
      }
    } catch (error) {
      alert("Login - something went wrong")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="login-page">
      {/* Background Ambience */}
      <div className="auth-background-text">HIREDEVS</div>
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <Card padding="medium" className="login-card">
        <h2 className="login-title">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="login-form">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="login-submit-btn"
          >
            Login
          </Button>

          <div className="login-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="login-link">
              Sign up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login
