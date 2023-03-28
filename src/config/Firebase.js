// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIBsZKC9eCCLnlVZkXatMTdes_Gz0f-dI",
  authDomain: "ecommerce-app-b2aa6.firebaseapp.com",
  projectId: "ecommerce-app-b2aa6",
  storageBucket: "ecommerce-app-b2aa6.appspot.com",
  messagingSenderId: "850361629822",
  appId: "1:850361629822:web:22b88550505cd582f56c2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
