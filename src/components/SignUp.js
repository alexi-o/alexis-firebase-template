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
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
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
        const errorMessage = t("emailInUse");
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      const invitationsRef = collection(db, "invitations");
      const inviteQuery = query(
        invitationsRef,
        where("code", "==", inviteCode),
        where("used", "==", false)
      );
      const inviteSnapshot = await getDocs(inviteQuery);

      if (inviteSnapshot.empty) {
        const errorMessage = t("invalidInvite");
        setError(errorMessage);
        toast.error(errorMessage);
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

      toast.success(t("signUpSuccess"));
      console.log(t("signUpSuccess"));
    } catch (error) {
      console.error(t("signUpFailed", { error: error.message }));
      setError(error.message);
      toast.error(t("signUpFailed", { error: error.message }));
    }
  };

  return (
    <div>
      <h2>{t("signUpTitle")}</h2>
      <TextField
        label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label={t("password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label={t("invitationCode")}
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        {t("signUp")}
      </Button>
    </div>
  );
};

export default SignUp;
