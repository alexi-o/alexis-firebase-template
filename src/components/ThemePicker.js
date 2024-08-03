// ThemePicker.js
import React, { useState, useEffect } from "react";
import { MenuItem, Select, Typography } from "@mui/material";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ThemePicker = ({ currentTheme, setCurrentTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleChange = async (event) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    setCurrentTheme(newTheme);

    if (auth.currentUser) {
      try {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, { theme: newTheme });
        console.log("Theme updated successfully.");
      } catch (error) {
        console.error("Error updating theme:", error);
      }
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Typography variant="h6">Select Theme:</Typography>
      <Select value={selectedTheme} onChange={handleChange} variant="outlined">
        <MenuItem value="dark">Dark Theme</MenuItem>
        <MenuItem value="light">Light Theme</MenuItem>
      </Select>
    </div>
  );
};

export default ThemePicker;
