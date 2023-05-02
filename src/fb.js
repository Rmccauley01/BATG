// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB864S_A33poWwbOUUMv8vR-LbY1dBzVLA",
  authDomain: "batg-5440d.firebaseapp.com",
  projectId: "batg-5440d",
  storageBucket: "batg-5440d.appspot.com",
  messagingSenderId: "247736925517",
  appId: "1:247736925517:web:be0ca7d89068035d60cb04",
  measurementId: "G-6Y1RJDQC8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db