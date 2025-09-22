import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface WaitTimeTimerProps {
  initialMinutes: number;
}

const WaitTimeTimer = ({ initialMinutes }: WaitTimeTimerProps) => {
  const [remaining, setRemaining] = useState(initialMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Typography variant="h6" sx={{ mt: 2 }}>
      Estimated wait: {formatTime(remaining)}
    </Typography>
  );
};

export default WaitTimeTimer;