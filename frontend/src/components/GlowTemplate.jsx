import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const serviceHighlights = [
  { title: "Fast Shipping", copy: "Swift & reliable delivery", icon: "🚚" },
  { title: "Same Day Delivery", copy: "Orders arrive swiftly", icon: "⏱️" },
  { title: "Affordable Prices", copy: "Best prices guaranteed", icon: "💲" },
  { title: "Client Satisfaction", copy: "Your happiness assured", icon: "👍" }
];

const pastelPromos = [
  {
    eyebrow: "New Arrivals",
    title: "Fresh Kitchen Tools",
    copy: "Explore our latest utensil drops",
    tone: "rose",
    image:
      "https://images.unsplash.com/photo-1514516430032-7c5c1f1e1f80?auto=format&fit=crop&w=700&q=80"
  },
  {
    eyebrow: "Knife Wall",
    title: "Top Cutting Picks",
    copy: "Discover this week's knife and board selections",
    tone: "mint",
    image:
      "https://images.unsplash.com/photo-1542326237-94b1c5a538d8?auto=format&fit=crop&w=700&q=80&sat=-20"
  },
  {
    eyebrow: "Serveware",
    title: "Hosting Favorites",
    copy: "Browse hand-picked boards, glassware, and carafes",
    tone: "sand",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=700&q=80"
  }
];

const featureProduct = {
  id: "glow-chef-knife",
  name: "Carbon Steel Chef's Knife · 8 in",
  price: 89,
  description:
    "Use this block as a ready-made utensil feature layout with wishlist and pricing CTA zones.",
  image: "https://images.unsplash.com/photo-1542326237-94b1c5a538d8?auto=format&fit=crop&w=900&q=80"
};

const GlowTemplate = () => {
  const { wishlist, toggleWishlist } = useShop();
  const inWishlist = wishlist.some((item) => item.id === featureProduct.id);

  const handleWishlist = () => {
    toggleWishlist(featureProduct);
  };

  return (
    <section className="glow-template">
    <div className="glow-hero">
      <div className="glow-hero-copy">
        <p className="eyebrow light">Modern kitchen lineup</p>
        <h1>New Counter-Ready Arrivals</h1>
        <p className="muted-alt">Save 15% on curated utensil bundles this week.</p>
        <div className="glow-hero-actions">
          <Link to="/products" className="primary-btn">
            Shop now
          </Link>
          <Link to="/products" className="ghost-btn light">
            Explore collections
          </Link>
        </div>
      </div>
      <div className="glow-hero-visual">
        <div className="glow-blob one" />
        <div className="glow-blob two" />
        <img
          className="glow-hero-image"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
          alt="Kitchen utensil set"
        />
        <div className="glow-hero-card">
          <span className="glow-tag">Limited Drop</span>
          <h3>Chef's Counter Set</h3>
          <p className="muted-alt">Carbon steel knife + board + spatula trio.</p>
        </div>
      </div>
    </div>

    <div className="glow-service-row">
      {serviceHighlights.map((service) => (
        <div className="glow-service" key={service.title}>
          <span className="glow-icon" aria-hidden="true">
            {service.icon}
          </span>
          <div>
            <h4>{service.title}</h4>
            <p className="muted-alt">{service.copy}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="glow-collection">
      <div className="glow-collection-card">
        <p className="eyebrow light">Carbon steel</p>
        <h3>Pro Prep Collection</h3>
        <p className="muted-alt">Balanced knives, magnetic block, and honing rod for daily prep.</p>
        <Link to="/products" className="glow-link">
          Explore now &gt;
        </Link>
        <img
          src="https://images.unsplash.com/photo-1542326237-94b1c5a538d8?auto=format&fit=crop&w=800&q=80"
          alt="Knife collection"
        />
      </div>
      <div className="glow-collection-card secondary">
        <p className="eyebrow light">Serve and store</p>
        <h3>Everyday Hosting</h3>
        <p className="muted-alt">Boards, canisters, and double-wall glassware ready for the table.</p>
        <Link to="/products" className="glow-link">
          Explore now &gt;
        </Link>
        <img
          src="https://images.unsplash.com/photo-1481399433301-5cda28f26a12?auto=format&fit=crop&w=800&q=80"
          alt="Serveware set"
        />
      </div>
    </div>

    <div className="glow-promo-grid">
      {pastelPromos.map((promo) => (
        <div className={`glow-promo-card ${promo.tone}`} key={promo.title}>
          <div>
            <p className="eyebrow light">{promo.eyebrow}</p>
            <h3>{promo.title}</h3>
            <p className="muted-alt">{promo.copy}</p>
            <Link to="/products" className="glow-link">
              Shop now &gt;
            </Link>
          </div>
          <img src={promo.image} alt={promo.title} />
        </div>
      ))}
    </div>

    <div className="glow-product-template">
      <div className="glow-product-visual">
        <span className="glow-discount">-15%</span>
        <img src={featureProduct.image} alt="Chef knife product" />
      </div>
      <div className="glow-product-copy">
        <p className="eyebrow light">Template preview</p>
        <h3>{featureProduct.name}</h3>
        <p className="muted-alt">{featureProduct.description}</p>
        <p className="glow-price">${featureProduct.price.toFixed(2)}</p>
        <button
          type="button"
          className={`glow-wishlist ${inWishlist ? "active" : ""}`}
          onClick={handleWishlist}
          aria-pressed={inWishlist}
        >
          <span aria-hidden="true">{inWishlist ? "♥" : "♡"}</span>
          <span>{inWishlist ? "In wishlist" : "Add to wishlist"}</span>
        </button>
      </div>
    </div>
    </section>
  );
};

export default GlowTemplate;
