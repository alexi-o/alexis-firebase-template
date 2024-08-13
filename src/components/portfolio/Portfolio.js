import React, { useState, useEffect } from "react";
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
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Portfolio = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : "guest";
        const querySnapshot = await getDocs(
          collection(db, "users", userId, "projects")
        );
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects from Firestore:", error);
      }
    };

    fetchProjects();
  }, []);

  const fetchRepoDetails = async (url) => {
    try {
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) throw new Error("Invalid GitHub URL");

      const [, owner, repo] = match;

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      const repoData = response.data;

      const userId = auth.currentUser ? auth.currentUser.uid : "guest";
      const newProject = {
        name: repoData.name,
        description: repoData.description,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        html_url: repoData.html_url,
        owner: repoData.owner.login,
        avatar_url: repoData.owner.avatar_url,
      };

      const docRef = await addDoc(
        collection(db, "users", userId, "projects"),
        newProject
      );

      setProjects((prevProjects) => [
        ...prevProjects,
        { id: docRef.id, ...newProject },
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

  const handleDeleteProject = async (projectId) => {
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : "guest";
      await deleteDoc(doc(db, "users", userId, "projects", projectId));

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
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
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
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
                  onClick={() => handleDeleteProject(project.id)}
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
