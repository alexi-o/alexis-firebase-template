import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MetadataExtraction from "./components/MetadataExtraction";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Admin from "./components/Admin";
import AuthContainer from "./components/AuthContainer";
import Footer from "./components/Footer";

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
        <Box
          sx={{
            minHeight: "auto",
            height: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {user && <Navbar />}
          <Container
            maxWidth="md"
            className="App"
            style={{
              backgroundColor: appliedTheme.palette.background.default,
              flex: 1,
              paddingTop: user ? "100px" : "0",
            }}
          >
            {user ? (
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Navigate to="/home" />} />
                <Route
                  path="/profile"
                  element={<UserProfile setCurrentTheme={setCurrentTheme} />}
                />
                <Route path="/signup" element={<Navigate to="/home" />} />
                <Route
                  path="/request-access"
                  element={<Navigate to="/home" />}
                />
                <Route path="/home" element={<MetadataExtraction />} />
                <Route
                  path="/admin"
                  element={
                    role === "admin" ? <Admin /> : <Navigate to="/home" />
                  }
                />
              </Routes>
            ) : (
              <AuthContainer />
            )}
          </Container>
          {!user && <Footer />}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
