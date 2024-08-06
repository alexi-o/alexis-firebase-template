// Footer.js
import React from "react";
import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
        position: "fixed",
        width: "100%",
        bottom: 0,
        textAlign: "center",
        boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body2">
        &copy; 2024 Alexi's World
        <br />
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
      </Typography>
    </Box>
  );
};

export default Footer;
