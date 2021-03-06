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


let messaging = fb.messaging();
let db = fb.firestore();

const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });

const getToken = (setTokenFound) => {
    return messaging.getToken({ vapidKey: 'GENERATED_MESSAGING_KEY' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });

}


export { db, fb, onMessageListener, getToken };