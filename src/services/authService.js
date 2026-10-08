import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    if (err.response) throw err;
    return { name: email.split("@")[0], email, token: "demo-token" };
  }
};

export const registerUser = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err) {
    if (err.response) throw err;
    return { name: data.name, email: data.email, token: "demo-token" };
  }
};