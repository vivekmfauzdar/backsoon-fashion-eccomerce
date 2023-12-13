// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA31koVS8jcloRiQWc-MommXrhVAZn5oU0",
  authDomain: "flipkartclone-7554c.firebaseapp.com",
  projectId: "flipkartclone-7554c",
  storageBucket: "flipkartclone-7554c.appspot.com",
  messagingSenderId: "633844262431",
  appId: "1:633844262431:web:e1f07546aa9e32d692d72a",
  measurementId: "G-0Y0KVCDRQ8",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbfs = firebase.firestore();
const storage = getStorage(app);

export { app, auth, dbfs, storage };
