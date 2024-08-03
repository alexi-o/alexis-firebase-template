import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Admin = () => {
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
      await updateDoc(requestDoc, { status: "approved" });

      // Add invitation code to Firestore
      await addDoc(collection(db, "invitations"), {
        email: request.email,
        code: invitationCode,
        used: false,
        createdAt: new Date(),
      });

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === request.id ? { ...req, status: "approved" } : req
        )
      );

      toast.success(`Request approved. Invitation code: ${invitationCode}`);
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request.");
    }
  };

  const generateInvitationCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin - Access Requests
      </Typography>
      <Paper style={{ padding: 16 }}>
        <List>
          {requests.map((request) => (
            <ListItem key={request.id}>
              <ListItemText
                primary={request.email}
                secondary={`Status: ${request.status || "pending"}`}
              />
              {request.status === "pending" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApprove(request)}
                >
                  Approve
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Admin;
