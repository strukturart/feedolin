const userAgent = navigator.userAgent || "";

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
if (!userAgent.includes("KaiOS")) {
  const CACHE_NAME = "pwa-cache-v0.1058";
  const FILE_LIST_URL = "/file-list.json"; // URL of the JSON file containing the array of files

  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          console.log("Opened cache");

          // Fetch the file list JSON and cache the URLs
          return fetch(FILE_LIST_URL)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json(); // Parse the JSON response
            })
            .then((urlsToCache) => {
              // Ensure urlsToCache is an array
              if (Array.isArray(urlsToCache)) {
                return Promise.all(
                  urlsToCache.map((url) =>
                    cache.add(url).catch((error) => {
                      console.error(`Failed to cache ${url}:`, error);
                    })
                  )
                );
              } else {
                console.error("Fetched data is not an array:", urlsToCache);
              }
            });
        })
        .then(() => {
          return self.skipWaiting(); // Skip waiting and activate the new SW immediately
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
        // If the request is in the cache, return it. Otherwise, fetch from the network.
        return response || fetch(event.request);
      })
    );
  });
}
