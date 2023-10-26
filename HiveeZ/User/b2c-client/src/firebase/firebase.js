import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// Configure Firebase.
export const firebaseConfig = {
  apiKey: "AIzaSyB6W54OGBnux3Kvs9HqxaNFiUziM55al7A",
  authDomain: "notification-demo-e9fb0.firebaseapp.com",
  projectId: "notification-demo-e9fb0",
  storageBucket: "notification-demo-e9fb0.appspot.com",
  messagingSenderId: "584996861682",
  appId: "1:584996861682:web:71fd6bd9525d2750c3826b",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
