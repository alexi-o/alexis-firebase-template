import React, { useEffect, useState } from "react";
import { Button, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import useUserRole from "../hooks/useUserRole";

const AuthenticatedNav = () => {
  const theme = useTheme();
  const role = useUserRole();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  useEffect(() => {
    if (role === "admin") {
      console.info("beans");
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
      <Button color="inherit" component={Link} to="/portfolio">
        Portfolio
      </Button>
      {role === "admin" && (
        <Button color="inherit">
          <Badge
            badgeContent={pendingRequestsCount}
            color="error"
            invisible={pendingRequestsCount === 0}
          >
            <Link
              to="/admin"
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              Admin
            </Link>
          </Badge>
        </Button>
      )}
      <Button color="inherit" onClick={() => auth.signOut()}>
        <span style={{ color: theme.palette.text.primary }}>Logout</span>
      </Button>
    </>
  );
};

export default AuthenticatedNav;
