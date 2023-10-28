importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyB6W54OGBnux3Kvs9HqxaNFiUziM55al7A",
    authDomain: "notification-demo-e9fb0.firebaseapp.com",
    projectId: "notification-demo-e9fb0",
    storageBucket: "notification-demo-e9fb0.appspot.com",
    messagingSenderId: "584996861682",
    appId: "1:584996861682:web:71fd6bd9525d2750c3826b"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // Add a call to skipWaiting here
  self.skipWaiting();
})

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

// Add an event listener to handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log(event);
  // Add code to open a new window
  // or do something else
});

messaging.onBackgroundMessage(payload => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});