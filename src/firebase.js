import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX2yI3uSs9zm3ZH8YNA8jYnYPwZC89-wM",
  authDomain: "get-your-board.firebaseapp.com",
  projectId: "get-your-board",
  storageBucket: "get-your-board.appspot.com",
  messagingSenderId: "430243283799",
  appId: "1:430243283799:web:fa5abcc1e008b09e07f412",
  measurementId: "G-0GYCE94TGQ"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };
