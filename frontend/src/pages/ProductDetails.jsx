import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { useShop } from "../context/ShopContext.jsx";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useShop();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="section">Loading...</div>;

  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <div className="section product-detail-container">
      <div className="detail-media-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="detail-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80"; // Fallback
          }}
        />
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}% OFF</span>
        )}
      </div>

      <div className="detail-info-wrapper">
        <div className="detail-header">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="detail-meta-row">
            <span className="rating-pill">★ {product.rating} ({product.reviews} reviews)</span>
            <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? "In Stock" : "Sold Out"}
            </span>
          </div>
        </div>

        <div className="detail-price-box">
          <div className="price-display">
            <strong className="current-price">{finalPrice.toLocaleString()} RWF</strong>
            {product.discount ? <span className="original-price">{product.price.toLocaleString()} RWF</span> : null}
          </div>
          <p className="shipping-note">Free shipping on all orders over 50,000 RWF</p>
        </div>

        <div className="detail-description">
          <h3>About this item</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-actions">
          <button className="primary-btn large full" onClick={() => addToCart(product, 1)} disabled={product.stock === 0}>
            {product.stock > 0 ? "Ongeraho" : "Shize"}
          </button>
        </div>

        <div className="detail-specs">
          <h4>Specifications</h4>
          <ul>
            <li><strong>Material:</strong> Premium Grade Stainless Steel / Sustainable Wood</li>
            <li><strong>Care:</strong> Dishwasher safe (Hand wash recommended)</li>
            <li><strong>Warranty:</strong> 2-Year Manufacturer Guarantee</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
