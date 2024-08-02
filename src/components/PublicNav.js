import React from "react";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const UnauthenticatedNav = () => {
  const theme = useTheme();

  return (
    <>
      <Button color="inherit">
        <Link
          to="/login"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Login
        </Link>
      </Button>
      <Button color="inherit">
        <Link
          to="/signup"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Signup
        </Link>
      </Button>
      <Button color="inherit">
        <Link
          to="/request-access"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Request Access
        </Link>
      </Button>
    </>
  );
};

export default UnauthenticatedNav;
