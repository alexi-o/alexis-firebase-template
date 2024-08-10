import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(t("loginFailed", { error: error.message }));
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>{t("loginTitle")}</h2>
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
      {error && <p style={{ color: "red" }}>{t("loginFailed", { error })}</p>}{" "}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        {t("login")}
      </Button>
      <Button variant="text" href="/signup">
        {t("signUp")}
      </Button>
    </div>
  );
};

export default Login;
