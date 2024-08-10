import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState("en");
  const userId = auth.currentUser?.uid;

  // Fetch settings from Firebase
  useEffect(() => {
    const fetchSettings = async () => {
      if (userId) {
        const userDoc = doc(db, "users", userId);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setTheme(data.theme || "light");
          setTimezone(data.timezone || "UTC");
          setLanguage(data.language || "en");
        }
      }
    };
    fetchSettings();
  }, [userId]);

  // Save settings to Firebase
  const saveSettings = async () => {
    if (userId) {
      try {
        await setDoc(
          doc(db, "users", userId),
          {
            theme,
            timezone,
            language,
          },
          { merge: true }
        );
        alert("Settings saved successfully!");
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <FormControl fullWidth margin="normal">
          <InputLabel>Theme</InputLabel>
          <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Timezone</InputLabel>
          <Select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="America/New_York">America/New_York</MenuItem>
            <MenuItem value="Europe/London">Europe/London</MenuItem>
            {/* Add more timezones as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            {/* Add more languages as needed */}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={saveSettings}
          style={{ marginTop: "16px" }}
        >
          Save Settings
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
