import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";
import api from "../services/api.js";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, user } = useShop();
  const [message, setMessage] = useState("");
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => {
      const price = item.product.discount
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return sum + price * item.quantity;
    }, 0);
    const shipping = subtotal > 50 ? 0 : 6.5;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [cart]);

  const placeOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setPlacing(true);
    setMessage("");
    try {
      await api.post("/orders", {
        items: cart.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
        total: totals.total,
        paymentMethod
      });
      clearCart();
      setMessage("Order placed! We sent a confirmation to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not place order right now.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="section cart">
      <div className="section-header">
        <div>
          <p className="eyebrow">Your cart</p>
          <h1>Ready to cook?</h1>
        </div>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty. Find something great in the shop.</p>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="thumb" style={{ backgroundImage: `url(${item.product.image})` }} />
                <div className="item-info">
                  <h3>{item.product.name}</h3>
                  <p className="muted">{item.product.description}</p>
                  <div className="item-actions">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                    />
                    <button className="ghost-btn small" onClick={() => removeFromCart(item.product.id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="item-price">
                  ${(
                    (item.product.discount
                      ? item.product.price * (1 - item.product.discount / 100)
                      : item.product.price) * item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary card">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${totals.subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>{totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}</strong>
            </div>
            <div className="summary-row">
              <span>Payment</span>
              <strong className="muted">
                {paymentMethod === "card" ? "Cards" : "MoMo Pay (MTN)"}
              </strong>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <strong>${totals.total.toFixed(2)}</strong>
            </div>
            <div className="payment-options">
              <h4>Choose payment</h4>
              <div className="payment-choice">
                <label className={`payment-pill ${paymentMethod === "card" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <strong>Cards</strong>
                    <p className="muted">Visa, Mastercard, Verve</p>
                  </div>
                </label>
                <label className={`payment-pill ${paymentMethod === "momo" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <strong>MoMo Pay (MTN)</strong>
                    <p className="muted">Mobile money checkout</p>
                  </div>
                </label>
              </div>
            </div>
            <button className="primary-btn full" onClick={placeOrder} disabled={placing}>
              {placing ? "Placing order..." : "Checkout"}
            </button>
            {message && <p className="muted">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
