import React, { useState, useCallback } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebase"; // Ensure your firebase configuration includes storage and auth

function MetadataExtraction() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));

    // Start upload immediately
    handleUpload(selectedFile);
  }, []);

  const handleUpload = (file) => {
    if (!file) return;

    const userId = auth.currentUser ? auth.currentUser.uid : "guest";
    const filePath = `user_uploads/${userId}/${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploadedUrl(downloadURL);
        });
      }
    );
  };

  const handleMetadataExtraction = async (url, type) => {
    if (!url) return;

    try {
      const endpoint =
        type === "recognition"
          ? "http://127.0.0.1:5000/image_recognition"
          : "http://127.0.0.1:5000/extract_exif_metadata";

      const response = await axios.post(endpoint, { url });
      setMetadata(response.data.metadata);
    } catch (error) {
      console.error(`Error extracting ${type} metadata:`, error);
    }
  };

  const handleStartOver = () => {
    setFile(null);
    setMetadata(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadedUrl("");
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
      metadata.forEach(([id, label, probability]) => {
        metadataText += `${formatLabel(label)}: ${(probability * 100).toFixed(
          2
        )}%\n`;
      });
    } else {
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
      metadata.forEach(([id, label, probability]) => {
        metadataText += `${formatLabel(label)}: ${(probability * 100).toFixed(
          2
        )}%\n`;
      });
    } else {
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
                    handleMetadataExtraction(uploadedUrl, "recognition")
                  }
                  disabled={!uploadedUrl}
                >
                  AI Image Recognition
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    handleMetadataExtraction(uploadedUrl, "metadata")
                  }
                  disabled={!uploadedUrl}
                >
                  Extract Image Metadata Tool
                </Button>
              </Grid>
            </Grid>
            {uploadProgress > 0 && (
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: 10 }}
              >
                Upload Progress: {uploadProgress.toFixed(2)}%
              </Typography>
            )}
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
