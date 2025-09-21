import type { BarberQueueResponse, QueueSummary } from "../types";
import api from "./api";

export const fetchAllQueues = async (): Promise<QueueSummary[]> => {
  const res = await api.get("/queues");
  return res.data as QueueSummary[];
};


export const fetchBarberQueue = async (
  barberId: string
): Promise<BarberQueueResponse> => {
  const res = await api.get(`/queues/${barberId}`);
  return res.data;
};