import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = auth.currentUser.uid;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id !== userId) {
          usersData.push({ id: doc.id, ...data });
        }
      });
      setUsers(usersData);
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    if (!selectedUser) return;

    const q = query(collection(db, "chats"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.senderId === userId && data.receiverId === selectedUser.id) ||
          (data.senderId === selectedUser.id && data.receiverId === userId)
        ) {
          messagesData.push(data);
        }
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [userId, selectedUser]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() !== "" && selectedUser) {
      try {
        await addDoc(collection(db, "chats"), {
          senderId: userId,
          receiverId: selectedUser.id,
          message: message.trim(),
          timestamp: serverTimestamp(),
        });
        setMessage("");
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <Paper
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
        Chat
      </Typography>
      <Grid container style={{ flex: 1, overflow: "hidden" }}>
        <Grid
          item
          xs={4}
          style={{
            borderRight: "1px solid #ccc",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                button
                selected={selectedUser?.id === user.id}
                onClick={() => setSelectedUser(user)}
              >
                <ListItemText primary={user.name || user.email} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List
            style={{
              flex: 1,
              overflowY: "auto", // Enable scrolling within the messages list
              padding: 0,
              margin: 0,
              maxHeight: "60vh", // Limit the height to fit within the container
            }}
          >
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <Grid
                  container
                  justifyContent={
                    msg.senderId === userId ? "flex-end" : "flex-start"
                  }
                >
                  <Grid item xs={8}>
                    <Paper
                      style={{
                        padding: 10,
                        textAlign: msg.senderId === userId ? "right" : "left",
                        border: `2px solid ${
                          msg.senderId === userId ? "grey" : "green"
                        }`,
                      }}
                    >
                      <ListItemText primary={msg.message} />
                    </Paper>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          <div
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
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
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={!selectedUser}
              style={{ marginLeft: "8px" }}
            >
              Send
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Chat;
