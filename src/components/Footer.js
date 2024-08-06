import React from "react";
import { Box, Typography, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        borderTop: "1px solid #ccc",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        <Link href="/about" underline="hover">
          About Alexi
        </Link>{" "}
        |{" "}
        <Link href="/contact" underline="hover">
          Contact Alexi
        </Link>{" "}
        |{" "}
        <Link href="/become-alexi" underline="hover">
          Become Alexi
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
