// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOIP2UrE-ls8sHjU59FWJ1-Ee8kz0KV4E",
  authDomain: "mind-self-checkin.firebaseapp.com",
  projectId: "mind-self-checkin",
  storageBucket: "mind-self-checkin.appspot.com", // fixed typo here (must end with .app**spot**.com)
  messagingSenderId: "412115477976",
  appId: "1:412115477976:web:8152fa6d8146a76c5c3ead",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);