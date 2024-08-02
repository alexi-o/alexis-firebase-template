import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import MetadataExtraction from "./components/MetadataExtraction";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import RequestAccess from "./components/RequestAccess";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import theme from "./theme";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container
          maxWidth="md"
          className="App"
          style={{
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/home" /> : <SignUp />}
            />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route
              path="/home"
              element={user ? <MetadataExtraction /> : <Navigate to="/login" />}
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
