import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkGpHofE8G3nub5_KHeVCLHzBKTaeXLQM",
  authDomain: "e-commerce-stripe-fireba-81aef.firebaseapp.com",
  databaseURL: "https://e-commerce-stripe-fireba-81aef-default-rtdb.firebaseio.com",
  projectId: "e-commerce-stripe-fireba-81aef",
  storageBucket: "e-commerce-stripe-fireba-81aef.appspot.com",
  messagingSenderId: "888721165132",
  appId: "1:888721165132:web:9e74970e5109be7f9f5de9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;