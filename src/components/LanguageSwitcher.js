import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "20px 0",
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => changeLanguage("en")}
        sx={{
          textTransform: "none",
          borderColor: "primary.main",
          color: "primary.main",
          "&:hover": {
            borderColor: "primary.dark",
            color: "primary.dark",
          },
        }}
      >
        English
      </Button>
      <Button
        variant="outlined"
        onClick={() => changeLanguage("es")}
        sx={{
          textTransform: "none",
          borderColor: "primary.main",
          color: "primary.main",
          "&:hover": {
            borderColor: "primary.dark",
            color: "primary.dark",
          },
        }}
      >
        Español
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
