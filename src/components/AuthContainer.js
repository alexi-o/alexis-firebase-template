import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import AuthTabs from "./AuthTabs";
import { useTranslation } from "react-i18next";

const AuthContainer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

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
        {t("alexisWorld")}
      </Typography>
      <AuthTabs />
    </Box>
  );
};

export default AuthContainer;
