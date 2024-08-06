import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

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
          For any inquiries, please contact us at alexi@example.com.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
