// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhWRrJCfQSYJWJMPXfmTKMpA4ZwAgsYCs",
  authDomain: "to-do-list-satyam.firebaseapp.com",
  projectId: "to-do-list-satyam",
  storageBucket: "to-do-list-satyam.appspot.com",
  messagingSenderId: "792433571965",
  appId: "1:792433571965:web:00a63dd689bae3d8e45914"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);