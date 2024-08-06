import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import AuthTabs from "./AuthTabs";

const AuthContainer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        paddingTop: "20px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Press Start 2P', cursive",
          color: theme.palette.primary.main,
          textShadow: "2px 2px 4px #000000",
          marginBottom: "30px",
          textAlign: "center",
          letterSpacing: "2px",
        }}
      >
        Alexi's World
      </Typography>
      <AuthTabs />
    </Box>
  );
};

export default AuthContainer;
