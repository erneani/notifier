/* eslint-disable no-restricted-globals */
const vapidPublicKey =
  "BChQNdtCsSbYX1sT9uIH77h0JsR7YeGuX7xhs3AwkOCN19os9R9lc5fw9vaVBi2_3r9zcZt-JUJK XThrkaaR1zs";

const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

self.addEventListener("activate", async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(vapidPublicKey);
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    console.log(JSON.stringify(subscription));
  } catch (err) {
    console.log("Error", err);
  }
});

self.addEventListener("push", function (event) {
  // Retrieve the textual payload from event.data (a PushMessageData object).
  // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
  // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
  let payload = event.data
      ? event.data.text()
      : { head: "No Content", body: "No Content", icon: "" },
    data = JSON.parse(payload),
    head = data.title,
    body = data.alert,
    icon = data.icon;
  // If no url was received, it opens the home page of the website that sent the notification
  // Whitout this, it would open undefined or the service worker file.
  const url = data.custom.u ? data.custom.u : self.location.origin;

  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification(head, {
      body: body,
      icon: icon,
      data: { url: url },
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.waitUntil(
    event.preventDefault(),
    event.notification.close(),
    self.clients.openWindow(event.notification.data.url)
  );
});
