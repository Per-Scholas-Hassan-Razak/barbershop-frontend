import type { CreateHaircut } from "../types";
import api from "./api";

export const fetchTemplates = async () => {
  const res = await api.get("barbers/haircuts/templates"); 
  return res.data;
};

export const createHaircut = async (data:CreateHaircut) => {
  const res = await api.post("barbers/haircuts",data); 
  return res.data;
};