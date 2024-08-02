import React from "react";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const AuthenticatedNav = () => {
  const theme = useTheme();

  return (
    <>
      <Button color="inherit">
        <Link
          to="/home"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Extractor Tool
        </Link>
      </Button>
      <Button color="inherit" onClick={() => auth.signOut()}>
        <span style={{ color: theme.palette.text.primary }}>Logout</span>
      </Button>
    </>
  );
};

export default AuthenticatedNav;
