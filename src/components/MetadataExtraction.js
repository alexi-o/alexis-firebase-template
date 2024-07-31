import React, { useState, useCallback } from "react";
import {
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";

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

  const formatLabel = (label) => {
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderMetadataTable = (metadata) => {
    if (!metadata) return null;

    if (Array.isArray(metadata)) {
      // TensorFlow metadata format
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Prediction</TableCell>
                <TableCell>Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metadata.map(([id, label, probability]) => (
                <TableRow key={id}>
                  <TableCell>{formatLabel(label)}</TableCell>
                  <TableCell>{id}</TableCell>
                  <TableCell>{(probability * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      // ExifTool metadata format
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metadata).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
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
          {metadata && renderMetadataTable(metadata)}
        </Grid>
      </Grid>
    </div>
  );
}

export default MetadataExtraction;
