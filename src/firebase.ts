// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";


// // const firebaseConfig: FirebaseConfig = {
// //   apiKey: "YOUR_API_KEY",
// //   authDomain: "YOUR_AUTH_DOMAIN",
// //   projectId: "YOUR_PROJECT_ID",
// //   storageBucket: "YOUR_STORAGE_BUCKET",
// //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
// //   appId: "YOUR_APP_ID",
// //   measurementId: "YOUR_MES_ID",
// // };
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLPbBtQ3aELQHVdaa5jNbwlF77_JJwcIw",
  authDomain: "lab2firebase-project2.firebaseapp.com",
  projectId: "lab2firebase-project2",
  storageBucket: "lab2firebase-project2.firebasestorage.app",
  messagingSenderId: "1077986005433",
  appId: "1:1077986005433:web:65b7921b7c89115473e668",
  measurementId: "G-YY8FF6V458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);