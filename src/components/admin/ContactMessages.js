import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contactMessages"));
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <Paper style={{ padding: 16 }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id}>
          <ListItemText
            primary={`${message.name} (${message.email})`}
            secondary={message.message}
          />
        </ListItem>
      ))}
      {messages.length === 0 && (
        <Typography variant="body2" color="textSecondary" align="center">
          No messages found.
        </Typography>
      )}
    </List>
  );
};

export default ContactMessages;
