// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6c11",
    },
    secondary: {
      main: "#ff3864",
    },
    background: {
      default: "#0D0221",
      paper: "#261447",
    },
    text: {
      primary: "#2de2e6",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      color: "#ff6c11",
    },
  },
});

export default theme;
