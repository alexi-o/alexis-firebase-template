import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";

const Portfolio = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [projects, setProjects] = useState([]);

  const fetchRepoDetails = async (url) => {
    try {
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) throw new Error("Invalid GitHub URL");

      const [_, owner, repo] = match;

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      const repoData = response.data;

      setProjects((prevProjects) => [
        ...prevProjects,
        {
          name: repoData.name,
          description: repoData.description,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          language: repoData.language,
          html_url: repoData.html_url,
          owner: repoData.owner.login,
          avatar_url: repoData.owner.avatar_url,
        },
      ]);

      setRepoUrl("");
    } catch (error) {
      console.error("Error fetching repo details:", error);
      alert("Failed to fetch project details. Please check the URL.");
    }
  };

  const handleAddRepo = () => {
    if (repoUrl) {
      fetchRepoDetails(repoUrl);
    }
  };

  const handleDeleteProject = (indexToDelete) => {
    setProjects((prevProjects) =>
      prevProjects.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Portfolio
      </Typography>
      <TextField
        label="GitHub Repository URL"
        variant="outlined"
        fullWidth
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddRepo}>
        Add Project
      </Button>
      <Grid container spacing={3} style={{ marginTop: "2rem" }}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={project.avatar_url}
                alt={project.owner}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Language: {project.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stars: {project.stars} | Forks: {project.forks}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "1rem" }}
                >
                  View on GitHub
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDeleteProject(index)}
                  style={{ marginLeft: "1rem", marginTop: "1rem" }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolio;
