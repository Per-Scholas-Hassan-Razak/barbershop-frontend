import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import type { CreateHaircut, CustomizeHaircutProps } from "../types";
import { validateHaircut } from "../utils/validation";
import { createHaircut, updateHaircut } from "../services/barberService";
import { Typography } from "@mui/material";
import { useSnackbar } from "../contexts/snackbarContext";

const CustomizeHaircut = ({
  open,
  onClose,
  template,
  mode,
  cut,
}: CustomizeHaircutProps) => {

  const { showMessage } = useSnackbar();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newHaircut, setNewHaircut] = useState<CreateHaircut>({
    haircutTemplate: "",
    name: "",
    price: 0,
    duration: 0,
    styleNotes: "",
  });
  useEffect(() => {
    if (mode === "create" && template) {
      setNewHaircut({
        haircutTemplate: template._id,
        name: template.name,
        price: template.baseCost,
        duration: template.baseDuration,
        styleNotes: template.description || "",
      });
    } else if (mode === "edit" && cut) {
      setNewHaircut({
        haircutTemplate: cut.haircutTemplate._id,
        name: cut.haircutTemplate.name,
        price: cut.customPrice ?? cut.haircutTemplate.baseCost,
        duration: cut.customDuration ?? cut.haircutTemplate.baseDuration,
        styleNotes: cut.styleNotes || "",
      });
    }
  }, [mode, template, cut]);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: "80vh",
    bgcolor: "background.default",
    color: "text.primary",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewHaircut((prev) => ({
      ...prev,
      [id]: id === "price" || id === "duration" ? Number(value) : value,
    }));
  };

  const handleCustomizeHaircut = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validationErrors = validateHaircut(newHaircut);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log("new Haircut :", newHaircut);
      if (mode === "create") {
        await createHaircut(newHaircut);
        showMessage("Haircut created successfully!", "success");
      } else if (mode === "edit" && cut) {
        await updateHaircut(cut._id, newHaircut);
        showMessage("Haircut updated successfully!", "success");
      }
      onClose();
    } catch (err) {
      console.error(err);
      showMessage("Failed to save haircut. Please try again.", "error");
    } finally {
      if (template) {
        setNewHaircut({
          haircutTemplate: template._id,
          name: template.name,
          price: template.baseCost,
          duration: template.baseDuration,
          styleNotes: template.description || "",
        });
      }
      setErrors({});
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "blur(6px)" }, // blurred background
        },
      }}
    >
      <Box sx={style}>
        <Paper
          component="form"
          elevation={6}
          sx={{ p: 4 }}
          onSubmit={handleCustomizeHaircut}
          noValidate
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              textAlign: "center",
              color: "text.primary", // uses theme-appropriate dark text
            }}
          >
            {mode === "create" ? "✂️ Create Haircut" : "✂️ Edit Haircut"}
          </Typography>
          <Stack spacing={3}>
            <FormControl>
              <InputLabel htmlFor="name">Cut Name</InputLabel>
              <Input
                id="name"
                value={newHaircut.name}
                onChange={handleInputChange}
                error={!!errors.name}
              />
              <FormHelperText error={!!errors.name}>
                {errors.name || "Enter a haircut name"}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="price">Price ($)</InputLabel>
              <Input
                id="price"
                type="number"
                value={newHaircut.price}
                onChange={handleInputChange}
                error={!!errors.price}
              />
              <FormHelperText error={!!errors.price}>
                {errors.price || "Enter the price"}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="duration">Duration (minutes)</InputLabel>
              <Input
                id="duration"
                type="number"
                value={newHaircut.duration}
                onChange={handleInputChange}
                error={!!errors.duration}
              />
              <FormHelperText error={!!errors.duration}>
                {errors.duration || "Enter duration in minutes"}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="styleNotes">Style Notes</InputLabel>
              <Input
                id="styleNotes"
                aria-describedby="haircut-style-notes"
                value={newHaircut.styleNotes}
                onChange={handleInputChange}
              />
              <FormHelperText id="haircut-style-notes">
                Quick notes for the style (e.g. “Fade, line-up”)
              </FormHelperText>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button type="submit" variant="contained">
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CustomizeHaircut;
