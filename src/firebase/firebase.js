import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjnYqo0yAXoHHU0uMg6ntspqab_6vh73s",
  authDomain: "bettys-hub.firebaseapp.com",
  databaseURL: "https://bettys-hub.firebaseio.com",
  projectId: "bettys-hub",
  storageBucket: "bettys-hub.appspot.com",
  messagingSenderId: "252479106913",
  appId: "1:252479106913:web:29c2ba453661ae2fb25f20",
  measurementId: "G-F0WLQ9EX31"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
var imageRef = storage.ref.child("images");

export { storage, firebase as default };
