import "./Footer.css";

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <div className="footer-brand">
        <h3>Utensils Shop</h3>
        <p className="footer-tagline">
          Elevating your culinary experience with premium tools.
          <br />
          Designed for the modern chef.
        </p>
        <div className="footer-socials">
          {/* Placeholders for social icons if needed, using text for now or simple circles */}
          <span className="social-icon">IG</span>
          <span className="social-icon">TW</span>
          <span className="social-icon">FB</span>
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h4>Shop</h4>
          <ul>
            <li><a href="/products?category=cooking">Cooking</a></li>
            <li><a href="/products?category=knives">Knives</a></li>
            <li><a href="/products?category=baking">Baking</a></li>
            <li><a href="/products?category=serveware">Serveware</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/care">Care Instructions</a></li>
            <li><a href="/warranty">Warranty</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column contact-column">
          <h4>Contact Us</h4>
          <ul>
            <li className="contact-item">
              <span className="icon">📍</span>
              <span>Rwanda, Kigali</span>
            </li>
            <li className="contact-item">
              <span className="icon">📧</span>
              <a href="mailto:sanorod00@gmail.com">sanorod00@gmail.com</a>
            </li>
            <li className="contact-item">
              <span className="icon">📞</span>
              <a href="tel:+250783242318">+250 783 242 318</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-newsletter">
        <h4>Stay in the loop</h4>
        <p>Subscribe for exclusive drops and culinary tips.</p>
        <form className="newsletter-form-footer" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="primary-btn small">Subscribe</button>
        </form>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Utensils Shop. All rights reserved.</p>
      <div className="footer-legal">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
