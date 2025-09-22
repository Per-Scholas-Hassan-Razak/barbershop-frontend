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
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          {"BARBERSHOP".split("").map((char, index) => (
            <Typography
              key={index}
              variant="h6"
              component="span"
              sx={{ mx: 1.4, fontWeight: "bold", color: "secondary.main" }}
            >
              {char}
            </Typography>
          ))}

          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <img
              src="/icons/barbericon.svg"
              alt="Barbershop Icon"
              style={{ width: 42, height: 42 }}
            />
          </Box>

          {!user ? (
            <>
              <Button
                onClick={() => setRegisterOpen(true)}
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "#121212",
                  },
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => setLoginOpen(true)}
                variant="outlined"
                sx={{
                  ml: 2,
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  fontWeight: "bold",
                  "&:hover": {
                    borderColor: "secondary.dark",
                    color: "secondary.dark",
                  },
                }}
              >
                Log In
              </Button>
            </>
          ) : (
            <Button
              color="secondary"
              onClick={logout}
              sx={{ fontWeight: "bold" }}
            >
              Log Out
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
