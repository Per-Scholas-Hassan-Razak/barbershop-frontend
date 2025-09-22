import { useEffect, useState } from "react";
import { deleteHaircut, fetchCustomCuts } from "../services/barberService";
import {
  Card,
  CardContent,
  Typography,
  // Grid,
  CardActions,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { BarberHaircut } from "../types";
import CustomizeHaircut from "./CustomizeHaircut";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomCuts = () => {
  const [cuts, setCuts] = useState<BarberHaircut[]>([]);
  const [filterType, setFilterType] = useState<string>("all");

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

  const filteredCuts =
  filterType === "all"
    ? cuts
    : cuts.filter((c) => c.haircutTemplate.name === filterType);

  return (
    <Container maxWidth="xl" disableGutters>
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={filterType}
          label="Filter by Type"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {[...new Set(cuts.map((c) => c.haircutTemplate.name))].map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3} justifyContent="center">
        {filteredCuts.map((cut) => (
          <Grid item xs={12} sm={6} md={4} key={cut._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                {/* Template reference */}
                <Typography variant="h6" gutterBottom>
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
                <Typography variant="body2" color="text.secondary">
                  Notes: {cut.styleNotes || "—"}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(cut)}
                >
                  Edit
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
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
    </Container>
  );
};

export default CustomCuts;
