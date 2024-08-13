// src/components/admin/AdminPanel.js

import React, { useState } from "react";
import { Typography, Paper, Tabs, Tab, Box } from "@mui/material";
import AccessRequests from "./AccessRequests";
import Invitations from "./Invitations";
import ContactMessages from "./ContactMessages";

const AdminPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Paper style={{ padding: 16, width: 600, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Admin
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Access Requests" />
        <Tab label="Invitations" />
        <Tab label="Contact Messages" />
      </Tabs>
      <Box hidden={tabIndex !== 0}>
        <AccessRequests />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <Invitations />
      </Box>
      <Box hidden={tabIndex !== 2}>
        <ContactMessages />
      </Box>
    </Paper>
  );
};

export default AdminPanel;
