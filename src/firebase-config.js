import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQfOuhTNRWZGEiuJ3a99vXiPEMXbNd18k",
  authDomain: "library-management-4e5c9.firebaseapp.com",
  projectId: "library-management-4e5c9",
  storageBucket: "library-management-4e5c9.appspot.com",
  messagingSenderId: "1017339939550",
  appId: "1:1017339939550:web:6e0d10c5d605d01005d04f",
  measurementId: "G-PKW49KMEY3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);