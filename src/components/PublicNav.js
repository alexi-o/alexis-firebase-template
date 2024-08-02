import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const UnauthenticatedNav = () => (
  <>
    <Button color="inherit">
      <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
        Login
      </Link>
    </Button>
    <Button color="inherit">
      <Link to="/signup" style={{ color: "inherit", textDecoration: "none" }}>
        Signup
      </Link>
    </Button>
    <Button color="inherit">
      <Link
        to="/request-access"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Request Access
      </Link>
    </Button>
  </>
);

export default UnauthenticatedNav;
