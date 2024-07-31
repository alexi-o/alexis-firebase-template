import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import Home from "./components/Home";
import MetadataExtraction from "./components/MetadataExtraction";

function App() {
  return (
    <Router>
      <Container maxWidth="md" className="App">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Auto-tagger
            </Button>
            <Button color="inherit" component={Link} to="/metadata-extraction">
              Metadata Extraction
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metadata-extraction" element={<MetadataExtraction />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
