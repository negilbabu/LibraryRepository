importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCcj2wYb8EChQd97KbQVWhDjYZJzw35-Gs",
    authDomain: "library-a5e42.firebaseapp.com",
    projectId: "library-a5e42",
    storageBucket: "library-a5e42.appspot.com",
    messagingSenderId: "751564284786",
    appId: "1:751564284786:web:204eaf15c0a59eb0fab3eb",
    measurementId: "G-R2YLG6D20K"
});

const messaging = firebase.messaging();