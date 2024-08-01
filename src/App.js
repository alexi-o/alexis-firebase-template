import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import MetadataExtraction from "./components/MetadataExtraction";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Container maxWidth="md" className="App">
        <Routes>
          <Route path="/" element={<MetadataExtraction />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
