// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiO9tGSQM6vg3cfD9FVrdUq6LmnP4d69c",
  authDomain: "todo-database-8249e.firebaseapp.com",
  projectId: "todo-database-8249e",
  storageBucket: "todo-database-8249e.appspot.com",
  messagingSenderId: "173600435560",
  appId: "1:173600435560:web:8c06abdafc539023f9badd",
  measurementId: "G-0KCBM6B61Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const newLocal = / /;
//auth
const auth = getAuth(app);

export { db, auth };