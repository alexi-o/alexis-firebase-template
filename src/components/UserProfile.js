import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({ email: "", name: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userDoc);
          if (userSnap.exists()) {
            setUserDetails(userSnap.data());
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
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
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
