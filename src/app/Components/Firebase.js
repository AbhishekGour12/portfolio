// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBj-vk8sArQHPGgYaR_oZtmmYSae0iAFYk",
  authDomain: "portolioproject-85b16.firebaseapp.com",
  databaseURL: "https://portolioproject-85b16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portolioproject-85b16",
  storageBucket: "portolioproject-85b16.appspot.com",
  messagingSenderId: "51079218835",
  appId: "1:51079218835:web:628a744f440d045456ef66"
};

// Initialize Firebase
  
 
const app = initializeApp(firebaseConfig);
 const storage = getStorage(app);


 export  {app, storage}
 