// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaKFDy2JyoiWERg2PlnW06EZNGnJOYkRA",
  authDomain: "ensa-vote-app.firebaseapp.com",
  projectId: "ensa-vote-app",
  storageBucket: "ensa-vote-app.firebasestorage.app",
  messagingSenderId: "34199141242",
  appId: "1:34199141242:web:4b1a8238415d69e793f4c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };