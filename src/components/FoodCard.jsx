import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  return (
    <div className="fc">
      <div className="fc-img">
        {food.rating >= 4.8 && <span className="fc-badge">Special</span>}
        {food.imageUrl ? (
          <img src={food.imageUrl} alt={food.name} loading="lazy" />
        ) : (
          <span className="fc-emoji">{food.emoji || "🍽️"}</span>
        )}
      </div>
      <div className="fc-body">
        <span className="fc-cat">{food.category}</span>
        <h3>{food.name}</h3>
        <p className="fc-desc">{food.description}</p>
        <div className="fc-row">
          <strong>₹{food.price}</strong>
          <span>⭐ {food.rating}</span>
        </div>
        <div className="fc-actions">
          <Link to={`/food/${food.id}`} className="btn outline small">View</Link>
          <button className="btn small" onClick={() => addToCart(food)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}