const usePushNotification = () => {
  const requestPush = () => {
    fetch("/api/push", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (data) {
      console.log("requestPush", data);
    });
  };

  const removePushNotification = () => {
    const token = sessionStorage.getItem("fcm_token");

    if (!token) {
      return;
    }

    fetch("/api/push", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  };

  return {
    requestPush,
    removePushNotification,
  };
};

const postSubscription = (Subscription: PushSubscription) => {
  const subscription = JSON.stringify({ subscription: Subscription.toJSON() });

  fetch("/api/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: subscription,
  }).then(function (data) {
    console.log("postSubscription:response", data);
  });
};

const registerServiceWorker = () => {
  if (!navigator.serviceWorker) {
    return;
  }

  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then((pushSubscription) => postSubscription(pushSubscription));
};

export default usePushNotification;
