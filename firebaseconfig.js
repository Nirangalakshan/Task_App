// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACW_EkZrjcB0wgXEx1I7UEwuUGfdLO24M",
  authDomain: "daily-planner-e67af.firebaseapp.com",
  projectId: "daily-planner-e67af",
  storageBucket: "daily-planner-e67af.firebasestorage.com",
  messagingSenderId: "157939260876",
  appId: "1:157939260876:web:73d45c519bfb3572cdd169"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

