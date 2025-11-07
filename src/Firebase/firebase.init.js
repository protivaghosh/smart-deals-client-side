// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwfqiBYFvKeOLpz4gCHAsS3g5QSJZzVAI",
  authDomain: "smart-deals-80bb7.firebaseapp.com",
  projectId: "smart-deals-80bb7",
  storageBucket: "smart-deals-80bb7.firebasestorage.app",
  messagingSenderId: "119788057715",
  appId: "1:119788057715:web:7ba959cd5c35b74e256606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;