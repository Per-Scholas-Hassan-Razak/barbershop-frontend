import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 4,
      }}
    >
      <Grid container spacing={4} sx={{ height: "80vh" }}>
        {/* Customer Section */}
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Paper
            sx={{
              p: 4,
              bgcolor: "grey.900",
              color: "white",
              borderRadius: 3,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            elevation={6}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url('/robert-davis-TYs3I9LNK5s-unsplash.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
                filter: "brightness(0.5)",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Your haircut, without the wait.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: "grey.300" }}>
                Browse barbers, see real-time queues, and reserve your spot
                instantly. Walk in when it’s your turn.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate("/customer/dashboard/allqueues")}
              >
                Explore Queues
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Barber Section */}
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Paper
            sx={{
              p: 4,
              bgcolor: "grey.900",
              color: "white",
              borderRadius: 3,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            elevation={6}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url('/vitor-monthay-Ehsvw7CEfb4-unsplash.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
                filter: "brightness(0.5)",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Run your shop smarter.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: "grey.300" }}>
                Open and close queues, manage custom haircuts, and track
                customers in real time. Simplify your day, keep customers happy.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => navigate("/barber/dashboard")}
              >
                Barber Dashboard
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
