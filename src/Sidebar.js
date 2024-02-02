import React from "react";

function Sidebar({ uploads, selectUpload }) {
  const imageStyle = {
    maxWidth: "100px", // Adjust the maximum width as needed
    maxHeight: "100px", // Adjust the maximum height as needed
  };
  return (
    <div className="sidebar">
      <h2>Previous Uploads</h2>
      <ul>
        {uploads.map((upload, index) => (
          <li key={index}>
            <button onClick={() => selectUpload(index)}>
              {upload.imageUrl ? (
                <img
                  src={upload.imageUrl}
                  alt="Uploaded file"
                  style={imageStyle}
                />
              ) : (
                "No image"
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
