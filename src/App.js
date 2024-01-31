import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      setImageURL(`http://127.0.0.1:5000${image_url}`);
      setMetadata(JSON.parse(metadata)); // Convert metadata string to JSON
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div className="App">
      <h1>Image Upload and Metadata Generation</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Generate Metadata</button>

      {imageURL && (
        <img className="uploaded-image" src={imageURL} alt="Uploaded Image" />
      )}

      {metadata && (
        <div className="metadata">
          <h2>Generated Metadata:</h2>
          <ul>
            {metadata.map((prediction, index) => (
              <li key={index}>
                {prediction[1]} ({(prediction[2] * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
