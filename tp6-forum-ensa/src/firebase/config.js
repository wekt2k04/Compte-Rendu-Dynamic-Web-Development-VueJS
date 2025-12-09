// On utilise les imports de compatibilité pour supporter le code du prof (style v8)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDEq5-pdpqYgYnkUf9RrK4wllEumQwDB1k",
  authDomain: "tp-forum-ensa.firebaseapp.com",
  projectId: "tp-forum-ensa",
  storageBucket: "tp-forum-ensa.firebasestorage.app",
  messagingSenderId: "866074307722",
  appId: "1:866074307722:web:98da4e095fb3c7faad1173"
};

// Initialisation de Firebase (instance globale)
firebase.initializeApp(firebaseConfig);

// Création des services en mode Compatibilité (Possèdent les méthodes .create..., .signIn..., etc.)
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export
export { projectAuth, projectFirestore, timestamp };