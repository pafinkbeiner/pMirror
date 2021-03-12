import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDj2UfjC4JXOwp_474r3Fudq3nLbn1b8rA",
    authDomain: "pmirror-1a0cc.firebaseapp.com",
    projectId: "pmirror-1a0cc",
    storageBucket: "pmirror-1a0cc.appspot.com",
    messagingSenderId: "757781335147",
    appId: "1:757781335147:web:2cd7a875b6a874b172f52e"
};
// Configure
let fb = firebase.initializeApp(firebaseConfig);
let db = fb.firestore();

// AUTH //
fb.auth();

// [START auth_state_listener]
fb.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        localStorage.setItem("uid", uid);
        console.log("RES:",fb.auth())
    } else {
        localStorage.removeItem("uid", uid);
    }
});
// [END auth_state_listener]


export { db, fb };