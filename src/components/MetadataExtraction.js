import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { storage, auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MetadataExtraction() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : "guest";

        // Query Firestore for images belonging to the current user
        const imagesQuery = query(
          collection(db, "images"),
          where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(imagesQuery);
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data().url);
        setImages(fetchedImages);
        if (fetchedImages.length > 0) {
          setSelectedImage(fetchedImages[fetchedImages.length - 1]); // Set the most recent image as selected
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    // Start upload immediately
    handleUpload(selectedFile);
  }, []);

  const handleUpload = (file) => {
    if (!file) return;

    const userId = auth.currentUser ? auth.currentUser.uid : "guest";
    const filePath = `images/${userId}/${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        setUploadedUrl(downloadURL);

        // Save the image URL to Firestore
        await addDoc(collection(db, "images"), {
          url: downloadURL,
          userId: userId,
          createdAt: new Date(),
        });

        // Update image list with the new image and set it as selected
        setImages((prevImages) => {
          const newImages = [...prevImages, downloadURL];
          setSelectedImage(downloadURL); // Automatically set the new image as selected
          return newImages;
        });
      }
    );
  };

  const handleMetadataExtraction = async (url, type) => {
    if (!url) return;

    try {
      const endpoint =
        type === "recognition"
          ? "http://127.0.0.1:5000/image_recognition"
          : "http://127.0.0.1:5000/extract_exif_metadata";

      const response = await axios.post(endpoint, { url });
      setMetadata(response.data.metadata);
    } catch (error) {
      console.error(`Error extracting ${type} metadata:`, error);

      // Show toast notification for 500 errors
      if (error.response && error.response.status === 500) {
        toast.error("Internal Server Error: Unable to extract metadata");
      } else {
        toast.error("Error: Unable to process request");
      }
    }
  };

  const handleStartOver = () => {
    setFile(null);
    setMetadata(null);
    setUploadProgress(0);
    setUploadedUrl("");
    setSelectedImage(null);
  };

  const formatLabel = (label) => {
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const copyToClipboard = () => {
    if (!metadata) return;

    let metadataText = "";

    if (Array.isArray(metadata)) {
      metadata.forEach(([id, label, probability]) => {
        metadataText += `${formatLabel(label)}: ${(probability * 100).toFixed(
          2
        )}%\n`;
      });
    } else {
      for (const [key, value] of Object.entries(metadata)) {
        metadataText += `${key}: ${value.toString()}\n`;
      }
    }

    navigator.clipboard.writeText(metadataText).then(
      () => {
        alert("Metadata copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const renderMetadataDiv = () => {
    if (!metadata) return null;

    let metadataText = "";

    if (Array.isArray(metadata)) {
      metadata.forEach(([id, label, probability]) => {
        metadataText += `${formatLabel(label)}: ${(probability * 100).toFixed(
          2
        )}%\n`;
      });
    } else {
      for (const [key, value] of Object.entries(metadata)) {
        metadataText += `${key}: ${value.toString()}\n`;
      }
    }

    return (
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            width: "100%",
            backgroundColor: "#f5f5f5",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {metadataText}
        </div>
        <Grid container justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={copyToClipboard}
            style={{ marginTop: 16 }}
          >
            Copy to Clipboard
          </Button>
        </Grid>
      </Paper>
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper style={{ padding: 16, height: "100%", overflowY: "auto" }}>
            <Typography variant="h6" align="center" gutterBottom>
              Uploaded Images
            </Typography>
            <List>
              {images.map((url, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => setSelectedImage(url)}>
                    <img
                      src={url}
                      alt={`Thumbnail ${index}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100px",
                        objectFit: "contain",
                        marginRight: 10,
                      }}
                    />
                    <ListItemText primary={`Image ${index + 1}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" align="center" gutterBottom>
            Metadata Extraction
          </Typography>
          {file && (
            <Grid
              container
              justifyContent="center"
              style={{ marginBottom: 20 }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleStartOver}
              >
                Start Over
              </Button>
            </Grid>
          )}
          <Grid container spacing={2} alignItems="center">
            {!file && (
              <Grid item xs={12}>
                <div
                  {...getRootProps()}
                  style={{
                    border: "2px dashed #cccccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <input {...getInputProps()} />
                  <Typography variant="body1">
                    Drag & drop an image here, or click to select one
                  </Typography>
                </div>
              </Grid>
            )}
            {selectedImage && (
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <Typography variant="h6" align="center">
                  Selected Image
                </Typography>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      maxHeight: "400px",
                      objectFit: "contain",
                      border: "2px solid #000",
                    }}
                  />
                </div>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  style={{ marginTop: 20 }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleMetadataExtraction(selectedImage, "recognition")
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
                        handleMetadataExtraction(selectedImage, "metadata")
                      }
                    >
                      Extract Image Metadata
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              {renderMetadataDiv()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MetadataExtraction;
