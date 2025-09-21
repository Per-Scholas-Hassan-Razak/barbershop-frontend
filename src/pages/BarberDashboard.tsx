import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QueueToggle from "../components/QueueToggle";

const BarberDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <QueueToggle />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Templates Card */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Haircut Templates</Typography>
              <Typography variant="body2" color="text.secondary">
                Choose from base templates and create custom cuts.
              </Typography>
              <Button
                onClick={() => navigate("/barber/dashboard/haircuts/templates")}
                sx={{ mt: 2 }}
                variant="contained"
              >
                Go to Templates
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Custom Cuts Card */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">My Haircuts</Typography>
              <Typography variant="body2" color="text.secondary">
                View, edit, or delete your custom cuts.
              </Typography>
              <Button
                onClick={() =>
                  navigate("/barber/dashboard/haircuts/custom-cuts")
                }
                sx={{ mt: 2 }}
                variant="contained"
              >
                Manage Cuts
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BarberDashboard;
