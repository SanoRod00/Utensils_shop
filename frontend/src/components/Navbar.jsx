import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const Navbar = () => {
  const { cart, user, setAuth } = useShop();
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setAuth(null, null);
    navigate("/");
  };

  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">Utensils</span>
          <span className="brand-dot">•</span>
          <span className="brand-sub">Shop</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="pill">Hi, {user.name.split(" ")[0]}</span>
              <button className="ghost-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost-btn">
                Log in
              </Link>
              <Link to="/signup" className="primary-btn">
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
