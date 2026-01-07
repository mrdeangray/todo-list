// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvjxnPyD-4PjK3ICi4NQXo2aFPECbo7Lk",
  authDomain: "todo-list-1cbb5.firebaseapp.com",
  projectId: "todo-list-1cbb5",
  storageBucket: "todo-list-1cbb5.firebasestorage.app",
  messagingSenderId: "264878530852",
  appId: "1:264878530852:web:d55bbb4c0d338c0df1d3b1",
  measurementId: "G-E93Z97KRHP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };