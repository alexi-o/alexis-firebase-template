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
import RequestAccess from "./components/RequestAccess";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
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
          <Route path="/request-access" element={<RequestAccess />} />
          <Route
            path="/home"
            element={user ? <MetadataExtraction /> : <Navigate to="/login" />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
