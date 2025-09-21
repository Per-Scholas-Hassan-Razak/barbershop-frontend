import { useEffect, useState } from "react";
import { Switch, FormControlLabel, Typography, Box } from "@mui/material";
import { openQueue, closeQueue } from "../services/barberService";
import { fetchQueueState } from "../services/queueService";

const QueueToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQueueState = async () => {
      try {
        const state = await fetchQueueState();
        setIsOpen(state.isOpen);
      } catch (err) {
        console.error("Failed to load queue state:", err);
      }
    };
    loadQueueState();
  }, []);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const checked = e.target.checked;

    try {
      if (checked) {
        await openQueue();
      } else {
        await closeQueue();
      }
      setIsOpen(checked);
    } catch (err) {
      console.error("Error toggling queue:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      {/* Banner */}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: isOpen ? "success.main" : "error.main",
        }}
      >
        {isOpen === null
          ? "Loading queue state…"
          : isOpen
          ? "OPEN FOR BUSINESS"
          : "CLOSED FOR THE NIGHT"}
      </Typography>

      {/* Switch control */}
      <FormControlLabel
        control={
          <Switch
            checked={isOpen ?? false}
            onChange={handleToggle}
            disabled={loading}
            color="success"
          />
        }
        label={isOpen ? "Open" : "Closed"}
      />
    </Box>
  );
};

export default QueueToggle;
