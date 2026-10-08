import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFoodById } from "../services/foodService";
import { useCart } from "../context/CartContext";

export default function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFoodById(id).then((f) => {
      setFood(f);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="section">Loading...</p>;
  if (!food) return <p className="section">Food not found. <Link to="/menu">Go to menu</Link></p>;

  return (
    <div className="section details">
      {food.imageUrl ? (
        <img src={food.imageUrl} alt={food.name} style={{ width: 320, maxWidth: "100%", borderRadius: 16 }} />
      ) : (
        <div className="details-emoji">{food.emoji || "🍽️"}</div>
      )}
      <div>
        <h2>{food.name}</h2>
        <p className="muted">{food.category} • ⭐ {food.rating}</p>
        <p className="desc">{food.description}</p>
        <h3>₹{food.price}</h3>
        <button className="btn" onClick={() => addToCart(food)}>Add to cart</button>
      </div>
    </div>
  );
}