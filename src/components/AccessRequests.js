import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Button, Grid } from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const AccessRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsCollection = collection(db, "accessRequests");
        const requestSnapshot = await getDocs(requestsCollection);
        const requestList = requestSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestList);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (request) => {
    try {
      const invitationCode = generateInvitationCode();
      const requestDoc = doc(db, "accessRequests", request.id);

      // Update request status to approved
      await updateDoc(requestDoc, { status: "approved", invitationCode });

      // Add invitation code to Firestore
      await addDoc(collection(db, "invitations"), {
        email: request.email,
        code: invitationCode,
        used: false,
        createdAt: new Date(),
      });

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === request.id
            ? { ...req, status: "approved", invitationCode }
            : req
        )
      );

      toast.success(`Request approved. Invitation code: ${invitationCode}`);
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request.");
    }
  };

  const handleDeny = async (request) => {
    try {
      const requestDoc = doc(db, "accessRequests", request.id);

      // Update request status to denied
      await updateDoc(requestDoc, { status: "denied" });

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === request.id ? { ...req, status: "denied" } : req
        )
      );

      toast.success(`Request denied for ${request.email}`);
    } catch (error) {
      console.error("Error denying request:", error);
      toast.error("Failed to deny request.");
    }
  };

  const generateInvitationCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  return (
    <List>
      {requests.map((request) => (
        <ListItem key={request.id} divider>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <ListItemText
                primary={request.email}
                secondary={`Status: ${request.status || "pending"}${
                  request.invitationCode
                    ? `, Code: ${request.invitationCode}`
                    : ""
                }`}
              />
            </Grid>
            <Grid item xs={4}>
              {request.status === "pending" && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApprove(request)}
                    style={{ marginRight: "8px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeny(request)}
                  >
                    Deny
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default AccessRequests;
