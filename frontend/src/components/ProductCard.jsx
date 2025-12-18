import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();
  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <div className="card product-card">
      <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
        {product.discount > 0 && <span className="pill subtle">-{product.discount}%</span>}
      </div>
      <div className="product-info">
        <div className="product-meta">
          <p className="muted">{product.category}</p>
          <p className="rating">★ {product.rating}</p>
        </div>
        <Link to={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p className="muted">{product.description}</p>
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
