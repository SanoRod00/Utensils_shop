import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { useShop } from "../context/ShopContext.jsx";

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
    <div className="section product-detail">
      <div className="detail-media" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="detail-info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="muted">{product.description}</p>
        <div className="detail-meta">
          <span className="pill subtle">★ {product.rating} ({product.reviews} reviews)</span>
          <span className="pill subtle">{product.stock > 0 ? "In stock" : "Out of stock"}</span>
        </div>
        <div className="price-row">
          <div>
            <strong className="big">${finalPrice.toFixed(2)}</strong>
            {product.discount ? <span className="strikethrough">${product.price.toFixed(2)}</span> : null}
          </div>
          <div className="cta-row">
            <button className="primary-btn" onClick={() => addToCart(product, 1)}>
              Add to cart
            </button>
            <button className="ghost-btn" onClick={() => addToCart(product, 1)}>
              Buy now
            </button>
          </div>
        </div>
        <div className="detail-block">
          <h4>Details</h4>
          <ul>
            <li>Material: Stainless/Carbon steel, FSC-certified wood, platinum silicone.</li>
            <li>Care: Dishwasher safe items noted; hand wash knives for longevity.</li>
            <li>Guarantee: Lifetime manufacturing warranty and sharpening program.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
