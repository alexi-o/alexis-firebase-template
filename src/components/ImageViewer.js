import React from "react";
import { Button, Grid, TextField, Typography, Chip } from "@mui/material";

const ImageViewer = ({
  selectedImage,
  formData,
  isDirty,
  handleInputChange,
  removeTag,
  handleMetadataExtraction,
  updateImageData,
  deleteImage,
}) => {
  if (!selectedImage) return null;

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img
          src={selectedImage.url}
          alt="Selected"
          style={{
            width: "100%",
            maxWidth: "400px",
            objectFit: "contain",
            border: "2px solid #000",
          }}
        />
      </div>
      <Grid container spacing={2} style={{ marginTop: "1rem" }}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Tags:
          </Typography>
          <div>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onClick={() => removeTag(tag)}
                clickable
                color="primary"
                style={{ margin: "0.25rem" }}
              />
            ))}
          </div>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleMetadataExtraction(selectedImage.url, "recognition")
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
                handleMetadataExtraction(selectedImage.url, "metadata")
              }
            >
              Extract Image Metadata
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={updateImageData}
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteImage(selectedImage.id, selectedImage.url)}
            >
              Delete Image
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageViewer;
