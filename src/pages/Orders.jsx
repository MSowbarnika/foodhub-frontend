import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orderService";

const STEPS = ["Placed", "Preparing", "Delivered"];

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const load = () => getOrders().then(setOrders).catch(() => setOrders([]));

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="section">
      <div className="orders-top">
        <h2>My orders</h2>
        <button className="btn outline small" onClick={load}>Refresh</button>
      </div>
      {orders.length === 0 ? (
        <p className="muted">No orders yet. <Link to="/menu">Place your first order</Link></p>
      ) : (
        orders.map((o) => (
          <div className="order" key={o.id}>
            <div className="order-head">
              <strong>Order #{o.id}</strong>
              <span className="badge">{o.status}</span>
            </div>
            <p className="muted">{o.date}</p>
            <p className="muted">Payment: {o.paymentMethod} • {o.paymentStatus}</p>
            <div className="tracker">
              {STEPS.map((s, i) => (
                <div key={s} className={`step ${i <= STEPS.indexOf(o.status) ? "done" : ""}`}>
                  <span>{i + 1}</span>{s}
                </div>
              ))}
            </div>
            {o.items.map((i, idx) => (
              <p key={idx}>{i.name} × {i.qty}</p>
            ))}
            {o.discount > 0 && <p className="coupon-ok">Coupon {o.couponCode}: −₹{o.discount}</p>}
            <strong>Total: ₹{o.total}</strong>
          </div>
        ))
      )}
    </div>
  );
}