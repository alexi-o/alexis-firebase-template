import React from "react";

function Sidebar({ uploads, selectUpload }) {
  return (
    <div className="sidebar">
      <h2>Previous Uploads</h2>
      <ul>
        {uploads.map((upload, index) => (
          <li key={index}>
            <button onClick={() => selectUpload(index)}>
              Upload {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
