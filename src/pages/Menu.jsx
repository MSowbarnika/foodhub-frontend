import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import CategoryList from "../components/CategoryList";
import SearchBar from "../components/SearchBar";
import { getAllFoods } from "../services/foodService";

export default function Menu() {
  const [params] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState(params.get("category") || "All");
  const [search, setSearch] = useState(params.get("search") || "");

  useEffect(() => {
    getAllFoods().then(setFoods);
  }, []);

  const categories = [...new Set(foods.map((f) => f.category))];
  const filtered = foods.filter(
    (f) =>
      (category === "All" || f.category === category) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section">
      <h2>Menu</h2>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryList categories={categories} selected={category} onSelect={setCategory} />
      {filtered.length === 0 ? (
        <p className="muted">No food found. Try a different search.</p>
      ) : (
        <div className="grid">
          {filtered.map((f) => <FoodCard key={f.id} food={f} />)}
        </div>
      )}
    </div>
  );
}