// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#800020", 
    },
    secondary: {
      main: "#d4af37", 
    },
    background: {
      default: "#121212",
      paper: "#1a1a1a", 
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0", 
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a", 
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: "bold",
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid rgba(212, 175, 55, 0.3)", 
        },
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: {
      fontWeight: "bold",
      color: "#d4af37", 
    },
  },
});

export default theme;
