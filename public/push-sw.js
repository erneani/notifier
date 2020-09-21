window.self.addEventListener("push", (event) => {
  console.log("Check this");
  console.log(event);
  const pushData = event.data.json();

  const config = {
    body: pushData.body,
  };

  event.waitUntil(
    window.self.registration.showNotification(pushData.title, config)
  );
});
