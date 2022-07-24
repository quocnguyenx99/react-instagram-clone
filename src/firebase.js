// import firebase from "firebase/compat/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8DZPXc7Mt3SE1yM7I1nputhuHh0LyJL8",
  authDomain: "instagram-clone-2666d.firebaseapp.com",
  projectId: "instagram-clone-2666d",
  storageBucket: "instagram-clone-2666d.appspot.com",
  messagingSenderId: "664328946034",
  appId: "1:664328946034:web:f3659277de9fb353c09deb",
  measurementId: "G-JV74KN0NEX",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
