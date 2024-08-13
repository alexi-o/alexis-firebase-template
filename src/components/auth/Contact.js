import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          email: user.email,
        }));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.name || !formData.message) {
      const errorMessage = t("fillAllFields");
      setMessage(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      const successMessage = t("messageSent");
      setMessage(successMessage);
      toast.success(successMessage);
      setFormData({ name: "", email: formData.email, message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const errorMessage = t("submitError");
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} />
      <h2>{t("contactUsTitle")}</h2>
      {submitted ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label={t("name")}
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label={t("email")}
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={!!formData.email}
          />
          <TextField
            label={t("message")}
            name="message"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {t("submit")}
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
    </div>
  );
};

export default ContactForm;
