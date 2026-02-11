import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();
  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <div className="card product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=400&q=80"; // Fallback thumbnail
            }}
          />
          {product.discount > 0 && <span className="pill subtle tag-discount">-{product.discount}%</span>}
        </div>
      </Link>

      <div className="product-info">
        <div className="product-meta">
          <p className="muted">{product.category}</p>
          <p className="rating">★ {product.rating}</p>
        </div>
        <Link to={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p className="muted description-preview">{product.description}</p>
        <div className="product-bottom">
          <div>
            <strong>${finalPrice.toFixed(2)}</strong>
            {product.discount ? <span className="strikethrough">${product.price.toFixed(2)}</span> : null}
          </div>
          <button className="ghost-btn small" onClick={() => addToCart(product, 1)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
