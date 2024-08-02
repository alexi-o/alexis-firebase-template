// components/AuthenticatedNav.js
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const AuthenticatedNav = () => (
  <>
    <Button color="inherit">
      <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>
        Extractor Tool
      </Link>
    </Button>
    <Button color="inherit" onClick={() => auth.signOut()}>
      Logout
    </Button>
  </>
);

export default AuthenticatedNav;
