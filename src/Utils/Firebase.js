// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// if you want it to keep it private which u should but not for this one..then go for the env method of GitIgnore...
const firebaseConfig = {
  apiKey: "AIzaSyBkbjxkd1LeHgsYEe1OIMmGHqhEhBoEIgw",
  authDomain: "connector-dd016.firebaseapp.com",
  projectId: "connector-dd016",
  storageBucket: "connector-dd016.appspot.com",
  messagingSenderId: "248227197231",
  appId: "1:248227197231:web:1d6e1158c0a7ddb0b2f1da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
