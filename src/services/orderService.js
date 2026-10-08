import api from "./api";

const KEY = "foodhub_orders";
const local = () => JSON.parse(localStorage.getItem(KEY) || "[]");

export const placeOrder = async (order) => {
  try {
    const res = await api.post("/orders", order);
    return res.data;
  } catch (err) {
    if (err.response) throw err;
    const saved = { ...order, id: Date.now(), status: "Placed", date: new Date().toLocaleString() };
    localStorage.setItem(KEY, JSON.stringify([saved, ...local()]));
    return saved;
  }
};

export const getOrders = async () => {
  try {
    const res = await api.get("/orders");
    return res.data;
  } catch (err) {
    if (err.response) throw err;
    return local();
  }
};