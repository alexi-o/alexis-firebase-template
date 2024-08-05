import React from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";

const ImageUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        padding: "1rem",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        Drag & drop images here, or click to select
      </Typography>
    </div>
  );
};

export default ImageUploader;
