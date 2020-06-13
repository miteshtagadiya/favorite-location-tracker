import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBTXgToEN4wP-iI0iG245T7sgx2KapsPGE",
  authDomain: "speedy-solstice-280013.firebaseapp.com",
  databaseURL: "https://speedy-solstice-280013.firebaseio.com",
  projectId: "speedy-solstice-280013",
  storageBucket: "speedy-solstice-280013.appspot.com",
  messagingSenderId: "1065001118143",
  appId: "1:1065001118143:web:f78d3f8fcea167279f190a",
  measurementId: "G-7QVD865LCG",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
