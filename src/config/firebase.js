// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZArdBXuFZui9aRk2pinjvUFTfcfq-o9o",
  authDomain: "ecommerce-web-44.firebaseapp.com",
  projectId: "ecommerce-web-44",
  storageBucket: "ecommerce-web-44.appspot.com",
  messagingSenderId: "53390001240",
  appId: "1:53390001240:web:59dcb7729346ce353b762d",
  measurementId: "G-Q69887YD2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export {analytics,auth, firestore, storage}