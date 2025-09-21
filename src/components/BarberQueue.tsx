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
  CardActionArea,
  Button,
} from "@mui/material";
import {
  fetchBarberHaircuts,
  fetchBarberQueue,
  //   joinQueue,
  //   fetchMyPosition,
} from "../services/queueService";
import type { BarberQueueResponse, PublicBarberHaircut } from "../types";

const BarberQueue = () => {
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

  //   const handleJoinQueue = async () => {
  //     if (!barberId || !selectedHaircut) return;
  //     try {
  //       await joinQueue(barberId, selectedHaircut);
  //       const pos = await fetchMyPosition(barberId);
  //       setMyPosition(pos.position);
  //     } catch (err) {
  //       console.error("Failed to join queue:", err);
  //     }
  //   };

  if (!queueData) return <Typography>Loading queue...</Typography>;

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">
              {`Queue for ${queueData.queue.barber.username}`.toUpperCase()}
            </Typography>
            <Typography variant="body2">
              Started: {new Date(queueData.queue.startedAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">
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
                    {cut.haircutTemplate.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCut && (
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {selectedCut.haircutTemplate.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cost: ${selectedCut.haircutTemplate.baseCost}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {selectedCut.haircutTemplate.baseDuration} mins
                  </Typography>
                  {selectedCut.styleNotes && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Notes: {selectedCut.styleNotes}
                    </Typography>
                  )}
                </CardContent>
            
              </Card>
            )}
             <CardActionArea>
                  <Button
                    variant="contained"
                    sx={{ m:2 }}
                    // onClick={handleJoinQueue}
                    // disabled={!selectedHaircut}
                  >
                    Join Queue
                  </Button>
                </CardActionArea>{/* 
          

          {myPosition !== null && (
            <Typography sx={{ mt: 2 }}>
              You are currently #{myPosition} in the queue.
            </Typography>
          )} */}

            {/* entries list */}
            {queueData.entries.length === 0 ? (
              <Typography sx={{ mt: 2 }} color="text.secondary">
                This queue is empty — you’ll be the first in line!
              </Typography>
            ) : (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {queueData.entries.map((entry) => (
                  <Grid item xs={12} key={entry._id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="body2">
                          Position: #{entry.position}
                        </Typography>
                        <Typography variant="body2">
                          Status: {entry.status}
                        </Typography>
                        <Typography variant="body2">
                          Customer: {entry.customer.username}
                        </Typography>
                        <Typography variant="body2">
                          Cut: {entry.haircut.styleNotes || "N/A"} (
                          {entry.haircut.customeDuration ?? "?"} mins, $
                          {entry.haircut.customePrice ?? "?"})
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BarberQueue;
