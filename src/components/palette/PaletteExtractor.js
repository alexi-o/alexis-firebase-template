import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";

function ImageUpload() {
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  console.info("colors", colors);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.info("e.target.result", e.target.result);
        setImage(e.target.result);
      };
      reader.onerror = (error) => console.error("File reading error:", error);
      reader.readAsDataURL(file);
    }
  };

  const handleColors = (extractedColors) => {
    console.info("extractedColors", extractedColors);
    setColors(extractedColors);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {image && (
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div
              className="overflow-hidden rounded-lg border"
              style={{ width: "150px", height: "150px" }}
            >
              <ColorExtractor src={image} getColors={handleColors}>
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              </ColorExtractor>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {colors.length > 0 ? (
              colors.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  style={{ backgroundColor: color }}
                  className="w-16 h-16 border border-gray-300 rounded-lg"
                />
              ))
            ) : (
              <p>No colors extracted</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
