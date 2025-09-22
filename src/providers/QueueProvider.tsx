import { useState, type ReactNode } from "react";
import { QueueContext } from "../contexts/queueContext";


export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [barberId, setBarberId] = useState<string | null>(null);

  return (
    <QueueContext.Provider value={{ barberId, setBarberId }}>
      {children}
    </QueueContext.Provider>
  );
};

export default QueueProvider