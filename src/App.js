import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Grid, Input, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadSuccess = (image_url, metadata) => {
    const uploadData = {
      imageUrl: `http://127.0.0.1:5000${image_url}`,
      metadata: JSON.parse(metadata),
    };
    setUploads([...uploads, uploadData]);
    setSelectedUpload(uploadData);
    setImageURL(uploadData.imageUrl);
    setMetadata(uploadData.metadata);
  };

  const handleUploadError = (error) => {
    console.error("Error uploading the file:", error);
  };

  const selectUpload = (index) => {
    if (index >= 0 && index < uploads.length) {
      setSelectedUpload(uploads[index]);
      setImageURL(uploads[index].imageUrl);
      setMetadata(uploads[index].metadata);
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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { image_url, metadata } = response.data;
      handleUploadSuccess(image_url, metadata);
    } catch (error) {
      handleUploadError(error);
    }
  };

  return (
    <Container maxWidth="md" className="App">
      <Typography variant="h4" align="center" gutterBottom>
        Image Upload and Metadata Generation
      </Typography>
      <Sidebar uploads={uploads} selectUpload={selectUpload} />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={handleUpload}
          >
            Upload and Generate Metadata
          </Button>
        </Grid>
      </Grid>
      {imageURL && (
        <img className="uploaded-image" src={imageURL} alt="Uploaded Image" />
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
      {metadata && (
        <div className="metadata">
          <Typography variant="h6" gutterBottom>
            Generated Metadata:
          </Typography>
          <ul>
            {metadata.map((prediction, index) => (
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
    </Container>
  );
}

export default App;
