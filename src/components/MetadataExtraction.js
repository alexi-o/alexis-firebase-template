// MetadataExtraction.js
import React, { useState, useCallback, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { storage, auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageList from "./ImageList";
import ImageViewer from "./ImageViewer";
import ImageUploader from "./ImageUploader";
import MetadataDisplay from "./MetadataDisplay";

function MetadataExtraction() {
  const [files, setFiles] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    tags: [],
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : "guest";
        const imagesQuery = query(
          collection(db, "images"),
          where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(imagesQuery);
        const fetchedImages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          tags: doc.data().tags || [],
        }));
        setImages(fetchedImages);
        if (fetchedImages.length > 0) {
          const mostRecentImage = fetchedImages[fetchedImages.length - 1];
          setSelectedImage(mostRecentImage);
          setFormData({
            description: mostRecentImage.description || "",
            tags: mostRecentImage.tags || [],
          });
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    acceptedFiles.forEach((file) => handleUpload(file));
  }, []);

  const formatLabel = (label) => {
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleUpload = (file) => {
    if (!file) return;

    const userId = auth.currentUser ? auth.currentUser.uid : "guest";
    const filePath = `images/${userId}/${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`File available at ${downloadURL}`);

        const imageData = {
          name: file.name,
          description: "",
          tags: [],
          metadata: {},
          url: downloadURL,
          userId,
          createdAt: new Date(),
        };

        setImages((prevImages) => {
          const newImages = [...prevImages, imageData];
          setSelectedImage(imageData);
          setFormData({
            description: "",
            tags: [],
          });
          setIsDirty(false);
          return newImages;
        });

        try {
          await addDoc(collection(db, "images"), imageData);
          toast.success("Image successfully uploaded!");
        } catch (error) {
          console.error("Error adding document: ", error);
          toast.error("Failed to save image metadata.");
        }
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

      toast.success(response.data.message || "Operation successful");
    } catch (error) {
      console.error(`Error extracting ${type} metadata:`, error);

      if (error.response && error.response.status === 500) {
        toast.error("Internal Server Error: Unable to extract metadata");
      } else {
        toast.error("Error: Unable to process request");
      }
    }
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

  const updateImageData = async () => {
    if (!selectedImage) return;

    try {
      const updatedData = {
        description: formData.description,
        tags: formData.tags,
      };

      const imageRef = doc(db, "images", selectedImage.id);
      await updateDoc(imageRef, updatedData);

      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === selectedImage.id ? { ...img, ...updatedData } : img
        )
      );

      toast.success("Image data successfully updated!");
      setIsDirty(false);
    } catch (error) {
      console.error("Error updating image data:", error);
      toast.error("Failed to update image data.");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setIsDirty(true);
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
      setIsDirty(true);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
    setIsDirty(true);
  };

  const deleteImage = async (imageId, imageUrl) => {
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : "guest";
      const fileRef = ref(
        storage,
        `images/${userId}/${decodeURIComponent(
          imageUrl.split("/").pop().split("?")[0]
        )}`
      );
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "images", imageId));
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
      if (selectedImage && selectedImage.id === imageId) setSelectedImage(null);

      toast.success("Image successfully deleted!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={2000} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ImageList images={images} onSelectImage={setSelectedImage} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h5" align="center" gutterBottom>
            Metadata Extraction
          </Typography>
          <Grid container spacing={2} alignItems="center">
            {files.length === 0 && (
              <Grid item xs={12}>
                <ImageUploader onDrop={onDrop} />
              </Grid>
            )}
            {selectedImage && (
              <Grid item xs={12} style={{ marginTop: "1rem" }}>
                <ImageViewer
                  selectedImage={selectedImage}
                  formData={formData}
                  isDirty={isDirty}
                  handleInputChange={handleInputChange}
                  removeTag={removeTag}
                  handleMetadataExtraction={handleMetadataExtraction}
                  updateImageData={updateImageData}
                  deleteImage={deleteImage}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <MetadataDisplay
                metadata={metadata}
                addTag={addTag}
                copyToClipboard={copyToClipboard}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MetadataExtraction;
