import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    try {
      const usersRef = collection(db, "users");
      const emailQuery = query(usersRef, where("email", "==", email));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        setError("Email is already in use.");
        toast.error("Email is already in use.");
        return;
      }

      // Check the invitation code in the 'invitations' collection
      const invitationsRef = collection(db, "invitations");
      const inviteQuery = query(
        invitationsRef,
        where("code", "==", inviteCode),
        where("used", "==", false)
      );
      const inviteSnapshot = await getDocs(inviteQuery);

      if (inviteSnapshot.empty) {
        setError("Invalid or already used invite code.");
        toast.error("Invalid or already used invite code.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        createdAt: new Date(),
      });

      const inviteDocRef = inviteSnapshot.docs[0].ref;
      await updateDoc(inviteDocRef, { used: true });

      toast.success("User signed up successfully.");
      console.log("User signed up successfully.");
    } catch (error) {
      console.error("Sign up failed:", error.message);
      setError(error.message);
      toast.error(error.message);
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
