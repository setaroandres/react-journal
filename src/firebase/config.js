// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3Os4KlaMbck8FQ1qiEgNH7kpfKfof75s",
  authDomain: "journal-app-fd621.firebaseapp.com",
  projectId: "journal-app-fd621",
  storageBucket: "journal-app-fd621.appspot.com",
  messagingSenderId: "198766930752",
  appId: "1:198766930752:web:c21f9697ee1f29cc0628a5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);