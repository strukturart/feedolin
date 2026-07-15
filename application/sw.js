const sw_channel = new BroadcastChannel("sw-messages");

const userAgent =
  typeof self !== "undefined" && self.navigator && self.navigator.userAgent
    ? self.navigator.userAgent
    : "";

self.addEventListener("systemmessage", async (evt) => {
  let activityData;

  if (evt.name === "activity") {
    try {
      const handler = evt.data.webActivityRequestHandler();

      const { name: activityName, data } = handler.source;

      // Store data for later use
      activityData = data;

      if (activityData.name === "feedolin") {
        sw_channel.postMessage({
          oauth_success: activityData.data,
        });
      }
    } catch (error) {
      console.error("Error handling system message:", error);
    }
  }
});

if (userAgent && !userAgent.includes("KAIOS")) {
  const CACHE_NAME = "pwa-cache-v0.1481";
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
                    }),
                  ),
                );
              } else {
                console.error("Fetched data is not an array:", urlsToCache);
              }
            });
        })
        .then(() => {
          return self.skipWaiting(); // Skip waiting and activate the new SW immediately
        }),
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
          }),
        );
      }),
    );
  });
}

//for all devices
const CACHE_NAME_IMAGE = "images-cache-v1";
const MAX_ITEMS = 50;

// Serve files from cache when offline

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // images
  if (req.destination === "image") {
    event.respondWith(handleImageRequest(req));
    return;
  }

  // normal cache
  event.respondWith(
    caches.match(req).then((response) => {
      return response || fetch(req);
    }),
  );
});

async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME_IMAGE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  await cache.put(request, networkResponse.clone());

  cleanupCache(cache);

  return networkResponse;
}

async function cleanupCache(cache) {
  const keys = await cache.keys();

  if (keys.length <= MAX_ITEMS) return;

  const itemsToDelete = keys.slice(0, keys.length - MAX_ITEMS);

  await Promise.all(itemsToDelete.map((req) => cache.delete(req)));
}
