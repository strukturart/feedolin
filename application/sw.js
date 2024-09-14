import localforage from "localforage";

const channel = new BroadcastChannel("sw-messages");

//KaiOS 3 open app
self.onsystemmessage = (evt) => {
  const serviceHandler = () => {
    if (evt.name === "activity") {
      handler = evt.data.webActivityRequestHandler();

      if (handler.source.name == "flop") {
        localforage
          .setItem("connect_to_id", handler.source.data)
          .then((e) => {});

        self.clients.openWindow("index.html");
      }
    }
  };
  evt.waitUntil(serviceHandler());
};

//background sync

let intervalId;

channel.addEventListener("message", (event) => {
  if (event.data === "startInterval") {
    // Start the interval
    intervalId = setInterval(() => {
      // Send a message to the main script
      channel.postMessage("intervalTriggered");
    }, 10000); // Adjust the interval duration as needed
  }
});
