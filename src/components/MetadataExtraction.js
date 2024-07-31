import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";

function MetadataExtraction() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMetadataExtraction = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/extract_metadata",
        formData
      );
      setMetadata(response.data.metadata);
    } catch (error) {
      console.error("Error extracting metadata:", error);
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
            onClick={handleMetadataExtraction}
          >
            Extract Metadata
          </Button>
        </Grid>
        {metadata && (
          <Grid item xs={12}>
            <Typography variant="body1">
              <pre>{JSON.stringify(metadata, null, 2)}</pre>
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default MetadataExtraction;
