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
import SideNavWaitTime from "./SideNavWaitTime";

const drawerWidth = 220;

const CustomerSideNav = () => {
  const [selected, setSelected] = useState("");

  const navItems = [
    { label: "Home", path: "/customer/dashboard" },
    { label: "All Queues", path: "/customer/dashboard/allqueues" },
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
        <SideNavWaitTime  />
      </Box>
    </Drawer>
  );
};

export default CustomerSideNav;