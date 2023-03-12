// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjIl-0xLLtvYF6kMjHBnmkJ649lr9nZSI",
  authDomain: "ecom-63b25.firebaseapp.com",
  projectId: "ecom-63b25",
  storageBucket: "ecom-63b25.appspot.com",
  messagingSenderId: "283943892645",
  appId: "1:283943892645:web:7ddce0e9b6e23b4bf3ff4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);