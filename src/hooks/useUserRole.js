import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists()) {
            setRole(userSnap.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [auth.currentUser]);

  return role;
};

export default useUserRole;
