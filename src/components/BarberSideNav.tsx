import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const drawerWidth = 220;

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
          backgroundColor: "#1e1e1e",
          color: "#fff",
          top: 64,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                selected={selected === item.path}
                onClick={() => setSelected(item.path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#333",
                    color: "#ff9800", // accent color
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#444",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 16, fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default BarberSideNav;
