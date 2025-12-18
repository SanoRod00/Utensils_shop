import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="section">
    <h1>Page not found</h1>
    <p>We lost this page in the kitchen. Head back to the shop to keep exploring.</p>
    <Link className="primary-btn" to="/">
      Go home
    </Link>
  </div>
);

export default NotFound;
