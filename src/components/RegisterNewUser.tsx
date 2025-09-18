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
import Select from "@mui/material/Select";
import type { CreateUser } from "../types";
import MenuItem from "@mui/material/MenuItem";
import { registerNewUser } from "../services/userService";
import { validateUser } from "../utils/validation";

const RegisterNewUser = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newUser, setNewUser] = useState<CreateUser>({
    username: "",
    email: "",
    password: "",
    role: "customer",
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
    setNewUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleNewUserRegistration = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validationErrors = validateUser(newUser);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerNewUser(newUser);
      console.log("Registered:", response);
      // if (response.status === 201) {
      //   alert("user creation successful!");
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setNewUser({ username: "", email: "", password: "", role: "customer" });
      setErrors({});
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Register New User
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Paper
            component="form"
            elevation={3}
            sx={{ p: 3 }}
            onSubmit={handleNewUserRegistration}
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
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  aria-describedby="new-user-username"
                  onChange={handleInputChange}
                  error={!!errors.username}
                />
                <FormHelperText
                  id="new-user-username"
                  error={!!errors.username}
                >
                  {errors.username || "Choose a unique username."}
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
                  {errors.password || "password must be > 6 characters."}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      role: e.target.value as "customer" | "barber",
                    }))
                  }
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="barber">Barber</MenuItem>
                </Select>
                <FormHelperText>
                  Choose whether you are a customer or barber
                </FormHelperText>
              </FormControl>

              <Box display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
                <Button variant="outlined">Log In</Button>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default RegisterNewUser;
