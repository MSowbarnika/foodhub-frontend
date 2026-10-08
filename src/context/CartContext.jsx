import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("foodhub_cart") || "[]"));
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem("foodhub_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === food.id);
      if (found) return prev.map((i) => (i.id === food.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...food, qty: 1 }];
    });

  const increase = (id) => setCart((p) => p.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decrease = (id) =>
    setCart((p) => p.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0));
  const removeFromCart = (id) => setCart((p) => p.filter((i) => i.id !== id));
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = async (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { ok: false, message: "Enter a coupon code." };
    try {
      const res = await api.get(`/coupons/${clean}`);
      setCoupon(res.data);
      return { ok: true, message: `${res.data.code} applied!` };
    } catch (err) {
      setCoupon(null);
      return { ok: false, message: err.response?.data?.message || "Could not apply coupon. Is the server running?" };
    }
  };
  const removeCoupon = () => setCoupon(null);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = coupon ? Math.round(subtotal * coupon.percent) / 100 : 0;
  const total = subtotal - discount;
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increase, decrease, removeFromCart, clearCart, coupon, applyCoupon, removeCoupon, subtotal, discount, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}