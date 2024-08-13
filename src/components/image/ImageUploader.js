import React from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ImageUploader = ({ onDrop }) => {
  const { t } = useTranslation();
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
      <Typography variant="body1">{t("dragAndDrop")}</Typography>
    </div>
  );
};

export default ImageUploader;
