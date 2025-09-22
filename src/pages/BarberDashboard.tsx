import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import BarberSideNav from "../components/BarberSideNav";



const BarberDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <BarberSideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          m: 'auto'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default BarberDashboard;
