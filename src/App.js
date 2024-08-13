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
import AuthContainer from "./components/auth/AuthContainer";
import Footer from "./components/Footer";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/auth/Contact";
import BecomePage from "./components/BecomePage";
import Portfolio from "./components/Portfolio";
import Chat from "./components/chat/Chat";
import Settings from "./components/Settings";

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { darkTheme, lightTheme } from "./theme";
import useUserRole from "./hooks/useUserRole";
import useUserLanguage from "./hooks/useUserLanguage";

function App() {
  const [user, setUser] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const role = useUserRole();
  useUserLanguage();

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
            minHeight: "100vh",
            display: "flex",
          }}
        >
          {user && <Navbar />}
          <Box sx={{ flex: 1 }}>
            <Container
              maxWidth="md"
              className="App"
              sx={{
                backgroundColor: appliedTheme.palette.background.default,
                flex: 1,
                paddingTop: user ? "100px" : "0",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Routes>
                {user ? (
                  <>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/login" element={<Navigate to="/home" />} />
                    <Route
                      path="/profile"
                      element={
                        <UserProfile setCurrentTheme={setCurrentTheme} />
                      }
                    />
                    <Route path="/signup" element={<Navigate to="/home" />} />
                    <Route
                      path="/request-access"
                      element={<Navigate to="/home" />}
                    />
                    <Route path="/home" element={<MetadataExtraction />} />
                    <Route path="/portfolio" element={<Portfolio />} />{" "}
                    <Route
                      path="/admin"
                      element={
                        role === "admin" ? <Admin /> : <Navigate to="/home" />
                      }
                    />
                    <Route path="/chat" element={<Chat />} />{" "}
                    <Route path="/settings" element={<Settings />} />{" "}
                  </>
                ) : (
                  <>
                    <Route path="/" element={<AuthContainer />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/become" element={<BecomePage />} />
                  </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Container>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
