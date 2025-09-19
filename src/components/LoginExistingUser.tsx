import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import type { LoginUser } from "../types";

import { loginExistingUser } from "../services/userService";
import { validateLoginCredentials } from "../utils/validation";
import { useAuth } from "../contexts/authContext";
import { Typography } from "@mui/material";

const LoginExistingUser = () => {
  const { login } = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [existingUser, setExistingUser] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setExistingUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleExistingUserLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validationErrors = validateLoginCredentials(existingUser);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginExistingUser(existingUser);
      /**
       * 1. if successful -> extract token and invoke login in from auth context
       * 2. use auth context login method to set token in local storage
       * 3. reuse token on subsequent requests as auth header
       */

      if (response.token) {
        login(response.token);
        handleClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setExistingUser({ email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Login Exisiting User
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Paper
            component="form"
            elevation={3}
            sx={{ p: 3 }}
            onSubmit={handleExistingUserLogin}
            noValidate
          >
            <Stack spacing={3}>
              <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input
                  id="email"
                  aria-describedby="new-user-email"
                  onChange={handleInputChange}
                  error={!!errors.email}
                />
                <FormHelperText id="new-user-email" error={!!errors.email}>
                  {errors.email || "We'll never share your email."}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  aria-describedby="new-user-password"
                  onChange={handleInputChange}
                  error={!!errors.password}
                />
                <FormHelperText
                  id="new-user-password"
                  error={!!errors.password}
                >
                  {errors.password || "password must be greater than 6 characters."}
                </FormHelperText>
              </FormControl>

              <Stack spacing={1} mt={2} alignItems="center">
                <Button type="submit" variant="contained" fullWidth>
                  Log In
                </Button>
                <Button variant="outlined" fullWidth>
                  Sign Up
                </Button>

                <Typography variant="body2" color="text.secondary">
                  Not a member? Sign up today!
                </Typography>

              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default LoginExistingUser;
