import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import CategoryList from "../components/CategoryList";
import { getAllFoods } from "../services/foodService";
import "../styles/Home.css";

const categoryTiles = [
  { name: "Burger", emoji: "🍔" },
  { name: "Chicken", emoji: "🍗" },
  { name: "Dessert", emoji: "🍰" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Pizza", emoji: "🍕" },
];

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllFoods().then(setFoods);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/menu?search=${encodeURIComponent(search)}`);
  };

  const categories = [...new Set(foods.map((f) => f.category))];
  const shown = foods.filter((f) => category === "All" || f.category === category);

  return (
    <div>
      <section className="hero-bg" id="home">
        <div className="hero">
          <div>
            <span className="pill">🔥 India's Premium Food Delivery</span>
            <h1>Delicious Food Delivered To Your Door</h1>
            <p>Fresh ingredients. Fast delivery. Choose from burgers, pizza, chicken, desserts and more.</p>
            <form className="hero-search" onSubmit={handleSearch}>
              <input placeholder="What are you craving?" value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className="btn" type="submit">Search</button>
            </form>
            <div className="popular">
              <span>Popular:</span>
              {["Burger", "Pizza", "Chicken", "Dessert"].map((p) => (
                <Link key={p} to={`/menu?search=${p}`}>{p}</Link>
              ))}
            </div>
            <div className="stats">
              <div><strong>12K+</strong><span>Happy Customers</span></div>
              <div><strong>⭐ 4.9</strong><span>Customer Rating</span></div>
              <div><strong>25 Min</strong><span>Avg Delivery</span></div>
            </div>
          </div>
          <img
            className="hero-img"
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900"
            alt="Fresh food bowl"
          />
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Categories</p>
        <h2>Choose by Category</h2>
        <div className="tiles">
          {categoryTiles.map((c) => (
            <Link key={c.name} to={`/menu?category=${c.name}`} className="tile">
              <span>{c.emoji}</span>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="offers">
        <div className="offer">
          <div>
            <p className="eyebrow light">Limited Offer</p>
            <h2>Get 30% OFF</h2>
            <p>Use coupon code <strong>FOOD30</strong></p>
          </div>
          <a href="#menu" className="btn light">Order Now</a>
        </div>
      </section>

      <section className="section" id="menu">
        <p className="eyebrow">Our Menu</p>
        <h2>Delicious Foods</h2>
        <CategoryList categories={categories} selected={category} onSelect={setCategory} />
        <div className="grid">
          {shown.map((f) => <FoodCard key={f.id} food={f} />)}
        </div>
      </section>

      <section className="section" id="about">
        <div className="features">
          <div><span>🚀</span><h4>Fast Delivery</h4><p>Delivered hot and fresh within 25 minutes.</p></div>
          <div><span>🥗</span><h4>Fresh Ingredients</h4><p>Premium quality ingredients every day.</p></div>
          <div><span>🔒</span><h4>Easy Checkout</h4><p>Pay with UPI, card or cash on delivery.</p></div>
        </div>
      </section>
    </div>
  );
}