import { Link } from "react-router-dom";

const Hero = () => (
  <section className="hero">
    <div className="hero-left">
      <div className="eyebrow">Modern kitchen essentials</div>
      <h1>
        Cook better with <span className="accent">beautiful</span> tools.
      </h1>
      <p>
        Crafted cookware, knives, and serveware built to perform and designed to stay on your counter. Free shipping
        over $50.
      </p>
      <div className="hero-actions">
        <Link to="/products" className="primary-btn">
          Shop collection
        </Link>
        <Link to="/products?category=knives" className="ghost-btn">
          Explore knives
        </Link>
      </div>
      <div className="hero-badges">
        <div>
          <strong>48h</strong>
          <span>Delivery</span>
        </div>
        <div>
          <strong>4.8 ★</strong>
          <span>Happy cooks</span>
        </div>
        <div>
          <strong>Eco</strong>
          <span>Recycled steel + FSC wood</span>
        </div>
      </div>
    </div>
    <div className="hero-right">
      <div className="hero-card">
        <div className="hero-image one" />
        <div className="hero-image two" />
        <div className="floating-card">
          <p>Limited drop</p>
          <h3>Carbon Steel Chef&apos;s Knife</h3>
          <span>$89 · Ships today</span>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
