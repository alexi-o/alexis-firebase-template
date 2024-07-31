import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import MetadataExtraction from "./components/MetadataExtraction";

function App() {
  return (
    <Router>
      <Container maxWidth="md" className="App">
        <Routes>
          <Route path="/" element={<MetadataExtraction />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
