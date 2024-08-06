import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import RequestAccess from "./RequestAccess";

const AuthTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500, marginTop: "20px" }}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          sx={{
            borderBottom: "1px solid #ccc",
          }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
          <Tab label="Request Access" />
        </Tabs>
        <Box
          sx={{
            p: 3,
          }}
        >
          {tabIndex === 0 && <Login />}
          {tabIndex === 1 && <SignUp />}
          {tabIndex === 2 && <RequestAccess />}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthTabs;
