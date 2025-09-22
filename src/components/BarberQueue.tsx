import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  //   Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import {
  fetchBarberHaircuts,
  fetchBarberQueue,
  joinQueue,
  //   fetchMyPosition,
} from "../services/queueService";
import type { BarberQueueResponse, PublicBarberHaircut } from "../types";
import { useAuth } from "../contexts/authContext";

const BarberQueue = () => {
  const { user } = useAuth();

  const { barberId } = useParams<{ barberId: string }>();
  const [queueData, setQueueData] = useState<BarberQueueResponse | null>(null);
  const [selectedHaircutId, setSelectedHaircutId] = useState("");
  const [selectedCut, setSelectedCut] = useState<PublicBarberHaircut | null>(
    null
  );
  const [haircuts, setHaircuts] = useState<PublicBarberHaircut[]>([]);
  //   const [myPosition, setMyPosition] = useState<number | null>(null);

  useEffect(() => {
    if (barberId) {
      fetchBarberQueue(barberId).then(setQueueData).catch(console.error);
      fetchBarberHaircuts(barberId).then(setHaircuts).catch(console.error);
    }
  }, [barberId]);

  const handleJoinQueue = async () => {
    if (!barberId || !selectedHaircutId) return;
    try {
      const updatedQueue = await joinQueue(barberId, selectedHaircutId);
      setQueueData(updatedQueue);
      setSelectedHaircutId("");
      setSelectedCut(null);
    } catch (err) {
      console.error("Failed to join queue:", err);
    }
  };

  const myEntry = queueData?.entries.find(
    (entry) => entry.customer._id === user?.sub
  );

  if (!queueData) return <Typography>Loading queue...</Typography>;

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {`Queue for ${queueData.queue.barber.username}`.toUpperCase()}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mb: 2 }}
            >
              Started: {new Date(queueData.queue.startedAt).toLocaleString()}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: queueData.queue.isOpen ? "success.main" : "error.main",
                mb: 3,
              }}
            >
              Status: {queueData.queue.isOpen ? "Open" : "Closed"}
            </Typography>

            {/* haircut selection */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Haircut</InputLabel>
              <Select
                value={selectedHaircutId}
                label="Select Haircut"
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedHaircutId(id);
                  const cut = haircuts.find((h) => h._id === id) || null;
                  setSelectedCut(cut);
                }}
              >
                {haircuts.map((cut) => (
                  <MenuItem key={cut._id} value={cut._id}>
                    {cut.styleNotes}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCut && (
              <Card variant="outlined" sx={{ mt: 3, p: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedCut.haircutTemplate.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Cost: ${selectedCut.haircutTemplate.baseCost}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {selectedCut.haircutTemplate.baseDuration} mins
                  </Typography>
                  {selectedCut.styleNotes && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      "{selectedCut.styleNotes}""
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleJoinQueue}
              disabled={!selectedHaircutId}
            >
              Join Queue
            </Button>
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Current Queue
            </Typography>
            {/* entries list */}
            {queueData.entries.length === 0 ? (
              <Typography sx={{ mt: 2 }} color="text.secondary">
                This queue is empty — you’ll be the first in line!
              </Typography>
            ) : (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {queueData.entries.map((entry) => (
                  <Grid item xs={12} key={entry._id}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderLeft:
                          entry.customer._id === user?.sub
                            ? "6px solid #1976d2"
                            : "",
                      }}
                    >
                      <CardContent>
                        <Typography fontWeight="bold">
                          Position: #{entry.position} –{" "}
                          {entry.customer.username}
                        </Typography>
                        <Typography color="text.secondary">
                          {entry.haircut.styleNotes || "Standard Cut"} ·{" "}
                          {entry.haircut.haircutTemplate?.baseDuration ?? "?"}{" "}
                          mins · $
                          {entry.haircut.haircutTemplate?.baseCost ?? "?"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            {myEntry && (
              <Typography
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                You are currently #{myEntry.position} in the queue.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BarberQueue;
