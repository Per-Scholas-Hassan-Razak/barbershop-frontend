import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import type { QueueSummary } from "../types";
import { useNavigate } from "react-router-dom";
import { fetchAllQueues } from "../services/queueService";
import { useQueue } from "../contexts/queueContext";

const DEFAULT_BARBER_IMG = "/toni.jpg";

const BarberQueues = () => {
  const { setBarberId } = useQueue();

  const [queues, setQueues] = useState<QueueSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQueues = async () => {
      try {
        const data = await fetchAllQueues();
        setQueues(data);
      } catch {
        setError("Failed to load queues");
      } finally {
        setLoading(false);
      }
    };
    loadQueues();
  }, []);

  console.log("queues ", queues);

  if (loading) return <Typography>Loading queues...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", p: 3 }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/barbershop.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
          zIndex: 0,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {queues.map((q) => (
            <Grid item xs={12} sm={6} md={4} key={q._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {q.barber.username.toUpperCase()}
                  </Typography>
                  <img
                    src={DEFAULT_BARBER_IMG}
                    alt={`Barber ${q.barber.username}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 8,
                      marginBottom: 12,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Queue started: {new Date(q.startedAt).toLocaleString()}
                  </Typography>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={() => {
                      setBarberId(q.barber.id);
                      navigate(
                        `/customer/dashboard/barberqueue/${q.barber.id}`
                      );
                    }}
                  >
                    View Queue
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BarberQueues;
