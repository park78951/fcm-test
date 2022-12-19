import { useEffect } from "react";
import Head from "next/head";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import styles from "../styles/Home.module.css";

import usePushNotification from "../src/hooks/usePushNotification";

const firebaseConfig = {
  apiKey: "AIzaSyBEAwko9Jq14UBFNbrj4c4ukn6eIcn8Vfw",
  authDomain: "dobo-fcm-test.firebaseapp.com",
  projectId: "dobo-fcm-test",
  storageBucket: "dobo-fcm-test.appspot.com",
  messagingSenderId: "772795326260",
  appId: "1:772795326260:web:9c3a8063bb5ddf9615cf61",
  measurementId: "G-5MWNM1MK5E",
};

export default function Home() {
  const { requestPush, removePushNotification } = usePushNotification();

  const onClickPushNoti = () => {
    requestPush();
  };

  const registerPushNotification = async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      alert("This browser does not support desktop notification");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return;
    }

    const firebaseApp = initializeApp(firebaseConfig);

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          console.log("currentToken", currentToken);
          fetch("/api/push", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: currentToken }),
          });

          sessionStorage.setItem("fcm_token", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((e) => {
        console.log("An error occurred while retrieving token. ", e);
        alert(e);
      });

    onMessage(messaging, (payload) => {
      console.log("Message Received", payload);

      const notificationTitle = payload.notification?.title ?? "";
      const notificationOptions = {
        body: payload.notification?.body ?? "",
        icon: "/favicon.ico",
      };
      new Notification(notificationTitle, notificationOptions);
    });
  };

  useEffect(() => {
    registerPushNotification();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>초기 페이지</title>
        <meta name="description" content="도보 초기 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>HELLO WORLD (DOBO)</h1>
        <button
          onClick={onClickPushNoti}
          style={{
            width: "300px",
            height: "50px",
            marginTop: "20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "green",
            fontSize: "20px",
            color: "white",
          }}
        >
          푸쉬 알림
        </button>
        <button
          onClick={removePushNotification}
          style={{
            width: "300px",
            height: "50px",
            marginTop: "20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "red",
            fontSize: "20px",
            color: "white",
          }}
        >
          푸쉬 해제
        </button>
      </main>
    </div>
  );
}
