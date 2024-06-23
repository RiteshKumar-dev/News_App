import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FireBase_API_KEY,
  authDomain: "news-app-a6049.firebaseapp.com",
  projectId: "news-app-a6049",
  storageBucket: "news-app-a6049.appspot.com",
  messagingSenderId: import.meta.env.VITE_REACT_APP_FireBase_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FireBase_APP_ID,
  measurementId: "G-PZBQ8ED6RD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }