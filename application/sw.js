import { status } from "./index.js";

const channel = new BroadcastChannel("sw-messages");

self.addEventListener("activate", (event) => {});

self.onsystemmessage = (evt) => {
  try {
    let m = evt.data.json();
    self.registration.showNotification("feedolin", {
      body: m.data.note,
    });
  } catch (e) {}

  try {
    const serviceHandler = () => {
      if (evt.name === "activity") {
        handler = evt.data.webActivityRequestHandler();
        const { name: activityName, data: activityData } = handler.source;
        if (activityName == "feedolin") {
          let code = activityData;

          channel.postMessage({
            oauth_success: code,
          });
          return "OK";
        }
        if (activityName == "pick") {
          channel.postMessage({
            "test": "test",
          });
        }
      }
    };
    evt.waitUntil(serviceHandler());
  } catch (e) {}
};

if (status.notKaiOS) {
  const CACHE_NAME = "pwa-cache-v0.1040";
  const urlsToCache = [
    "/assets/icons/link.svg",
    "/assets/icons/option.svg",
    "/assets/icons/back.svg",
    "/assets/icons/select.svg",
    "/assets/icons/play.svg",
    "/assets/fonts/Roboto-Regular.ttf",
    "/Roboto-Regular.31363ab6.ttf",
    "/manifest.webmanifest",
    "/index.html",
    "/icon-112-112.d699dfa7.png",
    "/icon-56-56.9b02d039.png",
    "/favicon.e23550e2.ico",
    "/index.0bb9b423.css",
    "/index.4149820a.css",
    "/index.ecd1e59e.css",
    "/index.175d5a46.js",
    "index.f35ba7fe.js",
    "index.runtime.2f02f579.js",
    "index.runtime.ca873bcc.js",
  ];

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  // Serve files from cache when offline
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
        }
        // If the request is in the cache, return it. Otherwise, fetch from the network.
        return response || fetch(event.request);
      })
    );
  });
}
