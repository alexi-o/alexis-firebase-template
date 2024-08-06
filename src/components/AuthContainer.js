import React from "react";
import { Box } from "@mui/material";
import AuthTabs from "./AuthTabs";

const AuthContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "80px",
        height: "100vh",
      }}
    >
      <AuthTabs />
    </Box>
  );
};

export default AuthContainer;
