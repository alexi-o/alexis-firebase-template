// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit">
              <Link
                to="/home"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Extractor Tool
              </Link>
            </Button>
            <Button color="inherit" onClick={() => auth.signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/signup"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Signup
              </Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
