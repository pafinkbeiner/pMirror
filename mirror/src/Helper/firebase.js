import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDj2UfjC4JXOwp_474r3Fudq3nLbn1b8rA",
    authDomain: "pmirror-1a0cc.firebaseapp.com",
    projectId: "pmirror-1a0cc",
    storageBucket: "pmirror-1a0cc.appspot.com",
    messagingSenderId: "757781335147",
    appId: "1:757781335147:web:2cd7a875b6a874b172f52e"
};

let fb = firebase.initializeApp(firebaseConfig);
let db = fb.firestore();

export { db };