// src/pages/NotFound.tsx
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/404.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)", 
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Stack spacing={3} sx={{ zIndex: 1, color: "white" }}>
        <Typography variant="h2" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: 500, mx: "auto" }}>
          Oops! The page you’re looking for doesn’t exist.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go to Landing Page
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NotFound;