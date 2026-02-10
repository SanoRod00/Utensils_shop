import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import { useShop } from "../context/ShopContext.jsx";

const Orders = () => {
  const { user, token } = useShop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      api
        .get("/orders")
        .then((res) => {
          // Sort by newest first
          const sorted = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sorted);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load orders");
          setLoading(false);
        });
    }
  }, [token]);

  if (!user) {
    return (
      <div className="section auth-redirect">
        <p>Please log in to view your orders.</p>
        <Link to="/login" className="primary-btn">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="section orders-page">
      <div className="section-header">
        <p className="eyebrow">Welcome back, {user.name}</p>
        <h1>Your Orders</h1>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="primary-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card card">
              <div className="order-header">
                <div>
                  <strong>Order #{order.id.slice(0, 8)}</strong>
                  <p className="muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`status-badge ${order.status}`}>
                  {order.status}
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <span>
                      {item.quantity}x {item.productName}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total:</span>
                <strong>${order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
