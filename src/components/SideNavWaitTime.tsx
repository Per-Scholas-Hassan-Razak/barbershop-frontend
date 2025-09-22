import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { fetchMyPosition } from "../services/queueService";
import WaitTimeTimer from "./WaitTimeTimer";
import { useQueue } from "../contexts/queueContext";

const SideNavWaitTime = () => {
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);
  const { barberId } = useQueue();

  useEffect(() => {

    if (!barberId) {
      setEtaMinutes(null);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchMyPosition(barberId);
        setEtaMinutes(data.estimatedWaitMinutes);
      } catch {
        setEtaMinutes(null);
      }
    };

    load();

    

    const interval = setInterval(load, 10_000); // refresh every 60s
    return () => clearInterval(interval);
  }, [barberId]);

  if (etaMinutes === null) {
    return (
      <Typography sx={{ p: 2, color: "text.secondary" }}>
        You’re not in a queue
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1">⏳ Your Wait Time</Typography>
      <WaitTimeTimer initialMinutes={etaMinutes} />
    </Box>
  );
};

export default SideNavWaitTime;
