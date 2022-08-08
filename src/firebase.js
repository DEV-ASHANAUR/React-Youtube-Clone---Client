// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrXGZYGgg-mTsC7HSjE0FJYqMzxgURb2E",
  authDomain: "clone-22bb5.firebaseapp.com",
  projectId: "clone-22bb5",
  storageBucket: "clone-22bb5.appspot.com",
  messagingSenderId: "1060894877425",
  appId: "1:1060894877425:web:e5a207139deaa426bbab50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export default app;