import React from "react";
import { Typography } from "@mui/material";

function ImageDetails({ selectedUpload }) {
  if (!selectedUpload) {
    return null;
  }

  return (
    <div className="image-details-container">
      <div className="image-container">
        {selectedUpload.imageUrl && (
          <img
            className="uploaded-image"
            src={selectedUpload.imageUrl}
            alt="Uploaded file"
          />
        )}
      </div>
      <div className="details-container">
        {selectedUpload.metadata && (
          <div className="metadata">
            <Typography variant="h6" gutterBottom>
              Generated Metadata:
            </Typography>
            <ul>
              {selectedUpload.metadata.map((prediction, index) => (
                <li key={index}>
                  {prediction[1]} ({(prediction[2] * 100).toFixed(2)}%)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageDetails;
