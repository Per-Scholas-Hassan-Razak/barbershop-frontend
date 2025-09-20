import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import RegisterNewUser from "./RegisterNewUser";
import LoginExistingUser from "./LoginExistingUser";

const NavBar = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to the BarberShop
          </Typography>

          <Button color="inherit" onClick={() => setRegisterOpen(true)}>
            Sign Up
          </Button>

          
          <Button color="inherit" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <RegisterNewUser open={registerOpen} onClose={() => setRegisterOpen(false)} />
      <LoginExistingUser open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
};

export default NavBar;