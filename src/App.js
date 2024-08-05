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
import UserProfile from "./components/UserProfile";
import Admin from "./components/Admin";

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { darkTheme, lightTheme } from "./theme";
import useUserRole from "./hooks/useUserRole";

function App() {
  const [user, setUser] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const role = useUserRole();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists() && userSnap.data().theme) {
            setCurrentTheme(userSnap.data().theme);
          }
        } catch (error) {
          console.error("Error fetching user theme:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const appliedTheme = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container
          maxWidth="md"
          className="App"
          style={{
            backgroundColor: appliedTheme.palette.background.default,
            minHeight: "100vh",
            paddingTop: "100px",
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
              path="/profile"
              element={
                user ? (
                  <UserProfile setCurrentTheme={setCurrentTheme} />
                ) : (
                  <Navigate to="/login" />
                )
              }
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
            <Route
              path="/admin"
              element={
                user && role === "admin" ? <Admin /> : <Navigate to="/home" />
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
