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
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

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

  const handleApprove = async (requestId) => {
    try {
      const requestDoc = doc(db, "accessRequests", requestId);
      await updateDoc(requestDoc, { status: "approved" });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: "approved" }
            : request
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const requestDoc = doc(db, "accessRequests", requestId);
      await updateDoc(requestDoc, { status: "rejected" });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: "rejected" }
            : request
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
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
              <Button
                variant="contained"
                color="primary"
                disabled={request.status === "approved"}
                onClick={() => handleApprove(request.id)}
                style={{ marginRight: 8 }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={request.status === "rejected"}
                onClick={() => handleReject(request.id)}
              >
                Reject
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Admin;
