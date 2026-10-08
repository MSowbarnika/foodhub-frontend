import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>🍔 FoodHub</h3>
          <p>Fresh food, beautiful ordering, and a smooth restaurant experience.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <a href="/#menu">Menu</a>
          <a href="/#offers">Offers</a>
          <a href="/#about">About</a>
        </div>
        <div>
          <h4>Support</h4>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <h4>Get special food offers</h4>
          <form onSubmit={handleSubmit} className="subscribe">
            <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Subscribe</button>
          </form>
          {done && <p className="subscribed">Thanks for subscribing! 🎉</p>}
        </div>
      </div>
      <p className="copyright">© 2026 FoodHub. All rights reserved.</p>
    </footer>
  );
}