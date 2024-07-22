import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Container, Grid, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { storage } from "./firebase";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return { name: file.name, url };
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    setUploads((prevUploads) => [...prevUploads, ...uploadedFiles]);
    setFiles([]);
    setUploading(false);
  };

  return (
    <Container maxWidth="md" className="App">
      <Typography variant="h4" align="center" gutterBottom>
        Image Upload and Storage with Firebase
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {uploads.map((upload, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <img src={upload.url} alt={upload.name} style={{ width: "100%" }} />
            <Typography variant="body2" align="center">
              {upload.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
