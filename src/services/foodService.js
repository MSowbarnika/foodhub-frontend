import api from "./api";
import { sampleFoods } from "../data/foods";

export const getAllFoods = async () => {
  try {
    const res = await api.get("/foods");
    return res.data;
  } catch {
    return sampleFoods;
  }
};

export const getFoodById = async (id) => {
  try {
    const res = await api.get(`/foods/${id}`);
    return res.data;
  } catch {
    return sampleFoods.find((f) => f.id === Number(id));
  }
};