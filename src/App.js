import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Grid, Input, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (selectedUpload === null && uploads.length > 0) {
      setSelectedUpload(uploads[0]);
    }
  }, [uploads, selectedUpload]);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

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

  const addKeyword = (keyword) => {
    if (!keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
    }
  };

  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);
  };

  return (
    <Container maxWidth="md" className="App">
      <Typography variant="h4" align="center" gutterBottom>
        Image Upload and Metadata Generation
      </Typography>
      <Sidebar uploads={uploads} selectUpload={selectUpload} />
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
            Bulk Upload and Generate Metadata
          </Button>
        </Grid>
      </Grid>
      {selectedUpload && (
        <div>
          {selectedUpload.imageUrl && (
            <img
              className="uploaded-image"
              src={selectedUpload.imageUrl}
              alt="Uploaded file"
            />
          )}
          {keywords.length > 0 && (
            <div className="keyword-list">
              <Typography variant="h6" gutterBottom>
                Keywords:
              </Typography>
              <ul>
                {keywords.map((keyword, index) => (
                  <li key={index}>
                    {keyword}{" "}
                    <button
                      className="remove-button"
                      onClick={() => removeKeyword(keyword)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedUpload.metadata && (
            <div className="metadata">
              <Typography variant="h6" gutterBottom>
                Generated Metadata:
              </Typography>
              <ul>
                {selectedUpload.metadata.map((prediction, index) => (
                  <li key={index}>
                    <button
                      className="metadata-button"
                      onClick={() => addKeyword(prediction[1])}
                    >
                      {prediction[1]} ({(prediction[2] * 100).toFixed(2)}%)
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
