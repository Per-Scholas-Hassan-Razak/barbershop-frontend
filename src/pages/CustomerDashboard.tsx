import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import CustomerSideNav from "../components/CustomerSideNav";




const CustomerDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CustomerSideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
