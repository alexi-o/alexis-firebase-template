import React, { useState, useCallback } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Ensure the correct path to your Firebase configuration

function MetadataExtraction() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }, []);

  const handleMetadataExtraction = async (url) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(url, formData);
      setMetadata(response.data.metadata);
    } catch (error) {
      console.error("Error extracting metadata:", error);
    }
  };

  const handleStartOver = () => {
    setFile(null);
    setMetadata(null);
    setPreviewUrl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const formatLabel = (label) => {
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const copyToClipboard = () => {
    if (!metadata) return;

    let metadataText = "";

    if (Array.isArray(metadata)) {
      // TensorFlow metadata format
      metadata.forEach(([id, label, probability]) => {
        metadataText += `${formatLabel(label)}: ${(probability * 100).toFixed(
          2
        )}%\n`;
      });
    } else {
      // ExifTool metadata format
      for (const [key, value] of Object.entries(metadata)) {
        metadataText += `${key}: ${value.toString()}\n`;
      }
    }

    navigator.clipboard.writeText(metadataText).then(
      () => {
        alert("Metadata copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const renderMetadataDiv = () => {
    if (!metadata) return null;

    let metadataText = "";

    if (Array.isArray(metadata)) {
      // TensorFlow metadata format
      metadata.forEach(([id, label, probability]) => {
        metadataText += `${formatLabel(label)}: ${(probability * 100).toFixed(
          2
        )}%\n`;
      });
    } else {
      // ExifTool metadata format
      for (const [key, value] of Object.entries(metadata)) {
        metadataText += `${key}: ${value.toString()}\n`;
      }
    }

    return (
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            width: "100%",
            backgroundColor: "#f5f5f5",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {metadataText}
        </div>
        <Grid container justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={copyToClipboard}
            style={{ marginTop: 16 }}
          >
            Copy to Clipboard
          </Button>
        </Grid>
      </Paper>
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Metadata Extraction
      </Typography>
      <Grid container justifyContent="center" style={{ marginBottom: 20 }}>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      {file && (
        <Grid container justifyContent="center" style={{ marginBottom: 20 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleStartOver}
          >
            Start Over
          </Button>
        </Grid>
      )}
      <Grid container spacing={2} alignItems="center">
        {!file && (
          <Grid item xs={12}>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body1">
                Drag & drop an image here, or click to select one
              </Typography>
            </div>
          </Grid>
        )}
        {previewUrl && (
          <Grid item xs={12}>
            <Grid container direction="column" alignItems="center">
              <img
                src={previewUrl}
                alt="Selected file"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              {file && (
                <Typography variant="subtitle1" align="center">
                  {file.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
        {file && (
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleMetadataExtraction(
                      "http://127.0.0.1:5000/image_recognition"
                    )
                  }
                >
                  AI Image Recognition
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    handleMetadataExtraction(
                      "http://127.0.0.1:5000/extract_exif_metadata"
                    )
                  }
                >
                  Extract Image Metadata Tool
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          {renderMetadataDiv()}
        </Grid>
      </Grid>
    </div>
  );
}

export default MetadataExtraction;
