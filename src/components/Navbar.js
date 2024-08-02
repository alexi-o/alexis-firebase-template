import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthNav from "./AuthNav";
import PublicNav from "./PublicNav";

const Navbar = () => {
  const user = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Alexi's World
          </Link>
        </Typography>
        {user ? <AuthNav /> : <PublicNav />}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
