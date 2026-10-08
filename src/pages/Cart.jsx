import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, subtotal, discount, total, coupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const handleApply = async () => {
    const result = await applyCoupon(code);
    setMsg(result);
    if (result.ok) setCode("");
  };

  if (cart.length === 0)
    return (
      <div className="section center">
        <h2>Your cart is empty</h2>
        <p className="muted">Add some food from the menu.</p>
        <Link to="/menu" className="btn">Browse menu</Link>
      </div>
    );

  return (
    <div className="section">
      <h2>Your cart</h2>
      {cart.map((i) => <CartItem key={i.id} item={i} />)}

      <div className="coupon-box">
        {coupon ? (
          <p className="coupon-ok">
            ✅ {coupon.code} applied ({coupon.percent}% off){" "}
            <button className="link-btn danger" onClick={() => { removeCoupon(); setMsg(null); }}>Remove</button>
          </p>
        ) : (
          <>
            <input placeholder="Coupon code (try FOOD30)" value={code} onChange={(e) => setCode(e.target.value)} />
            <button className="btn small" onClick={handleApply}>Apply</button>
          </>
        )}
      </div>
      {msg && !coupon && <p className="error">{msg.message}</p>}

      <div className="summary">
        <p><span>Subtotal</span><span>₹{subtotal}</span></p>
        {discount > 0 && <p className="green"><span>Discount</span><span>−₹{discount}</span></p>}
        <h3><span>Total</span><span>₹{total}</span></h3>
      </div>

      <div className="cart-actions">
        <button className="btn outline" onClick={clearCart}>Clear cart</button>
        <Link to="/checkout" className="btn">Checkout</Link>
      </div>
    </div>
  );
}