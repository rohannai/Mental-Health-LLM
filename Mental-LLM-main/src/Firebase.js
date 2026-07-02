// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6D-dZhyLCZX4V6mm6E3dsfaOVmVm58Fc",
  authDomain: "mental-llm.firebaseapp.com",
  projectId: "mental-llm",
  storageBucket: "mental-llm.appspot.com",
  messagingSenderId: "337280118860",
  appId: "1:337280118860:web:239d7d794a61906dec04e9",
  measurementId: "G-W97B9VRSS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db };