import {
  Card,
  CardContent,
  Typography,
  Button,
  
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/allqueues.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
          zIndex: 0,
        }}
      />

      {/* Foreground Card */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 3,
          borderRadius: 3,
          boxShadow: 46,
          position: "relative",
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.9)", // semi-transparent background
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "black" }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "grey.800" }}>
            Quickly jump into your queue or explore all available barbers.
          </Typography>

          <Button
            onClick={() => navigate("/customer/dashboard/allqueues")}
            sx={{ mt: 1 }}
            variant="contained"
            size="large"
            fullWidth
          >
            View All Queues
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerHome;
