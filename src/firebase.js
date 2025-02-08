// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YAIzaSyCBZadV5CyFhEDKI43uA_jI3715ZQucVEw",
  authDomain:  "disasteralert-21bde.firebaseapp.com",
  projectId: "disasteralert-21bde",
  storageBucket: "disasteralert-21bde.firebasestorage.app",
  messagingSenderId: "856050541386",
  appId: "1:856050541386:web:a6de408bd3eba3cb23d7b3D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };