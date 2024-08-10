import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const useUserLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const setUserLanguage = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const preferredLanguage = userData.language || "en";
          i18n.changeLanguage(preferredLanguage);
        }
      }
    };

    setUserLanguage();
  }, [i18n]);
};

export default useUserLanguage;
