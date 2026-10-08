import api from "./api";

export const fetchAllOrders = () => api.get("/admin/orders").then((r) => r.data);
export const setOrderStatus = (id, status) => api.put(`/admin/orders/${id}/status`, { status }).then((r) => r.data);
export const createFood = (food) => api.post("/foods", food).then((r) => r.data);
export const updateFood = (id, food) => api.put(`/foods/${id}`, food).then((r) => r.data);
export const removeFood = (id) => api.delete(`/foods/${id}`).then((r) => r.data);