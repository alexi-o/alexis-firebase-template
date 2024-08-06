import React, { useState } from "react";
import { Typography, Container, Paper, Tabs, Tab, Box } from "@mui/material";
import AccessRequests from "./AccessRequests";
import Invitations from "./Invitations";

const AdminPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Access Requests" />
          <Tab label="Invitations" />
        </Tabs>
        <Box hidden={tabIndex !== 0}>
          <AccessRequests />
        </Box>
        <Box hidden={tabIndex !== 1}>
          <Invitations />
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminPanel;
