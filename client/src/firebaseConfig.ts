// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-ytx.firebaseapp.com",
  projectId: "real-estate-ytx",
  storageBucket: "real-estate-ytx.appspot.com",
  messagingSenderId: "713769850769",
  appId: "1:713769850769:web:1ae7d89c393b18a913ec30",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
