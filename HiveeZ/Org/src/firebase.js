import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqmPTj4wSYtqGEF6o7tgQDRxy2WckyORY",
  authDomain: "greensight-firebase.firebaseapp.com",
  projectId: "greensight-firebase",
  storageBucket: "greensight-firebase.appspot.com",
  messagingSenderId: "943838188214",
  appId: "1:943838188214:web:62d9dc7ed12f46b8474c17",
  measurementId: "G-FSF5VC8ZY8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app , auth};
