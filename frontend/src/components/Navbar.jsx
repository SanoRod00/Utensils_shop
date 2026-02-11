import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { cart, user, setAuth } = useShop();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setAuth(null, null);
    navigate("/");
  };

  return (
    <header className="nav-shell nav-glass nav-animate">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark cool-text">Utensils</span>
          <span className="brand-dot">•</span>
          <span className="brand-sub">Shop</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className="nav-item-link">
            Ahabanza
          </NavLink>
          <NavLink to="/products" className="nav-item-link">Products</NavLink>
          <NavLink to="/cart" className="nav-item-link">
            Cart ({cartCount})
          </NavLink>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="pill user-pill">Hi, {user.name.split(" ")[0]}</span>
              <button className="ghost-btn" onClick={handleLogout}>
                Sohoka
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost-btn">
                Injira
              </Link>
              <Link to="/signup" className="primary-btn">
                Iyandikishe
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
