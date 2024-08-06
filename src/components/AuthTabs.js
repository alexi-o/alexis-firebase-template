import React, { useState } from "react";
import { Tabs, Tab, Box, useTheme } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
import RequestAccess from "./RequestAccess";

const AuthTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Box
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
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
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
          <Tab label="Request Access" />
        </Tabs>
        <Box
          sx={{
            p: 3,
            backgroundColor: theme.palette.background.default,
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
