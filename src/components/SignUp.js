import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    try {
      // Check the invitation code
      const docRef = doc(db, "invitations", inviteCode);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists() || docSnap.data().used) {
        setError("Invalid or already used invite code.");
        return;
      }

      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a new document in Firestore for the user with default role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // Default role
        createdAt: new Date(),
      });

      // Mark the invitation code as used
      await updateDoc(docRef, { used: true });

      console.log("User signed up successfully.");
    } catch (error) {
      console.error("Sign up failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Invitation Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
