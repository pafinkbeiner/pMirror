// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDj2UfjC4JXOwp_474r3Fudq3nLbn1b8rA",
    authDomain: "pmirror-1a0cc.firebaseapp.com",
    projectId: "pmirror-1a0cc",
    storageBucket: "pmirror-1a0cc.appspot.com",
    messagingSenderId: "757781335147",
    appId: "1:757781335147:web:2cd7a875b6a874b172f52e"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});