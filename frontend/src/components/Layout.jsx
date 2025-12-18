import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="page-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
