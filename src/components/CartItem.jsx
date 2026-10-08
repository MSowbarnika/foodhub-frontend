import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { increase, decrease, removeFromCart } = useCart();
  return (
    <div className="cart-item">
      <span className="cart-emoji">{item.emoji || "🍽️"}</span>
      <div className="cart-info">
        <h4>{item.name}</h4>
        <p className="muted">₹{item.price} each</p>
      </div>
      <div className="qty">
        <button onClick={() => decrease(item.id)}>−</button>
        <span>{item.qty}</span>
        <button onClick={() => increase(item.id)}>+</button>
      </div>
      <strong>₹{item.price * item.qty}</strong>
      <button className="link-btn danger" onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}