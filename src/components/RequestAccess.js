import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const RequestAccess = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      const errorMessage = t("validEmail");
      setMessage(errorMessage);
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

      if (!requestSnapshot.empty) {
        const requestDoc = requestSnapshot.docs[0];
        const requestData = requestDoc.data();

        if (requestData.status === "pending") {
          const infoMessage = t("pendingRequest");
          setMessage(infoMessage);
          toast.info(infoMessage);
        } else if (requestData.status === "denied") {
          const warnMessage = t("deniedRequest");
          setMessage(warnMessage);
          toast.warn(warnMessage);
        }
        return;
      }

      if (!userSnapshot.empty) {
        const errorMessage = t("existingUser");
        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      await addDoc(collection(db, "accessRequests"), {
        email,
        requestedAt: new Date(),
        status: "pending",
      });

      setSubmitted(true);
      const successMessage = t("accessSubmitted");
      setMessage(successMessage);
      toast.success(t("successRequest"));
    } catch (error) {
      console.error("Error submitting request:", error);
      const errorMessage = t("submitError");
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} />
      <h2>{t("requestAccessTitle")}</h2>
      {submitted ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label={t("email")}
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default RequestAccess;
