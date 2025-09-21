import type { BarberHaircut, CreateHaircut } from "../types";
import api from "./api";

export const fetchTemplates = async () => {
  const res = await api.get("barbers/haircuts/templates"); 
  return res.data;
};

export const createHaircut = async (data:CreateHaircut) => {
  const res = await api.post("barbers/haircuts",data); 
  return res.data;
};

export const fetchCustomCuts = async (): Promise<BarberHaircut[]> => {
  const res = await api.get("/barbers/haircuts");
  return res.data;
};

export const updateHaircut = async (haircutId: string, data: Partial<CreateHaircut>) => {
  const res = await api.put(`/barbers/haircuts/${haircutId}`, data);
  return res.data;
};

export const deleteHaircut = async (haircutId: string) => {
  const res = await api.delete(`/barbers/haircuts/${haircutId}`);
  return res.data;
};

export const openQueue = async () => {
  const res = await api.post("/barbers/queue/open");
  return res.data;
};

export const closeQueue = async () => {
  const res = await api.patch("/barbers/queue/close");
  return res.data;
};