// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgRRoWtjGuYweQcsXvQ6bV-G4ihgv-juM",
  authDomain: "citas-app-2367e.firebaseapp.com",
  projectId: "citas-app-2367e",
  storageBucket: "citas-app-2367e.firebasestorage.app",
  messagingSenderId: "205468738776",
  appId: "1:205468738776:web:3556cbc7abb37ce4dc23ad",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export only what you use
export { auth, db };
