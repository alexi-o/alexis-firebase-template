import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

function Sidebar({ uploads, selectUpload }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Previous Uploads
      </Typography>
      <List>
        {uploads.map((upload, index) => (
          <ListItem
            button
            key={upload.name}
            onClick={() => selectUpload(index)}
          >
            <ListItemText primary={upload.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Sidebar;
