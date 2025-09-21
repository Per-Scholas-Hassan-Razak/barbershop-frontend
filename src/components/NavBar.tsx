import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import RegisterNewUser from "./RegisterNewUser";
import LoginExistingUser from "./LoginExistingUser";
import { useAuth } from "../contexts/authContext";


const NavBar = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "darkgray" }}>
        <Toolbar>
        
          {"BARBERSHOP".split("").map((char, index) => (
            <Typography
              key={index}
              variant="h6"
              component="span"
              sx={{ mx: 1.4, fontWeight: "bold", color: "black" }}
            >
              {char}
            </Typography>
          ))}

  <Box sx={{ display: "flex", flexGrow: 1, marginLeft:'230px'}}>
            <img
              src="public/icons/barbericon.svg"
              alt="Barbershop Icon"
              style={{ width: 32, height: 32 }}
            />
          </Box>

          {!user ? (
            <>
              <Button onClick={() => setRegisterOpen(true)}>
                <Typography
                  sx={{ mx: 1.3, fontWeight: "bold", color: "black" }}
                >
                  Sign Up
                </Typography>
              </Button>
              <Button color="inherit" onClick={() => setLoginOpen(true)}>
                <Typography
                  sx={{ mx: 1.3, fontWeight: "bold", color: "black" }}
                >
                  Log In
                </Typography>
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              <Typography sx={{ mx: 1.3, fontWeight: "bold", color: "black" }}>
                Log Out
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <RegisterNewUser
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <LoginExistingUser open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
};

export default NavBar;
