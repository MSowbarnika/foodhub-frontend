import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllFoods } from "../services/foodService";
import { fetchAllOrders, setOrderStatus, createFood, updateFood, removeFood } from "../services/adminService";
import "../styles/Admin.css";

const emptyFood = { name: "", category: "", price: "", rating: "", emoji: "", description: "", imageUrl: "" };
const STATUSES = ["Placed", "Preparing", "Delivered"];

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState("foods");
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyFood);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  const loadFoods = () => getAllFoods().then(setFoods);
  const loadOrders = () => fetchAllOrders().then(setOrders).catch(() => setMsg("Could not load orders."));

  useEffect(() => {
    if (user?.role === "ADMIN") {
      loadFoods();
      loadOrders();
    }
  }, [user]);

  if (!user || user.role !== "ADMIN") return <Navigate to="/" />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), rating: Number(form.rating) || 0 };
    try {
      if (editId) await updateFood(editId, payload);
      else await createFood(payload);
      setMsg(editId ? "Food updated." : "Food added.");
      setForm(emptyFood);
      setEditId(null);
      loadFoods();
    } catch (err) {
      setMsg(err.response?.data?.message || "Could not save food.");
    }
  };

  const handleEdit = (f) => {
    setEditId(f.id);
    setForm({
      name: f.name, category: f.category, price: f.price, rating: f.rating,
      emoji: f.emoji || "", description: f.description || "", imageUrl: f.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food?")) return;
    try {
      await removeFood(id);
      setMsg("Food deleted.");
      loadFoods();
    } catch {
      setMsg("Could not delete food.");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await setOrderStatus(id, status);
      loadOrders();
    } catch {
      setMsg("Could not update status.");
    }
  };

  return (
    <div className="section">
      <h2>Admin Panel</h2>
      <div className="tabs">
        <button className={`chip ${tab === "foods" ? "active" : ""}`} onClick={() => setTab("foods")}>Foods</button>
        <button className={`chip ${tab === "orders" ? "active" : ""}`} onClick={() => setTab("orders")}>Orders</button>
      </div>
      {msg && <p className="msg">{msg}</p>}

      {tab === "foods" && (
        <>
          <form className="admin-form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="category" placeholder="Category (Burger, Pizza...)" value={form.category} onChange={handleChange} required />
            <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
            <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} />
            <input name="emoji" placeholder="Emoji" value={form.emoji} onChange={handleChange} />
            <input name="imageUrl" className="full" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
            <textarea name="description" className="full" rows="2" placeholder="Description" value={form.description} onChange={handleChange} />
            <div className="full">
              <button className="btn" type="submit">{editId ? "Update food" : "Add food"}</button>{" "}
              {editId && (
                <button type="button" className="btn outline" onClick={() => { setEditId(null); setForm(emptyFood); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Category</th><th>Price</th><th>Rating</th><th></th></tr>
              </thead>
              <tbody>
                {foods.map((f) => (
                  <tr key={f.id}>
                    <td>{f.emoji} {f.name}</td>
                    <td>{f.category}</td>
                    <td>₹{f.price}</td>
                    <td>{f.rating}</td>
                    <td>
                      <button className="btn small outline" onClick={() => handleEdit(f)}>Edit</button>{" "}
                      <button className="btn small" onClick={() => handleDelete(f.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "orders" &&
        (orders.length === 0 ? (
          <p className="muted">No orders yet.</p>
        ) : (
          orders.map((o) => (
            <div className="order" key={o.id}>
              <div className="order-head">
                <strong>Order #{o.id} • {o.name} ({o.phone})</strong>
                <select className="status-select" value={o.status} onChange={(e) => handleStatus(o.id, e.target.value)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <p className="muted">{o.userEmail} • {o.date}</p>
              <p className="muted">{o.address}</p>
              <p className="muted">Payment: {o.paymentMethod} • {o.paymentStatus}</p>
              {o.items.map((i, idx) => <p key={idx}>{i.name} × {i.qty}</p>)}
              <strong>Total: ₹{o.total}</strong>
            </div>
          ))
        ))}
    </div>
  );
}