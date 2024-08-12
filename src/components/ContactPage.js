import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        "https://YOUR_FIREBASE_REGION-YOUR_PROJECT_ID.cloudfunctions.net/sendContactEmail",
        formData
      );
      if (response.status === 200) {
        setSuccess("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setError("Failed to send email. Please try again later.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Contact Alexi
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          For any inquiries, please fill out the form below.
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Email
          </Button>
        </form>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
          sx={{ mt: 3 }}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
