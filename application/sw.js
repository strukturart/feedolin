const channel = new BroadcastChannel("sw-messages");
//channel.postMessage({ title: "Hello from SW" });

self.addEventListener("install", (event) => {
  //channel.postMessage("install");
});

self.addEventListener("activate", (event) => {
  // bc.postMessage("activate");
});

self.addEventListener("fetch", function (event) {
  // bc.postMessage("yeah fetch fetch");
});

self.onsystemmessage = (evt) => {
  try {
    let m = evt.data.json();
    self.registration.showNotification("Feedolin", {
      body: m.data.note,
    });
  } catch (e) {}

  try {
    const serviceHandler = () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "oauth") {
          let code = activityData.code;

          const url = "/oauth.html?code=" + code;
          channel.postMessage({
            oauth_success: url,
          });
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {}
};
