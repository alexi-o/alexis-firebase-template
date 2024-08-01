import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const RequestAccess = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      await addDoc(collection(db, "accessRequests"), {
        email,
        requestedAt: new Date(),
      });

      setSubmitted(true);
      setMessage("Your access request has been submitted.");
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage(
        "There was an error submitting your request. Please try again later."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Request Access
      </Typography>
      {submitted ? (
        <Typography variant="body1" align="center">
          {message}
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
          {message && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              style={{ marginTop: 16 }}
            >
              {message}
            </Typography>
          )}
        </form>
      )}
    </Container>
  );
};

export default RequestAccess;
