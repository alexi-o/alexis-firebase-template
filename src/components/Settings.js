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
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState(i18n.language);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchSettings = async () => {
      if (userId) {
        const userDoc = doc(db, "users", userId);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setTheme(data.theme || "light");
          setTimezone(data.timezone || "UTC");
          setLanguage(data.language || i18n.language);
        }
      }
    };
    fetchSettings();
  }, [userId, i18n.language]);

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
        i18n.changeLanguage(language);
        alert(t("save"));
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {t("settings")}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("theme")}</InputLabel>
          <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <MenuItem value="light">{t("theme")} Light</MenuItem>
            <MenuItem value="dark">{t("theme")} Dark</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("timezone")}</InputLabel>
          <Select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="America/New_York">America/New_York</MenuItem>
            <MenuItem value="Europe/London">Europe/London</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("language")}</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={saveSettings}
          style={{ marginTop: "16px" }}
        >
          {t("save")}
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
