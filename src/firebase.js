import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCsLhO_xUz9KeHrht9mLydtTd161brhde4",
    authDomain: "firstsampletest-48193.firebaseapp.com",
    projectId: "firstsampletest-48193",
    storageBucket: "firstsampletest-48193.appspot.com",
    messagingSenderId: "369898847216",
    appId: "1:369898847216:web:bb9d0aad9d7783add9fb35",
    measurementId: "G-71C4TX6SPD"
  };
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db