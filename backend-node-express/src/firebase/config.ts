import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXqmc_lL-g7CnfWlSv0VOrnZASy8doywM",
  authDomain: "uchat-mego.firebaseapp.com",
  projectId: "uchat-mego",
  storageBucket: "uchat-mego.firebasestorage.app",
  messagingSenderId: "636565501460",
  appId: "1:636565501460:web:11fa26065c2342cca39901",
  measurementId: "G-TV0NYKV26P"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
