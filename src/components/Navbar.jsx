import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🍔 Food<span>Hub</span></Link>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><a href="/#menu">Menu</a></li>
        <li><a href="/#offers">Offers</a></li>
        <li><a href="/#about">About</a></li>
      </ul>
      <div className="nav-right">
        <Link to="/cart" className="cart-link">🛒<span className="cart-badge">{count}</span></Link>
        {user ? (
          <>
            {/*{user.role === "ADMIN" && <Link to="/admin" className="nav-btn ghost">Admin</Link>}*/}
            <Link to="/orders" className="nav-btn ghost">Orders</Link>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn ghost">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}