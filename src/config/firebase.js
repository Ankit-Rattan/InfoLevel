// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSEHjCLhheSVbPEITI_4JZ6N3UkDzzJXw",
  authDomain: "vite-contact-ba261.firebaseapp.com",
  projectId: "vite-contact-ba261",
  storageBucket: "vite-contact-ba261.appspot.com",
  messagingSenderId: "679695751711",
  appId: "1:679695751711:web:68bd3836a09890ea76532a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);