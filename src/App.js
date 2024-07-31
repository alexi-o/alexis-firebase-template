import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Home from "./components/Home";
import MetadataExtraction from "./components/MetadataExtraction";

function App() {
  return (
    <Router>
      <Container maxWidth="md" className="App">
        <Typography variant="h4" align="center" gutterBottom>
          Image Upload and Metadata Generation
        </Typography>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metadata-extraction" element={<MetadataExtraction />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
