import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = 220;

const BarberSideNav = () => {
  const [selected, setSelected] = useState("");

  const navItems = [
    { label: "View Templates", path: "/barber/dashboard/templates" },
    { label: "Mange Custom Cuts", path: "/barber/dashboard/custom-cuts" },
    { label: "Manage Queue", path: "/barber/dashboard/" },
    // Future: { label: "Profile", path: "/barber/dashboard/profile" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                selected={selected === item.path}
                onClick={() => setSelected(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default BarberSideNav;