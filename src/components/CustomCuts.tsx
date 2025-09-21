import { useEffect, useState } from "react";
import { deleteHaircut, fetchCustomCuts } from "../services/barberService";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
} from "@mui/material";
import type { BarberHaircut } from "../types";
import CustomizeHaircut from "./CustomizeHaircut";

const CustomCuts = () => {
  const [cuts, setCuts] = useState<BarberHaircut[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedCut, setSelectedCut] = useState<BarberHaircut | null>(null);

  useEffect(() => {
    const loadCuts = async () => {
      try {
        const data = await fetchCustomCuts();
        setCuts(data);
      } catch (err) {
        console.error("Error fetching custom cuts:", err);
      }
    };
    loadCuts();
  }, []);

  const handleEdit = (cut: BarberHaircut) => {
    setSelectedCut(cut);
    setEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    const pristineCuts = [...cuts];

    const cutsAfterDeletion = cuts.filter((c) => c._id !== id);

    try {
      await deleteHaircut(id);
      setCuts(cutsAfterDeletion);
    } catch (err) {
      setCuts(pristineCuts);
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred:", err);
      }
    }
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {cuts.map((cut) => (
          <Grid item xs={12} sm={6} md={4} key={cut._id}>
            <Card>
              <CardContent>
                {/* Custom cut name */}
                {/* <Typography variant="h6">{cut.name}</Typography> */}

                {/* Template reference */}
                <Typography variant="body2">
                  TYPE: {cut.haircutTemplate.name}
                </Typography>

                {/* Price with fallback to template baseCost */}
                <Typography variant="body2">
                  Price: ${cut.customPrice ?? cut.haircutTemplate.baseCost}
                </Typography>

                {/* Duration with fallback to template baseDuration */}
                <Typography variant="body2">
                  Duration:{" "}
                  {cut.customDuration ?? cut.haircutTemplate.baseDuration} mins
                </Typography>

                {/* Notes with fallback to “—” */}
                <Typography variant="body2">
                  Notes: {cut.styleNotes || "—"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(cut)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(cut._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CustomizeHaircut
        open={editOpen}
        onClose={() => setEditOpen(false)}
        cut={selectedCut}
        mode="edit"
      />
    </>
  );
};

export default CustomCuts;
