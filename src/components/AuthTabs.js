import React, { useState } from "react";
import { Tabs, Tab, Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import SignUp from "./SignUp";
import RequestAccess from "./RequestAccess";

const AuthTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const { t } = useTranslation();

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
          <Tab label={t("loginTab")} />
          <Tab label={t("signUpTab")} />
          <Tab label={t("requestAccessTab")} />
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
