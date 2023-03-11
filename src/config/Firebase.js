// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpnaXlYS_0IbIf8k7cwZuDYizUHQggrvo",
  authDomain: "ecommerce-app-a46ac.firebaseapp.com",
  projectId: "ecommerce-app-a46ac",
  storageBucket: "ecommerce-app-a46ac.appspot.com",
  messagingSenderId: "940873056399",
  appId: "1:940873056399:web:b62ba546aa79a48bcf30fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);