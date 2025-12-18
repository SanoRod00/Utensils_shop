import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useShop } from "../context/ShopContext.jsx";

const Auth = ({ mode }) => {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useShop();

  const normalize = () => ({
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    password: form.password.trim()
  });

  const isValidEmail = (email) => {
    if (!email) return false;
    if (/\s/.test(email)) return false;
    const at = email.indexOf("@");
    const dot = email.lastIndexOf(".");
    return at > 0 && dot > at + 1 && dot < email.length - 1;
  };

  const validate = (data) => {
    const errs = {};
    if (!isLogin && !data.name) errs.name = "Name is required";
    if (!isValidEmail(data.email)) errs.email = "Enter a valid email";
    if (!data.password || data.password.length < 6) errs.password = "Use at least 6 characters";
    return errs;
  };

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleaned = normalize();
    const errs = validate(cleaned);
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = isLogin
        ? { email: cleaned.email, password: cleaned.password }
        : { ...cleaned };
      const res = await api.post(endpoint, payload);
      setAuth(res.data.token, res.data.user);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section auth">
      <div className="auth-card card">
        <p className="eyebrow">{isLogin ? "Welcome back" : "Join the crew"}</p>
        <h1>{isLogin ? "Log in" : "Create your account"}</h1>
        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <label>
              Name
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
              {fieldErrors.name && <span className="muted">{fieldErrors.name}</span>}
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            {fieldErrors.email && <span className="muted">{fieldErrors.email}</span>}
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            {fieldErrors.password && <span className="muted">{fieldErrors.password}</span>}
          </label>
          <button className="primary-btn full" type="submit" disabled={loading}>
            {loading ? "Submitting..." : isLogin ? "Log in" : "Sign up"}
          </button>
          {error && <p className="muted">{error}</p>}
        </form>
        <p className="muted">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <Link to={isLogin ? "/signup" : "/login"} className="glow-link">
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
