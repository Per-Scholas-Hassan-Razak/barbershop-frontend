// src/pages/CustomerHome.tsx
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {/* All Queues Card */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">All Queues</Typography>
            <Typography variant="body2" color="text.secondary">
              Browse all barbers currently open for business and view their queues.
            </Typography>
            <Button
              onClick={() => navigate("/customer/dashboard/allqueues")}
              sx={{ mt: 2 }}
              variant="contained"
            >
              View Queues
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* My Active Queue Card */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">My Active Queue</Typography>
            <Typography variant="body2" color="text.secondary">
              Check your current spot in line and estimated wait time.
            </Typography>
            <Button
              onClick={() => navigate("/customer/dashboard/my-active")}
              sx={{ mt: 2 }}
              variant="contained"
            >
              Go to My Queue
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CustomerHome;