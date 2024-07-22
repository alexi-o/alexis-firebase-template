import React from "react";

function Sidebar({ uploads, selectUpload }) {
  if (!uploads) {
    return null;
  }
  const galleryStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "10px",
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    cursor: "pointer",
  };

  return (
    <div className="sidebar">
      <h2>Previous Uploads</h2>
      <div style={galleryStyle}>
        {uploads.map((upload, index) => (
          <>
            <img
              key={index}
              src={upload.imageUrl}
              alt="Uploaded file"
              style={imageStyle}
              onClick={() => selectUpload(index)}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
