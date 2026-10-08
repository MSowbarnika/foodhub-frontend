import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";

const METHODS = [
  { id: "COD", label: "💵 Cash on Delivery" },
  { id: "UPI", label: "📱 UPI" },
  { id: "CARD", label: "💳 Debit / Credit Card" },
];

export default function Checkout() {
  const { cart, subtotal, discount, total, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "" });
  const [payment, setPayment] = useState("COD");
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" />;
  if (cart.length === 0) return <Navigate to="/cart" />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phone)) return setError("Phone number must be 10 digits.");
    if (form.address.trim().length < 5) return setError("Please enter your full address.");
    try {
      await placeOrder({
        ...form,
        items: cart,
        total,
        couponCode: coupon?.code || null,
        paymentMethod: payment,
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order. Please try again.");
    }
  };

  return (
    <div className="section narrow">
      <h2>Checkout</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Delivery address" rows="3" value={form.address} onChange={handleChange} required />

        <h3>Payment method</h3>
        <div className="pay-options">
          {METHODS.map((m) => (
            <label key={m.id} className={`pay-option ${payment === m.id ? "active" : ""}`}>
              <input type="radio" name="payment" checked={payment === m.id} onChange={() => setPayment(m.id)} />
              {m.label}
            </label>
          ))}
        </div>
        {payment !== "COD" && <p className="pay-note">Demo payment: no real money is charged.</p>}

        {error && <p className="error">{error}</p>}
        <div className="summary">
          <p><span>Subtotal</span><span>₹{subtotal}</span></p>
          {discount > 0 && <p className="green"><span>Coupon {coupon.code}</span><span>−₹{discount}</span></p>}
          <h3><span>Total</span><span>₹{total}</span></h3>
        </div>
        <button className="btn" type="submit">Place order</button>
      </form>
    </div>
  );
}