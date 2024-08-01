import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo4RiWk5IOJ8MZ05Dxm3hgTI7sQHAudHo",
  authDomain: "meta-scraper-1bad5.firebaseapp.com",
  databaseURL:
    "https://meta-scraper-1bad5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meta-scraper-1bad5",
  storageBucket: "meta-scraper-1bad5.appspot.com",
  messagingSenderId: "57896844481",
  appId: "1:57896844481:web:88b9eaa629fdece37e2840",
  measurementId: "G-TW2457T0J1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
