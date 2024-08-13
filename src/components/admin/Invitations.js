import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const invitationsCollection = collection(db, "invitations");
        const invitationSnapshot = await getDocs(invitationsCollection);
        const invitationList = invitationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvitations(invitationList);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <List>
      {invitations.map((invitation) => (
        <ListItem key={invitation.id} divider>
          <ListItemText
            primary={invitation.email}
            secondary={`Code: ${invitation.code}, Used: ${
              invitation.used ? "Yes" : "No"
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Invitations;
