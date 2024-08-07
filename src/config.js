import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0La44dzbIdcAwRIIz6ITRbqFQARl4iFI",
  authDomain: "quiz-a24d3.firebaseapp.com",
  projectId: "quiz-a24d3",
  storageBucket: "quiz-a24d3.appspot.com",
  messagingSenderId: "936381631001",
  appId: "1:936381631001:web:0623d9cb11b5bc90b5f888",
  measurementId: "G-H6MQD8MB0N",
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = app.storage();
export const auth = app.auth();
export {app, db, storage};
