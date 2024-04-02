import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAt0r0yd11nmXjndRQQo617k27iyoXUAG8",
  authDomain: "client-details-1eef4.firebaseapp.com",
  projectId: "client-details-1eef4",
  storageBucket: "client-details-1eef4.appspot.com",
  messagingSenderId: "974852120809",
  appId: "1:974852120809:web:174efb0d94f5b51de11078",
  measurementId: "G-DRMVPH8QTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);