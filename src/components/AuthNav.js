import React, { useEffect, useState } from "react";
import {
  Button,
  useTheme,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import useUserRole from "../hooks/useUserRole";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "react-toastify/dist/ReactToastify.css";

const AuthenticatedNav = () => {
  const theme = useTheme();
  const role = useUserRole();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      const q = query(
        collection(db, "accessRequests"),
        where("status", "==", "pending")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPendingRequestsCount(snapshot.size);
      });

      return () => unsubscribe();
    }
  }, [role]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <Button color="inherit">
        <Link
          to="/home"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Extractor Tool
        </Link>
      </Button>
      <Button color="inherit">
        <Link
          to="/profile"
          style={{ color: theme.palette.text.primary, textDecoration: "none" }}
        >
          Profile
        </Link>
      </Button>
      <Button color="inherit" component={Link} to="/chat">
        Chats
      </Button>
      <IconButton
        color="inherit"
        edge="end"
        onClick={toggleDrawer(true)}
        aria-label="account of current user"
      >
        <AccountCircleIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: "300px" } }}
      >
        <List>
          <ListItem
            button
            component={Link}
            to="/profile"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/portfolio"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolio" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/settings"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              auth.signOut();
              toggleDrawer(false)();
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          {role === "admin" && (
            <ListItem
              button
              component={Link}
              to="/admin"
              onClick={toggleDrawer(false)}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              {pendingRequestsCount > 0 && (
                <Badge badgeContent={pendingRequestsCount} color="error" />
              )}
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default AuthenticatedNav;
