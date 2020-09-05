import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAgA_v7qolfiYniUzHviJMy8UKJiBnm9KQ",
    authDomain: "whatsapp-clone-8348c.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-8348c.firebaseio.com",
    projectId: "whatsapp-clone-8348c",
    storageBucket: "whatsapp-clone-8348c.appspot.com",
    messagingSenderId: "349635192908",
    appId: "1:349635192908:web:ff764df8e65dcf6009ace9",
    measurementId: "G-638DTQKF34"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const  db= firebaseApp.firestore();
  const auth= firebase.auth();
  const provider= new firebase.auth.
  GoogleAuthProvider();

  export  { auth, provider };
  export default db;
