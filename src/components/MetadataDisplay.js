import React from "react";
import { Button, Paper, Grid, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MetadataDisplay = ({ metadata, addTag, copyToClipboard }) => {
  const { t } = useTranslation();

  const formatLabel = (label) =>
    label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  if (!metadata) return null;

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={5000} />
      <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            width: "100%",
            backgroundColor: "#f5f5f5",
            fontFamily: "inherit",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
        >
          {Array.isArray(metadata)
            ? metadata.map(([id, label, probability]) => (
                <Chip
                  key={id}
                  label={`${formatLabel(label)}: ${(probability * 100).toFixed(
                    2
                  )}%`}
                  onClick={() => {
                    addTag(formatLabel(label));
                    toast.success(t("tagAdded"));
                  }}
                  clickable
                  style={{ margin: "0.25rem" }}
                />
              ))
            : Object.entries(metadata).map(([key, value]) => (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  onClick={() => {
                    addTag(key);
                    toast.success(t("tagAdded"));
                  }}
                  clickable
                  style={{ margin: "0.25rem" }}
                />
              ))}
        </div>
        <Grid container justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={copyToClipboard}
            style={{ marginTop: "1rem" }}
          >
            {t("copyToClipboard")}
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default MetadataDisplay;
