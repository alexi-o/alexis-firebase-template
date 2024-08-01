import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import MetadataExtraction from "./components/MetadataExtraction";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home"; // Placeholder for future use
import { auth } from "./firebase"; // Ensure this path is correct
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Container maxWidth="md" className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/home"
            element={user ? <MetadataExtraction /> : <Navigate to="/login" />}
          />
          <Route path="/welcome" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
