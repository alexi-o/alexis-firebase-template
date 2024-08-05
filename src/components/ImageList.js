import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Paper,
} from "@mui/material";

const ImageList = ({ images, onSelectImage }) => {
  return (
    <Paper style={{ padding: "1rem", height: "100%", overflowY: "auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Uploaded Images
      </Typography>
      <List>
        {images.map((image, index) => (
          <ListItem key={image.id} disablePadding>
            <ListItemButton onClick={() => onSelectImage(image)}>
              <img
                src={image.url}
                alt={`Thumbnail ${index}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100px",
                  objectFit: "contain",
                  marginRight: 10,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ImageList;
