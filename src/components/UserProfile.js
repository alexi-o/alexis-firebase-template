import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = ({ setCurrentTheme }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    theme: "dark",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userDoc);
          if (userSnap.exists()) {
            setUserDetails(userSnap.data());
            setCurrentTheme(userSnap.data().theme);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [setCurrentTheme]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleThemeChange = async (event) => {
    const newTheme = event.target.value;
    setUserDetails({ ...userDetails, theme: newTheme });
    setCurrentTheme(newTheme);

    try {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDoc, { theme: newTheme });
      console.info("beans");
      toast.success("Theme updated successfully.");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Failed to update theme.");
    }
  };

  const handleSave = async () => {
    try {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDoc, userDetails);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: "auto" }}>
      <ToastContainer position="bottom-left" autoClose="2000" />
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Name"
        name="name"
        value={userDetails.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Select
        value={userDetails.theme}
        onChange={handleThemeChange}
        fullWidth
        margin="normal"
        variant="outlined"
      >
        <MenuItem value="dark">Dark Theme</MenuItem>
        <MenuItem value="light">Light Theme</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: 16 }}
      >
        Save
      </Button>
    </Paper>
  );
};

export default UserProfile;
