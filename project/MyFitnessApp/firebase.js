import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANmG-YyUPf57cDqc5p5Ukffubfn47EvSA",
    authDomain: "fitnessapp-4bfb7.firebaseapp.com",
    projectId: "fitnessapp-4bfb7",
    storageBucket: "fitnessapp-4bfb7.appspot.com",
    messagingSenderId: "883025004393",
    appId: "1:883025004393:web:f9ed188a0352faf9885ff8",
    measurementId: "G-H7H4B66FFW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };