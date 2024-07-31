import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import ImageDetails from "./ImageDetails";

function Home() {
  const [files, setFiles] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  useEffect(() => {
    const fetchPreviousUploads = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/");
        setUploads(response.data.image_urls);
        if (response.data.image_urls.length > 0) {
          setSelectedUpload(response.data.image_urls[0]);
        }
      } catch (error) {
        console.error("Error fetching previous uploads:", error);
      }
    };

    fetchPreviousUploads();
  }, []);

  const handleBulkUpload = async () => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/upload",
          formData
        );

        const { image_url, metadata } = response.data;

        return {
          name: generateRandomId(),
          imageUrl: `http://127.0.0.1:5000${image_url}`,
          metadata: JSON.parse(metadata),
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        return null;
      }
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    setUploads((prevUploads) => [
      ...prevUploads,
      ...uploadedFiles.filter(Boolean),
    ]);
    setFiles([]);
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const selectUpload = (index) => {
    if (index >= 0 && index < uploads.length) {
      setSelectedUpload(uploads[index]);
    }
  };

  const deleteAllFiles = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/delete_all");
      console.log("Delete response", response);
      setUploads([]);
    } catch (error) {
      console.log("Error deleting files:", error);
    }
  };

  return (
    <div>
      <Sidebar uploads={uploads} selectUpload={selectUpload} />
      <Typography variant="h5" align="center" gutterBottom>
        AI image recognition
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
            onClick={handleBulkUpload}
          >
            Bulk Upload
          </Button>
        </Grid>
      </Grid>
      <ImageDetails selectedUpload={selectedUpload} />
      <Button variant="contained" color="primary" onClick={deleteAllFiles}>
        Delete
      </Button>
    </div>
  );
}

export default Home;
