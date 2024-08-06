import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const requestQuery = query(
        collection(db, "accessRequests"),
        where("email", "==", email)
      );
      const requestSnapshot = await getDocs(requestQuery);
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!requestSnapshot.empty || !userSnapshot.empty) {
        setMessage("This email is already associated with a request or user.");
        toast.error("This email is already associated with a request or user.");
        return;
      }

      await addDoc(collection(db, "accessRequests"), {
        email,
        requestedAt: new Date(),
        status: "pending",
      });

      setSubmitted(true);
      setMessage("Your access request has been submitted.");
      toast.success("Access request submitted successfully.");
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage(
        "There was an error submitting your request. Please try again later."
      );
      toast.error("Error submitting request. Please try again later.");
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer position="bottom-left" autoClose="2000" />
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
