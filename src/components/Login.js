import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button variant="text" href="/signup">
        Sign Up
      </Button>
    </div>
  );
};

export default Login;
