import React from "react";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import useUserRole from "../hooks/useUserRole";

const AuthenticatedNav = () => {
  const theme = useTheme();
  const role = useUserRole();
  console.info("role", role);
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
      <Button color="inherit">
        <Link
          to="/profile"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Profile
        </Link>
      </Button>
      {role === "admin" && (
        <Button color="inherit">
          <Link
            to="/admin"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            Admin
          </Link>
        </Button>
      )}
      <Button color="inherit" onClick={() => auth.signOut()}>
        <span style={{ color: theme.palette.text.primary }}>Logout</span>
      </Button>
    </>
  );
};

export default AuthenticatedNav;
