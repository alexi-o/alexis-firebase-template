import React from "react";
import { Box, useTheme } from "@mui/material";
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
      <AuthTabs />
    </Box>
  );
};

export default AuthContainer;
