import React from "react";
import { Box, Link, Typography } from "@mui/material";
import LanguageSwitcher from "../LanguageSwitcher";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
        position: "fixed",
        width: "100%",
        bottom: 0,
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <Typography variant="body2">&copy; 2024 Alexi's World</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link href="/about" color="inherit">
          About Alexi
        </Link>{" "}
        |{" "}
        <Link href="/contact" color="inherit">
          Contact Alexi
        </Link>{" "}
        |{" "}
        <Link href="/become" color="inherit">
          Become Alexi
        </Link>
        <LanguageSwitcher />
      </Box>
    </Box>
  );
};

export default Footer;
