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

const CustomerSideNav = () => {
  const [selected, setSelected] = useState("");

  const navItems = [
    { label: "All Queues", path: "/customer/dashboard/allqueues" },
    { label: "My Active Queue", path: "/customer/dashboard/queues/my-active" },
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

export default CustomerSideNav;