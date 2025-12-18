import { useState } from "react";
import api from "../services/api.js";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/newsletter", { email });
      setMessage(res.data.message || "Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">Stay inspired</p>
        <h2>Recipes, drops, and field notes monthly.</h2>
        <p className="muted">No spam—just the tastiest launches and kitchen ideas.</p>
      </div>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Subscribing..." : "Join newsletter"}
        </button>
        {message && <p className="muted">{message}</p>}
      </form>
    </section>
  );
};

export default NewsletterForm;
