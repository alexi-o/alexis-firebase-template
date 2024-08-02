// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6c11", // Bright orange
    },
    secondary: {
      main: "#ff3864", // Vivid pink
    },
    background: {
      default: "#0D0221", // Dark background
      paper: "#261447", // Deep purple for paper
    },
    text: {
      primary: "#2de2e6",
      secondary: "#ffffff",
    },
    accent: {
      purple: "#241734",
      deepPurple: "#2e2157",
      hotPink: "#fd3777",
      neonMagenta: "#f706cf",
      brightRed: "#fd1d53",
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
