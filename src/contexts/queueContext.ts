import { createContext, useContext } from "react"
import type { QueueContextProps } from "../types";


export const QueueContext = createContext<QueueContextProps | undefined>(undefined);

export const useQueue = () => {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error("useQueue must be used within QueueProvider");
  return ctx;
};