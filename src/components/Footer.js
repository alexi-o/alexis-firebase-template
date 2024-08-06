import React from "react";
import { Box, Typography, Link, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.primary.main}`,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="body2"
        color={theme.palette.text.secondary}
        sx={{ marginBottom: "10px" }}
      >
        <Link href="/about" underline="hover" color="inherit">
          About
        </Link>{" "}
        |{" "}
        <Link href="/contact" underline="hover" color="inherit">
          Contact
        </Link>{" "}
        |{" "}
        <Link href="/become-alexi" underline="hover" color="inherit">
          Become
        </Link>
      </Typography>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Link
          href="https://github.com/alexi-o"
          target="_blank"
          rel="noopener"
          color="inherit"
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          <GitHubIcon />
        </Link>
        <Link
          href="https://www.linkedin.com/in/alexi-ohearn/"
          target="_blank"
          rel="noopener"
          color="inherit"
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          <LinkedInIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
