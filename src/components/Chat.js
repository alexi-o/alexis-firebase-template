import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Chat = ({ receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.senderId === userId && data.receiverId === receiverId) ||
          (data.senderId === receiverId && data.receiverId === userId)
        ) {
          messagesData.push(data);
        }
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [userId, receiverId]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await addDoc(collection(db, "chats"), {
          senderId: userId,
          receiverId: receiverId,
          message: message.trim(),
          timestamp: serverTimestamp(),
        });
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>
      <List style={{ maxHeight: 300, overflow: "auto" }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={msg.senderId === userId ? "You" : "Other"}
              secondary={msg.message}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </Paper>
  );
};

export default Chat;
