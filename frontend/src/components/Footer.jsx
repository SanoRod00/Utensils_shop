const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <h3>Utensils Shop</h3>
        <p>Intentional tools, better cooking. Designed to look beautiful on your counter and work even better.</p>
      </div>
      <div>
        <p className="muted">Support</p>
        <ul>
          <li>Shipping & returns</li>
          <li>Care instructions</li>
          <li>Warranty</li>
        </ul>
      </div>
      <div>
        <p className="muted">Visit</p>
        <ul>
          <li>123 Kitchen Ave, Flavor City</li>
          <li>hello@utensils.shop</li>
          <li>+1 (555) 204-1180</li>
        </ul>
      </div>
    </div>
    <div className="footer-meta">
      <span>Made for home cooks • Fresh drops monthly</span>
      <span>© {new Date().getFullYear()} Utensils Shop</span>
    </div>
  </footer>
);

export default Footer;
