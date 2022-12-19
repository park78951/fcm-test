importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBEAwko9Jq14UBFNbrj4c4ukn6eIcn8Vfw",
  authDomain: "dobo-fcm-test.firebaseapp.com",
  projectId: "dobo-fcm-test",
  storageBucket: "dobo-fcm-test.appspot.com",
  messagingSenderId: "772795326260",
  appId: "1:772795326260:web:9c3a8063bb5ddf9615cf61",
  measurementId: "G-5MWNM1MK5E",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
