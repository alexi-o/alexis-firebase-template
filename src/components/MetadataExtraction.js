import React, { useState } from "react";
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
import axios from "axios";

function MetadataExtraction() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
                  <TableCell>{label}</TableCell>
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

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Metadata Extraction
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleMetadataExtraction("http://127.0.0.1:5000/extract_metadata")
            }
          >
            Extract Metadata (TensorFlow)
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              handleMetadataExtraction(
                "http://127.0.0.1:5000/extract_exif_metadata"
              )
            }
          >
            Extract Metadata (ExifTool)
          </Button>
        </Grid>
        <Grid item xs={12}>
          {metadata && renderMetadataTable(metadata)}
        </Grid>
      </Grid>
    </div>
  );
}

export default MetadataExtraction;
