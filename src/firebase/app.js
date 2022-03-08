// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXbMA4i-4eer-KB0ozdrwn4gKDweeLwSM",
    authDomain: "rent-room-a49d6.firebaseapp.com",
    projectId: "rent-room-a49d6",
    storageBucket: "rent-room-a49d6.appspot.com",
    messagingSenderId: "925428849895",
    appId: "1:925428849895:web:ea0ebba0051b3e0eab9642",
    measurementId: "G-H0TTLXV79L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

