let timerId = null;
let endTime = 0;

self.onmessage = function (event) {
  const { action, duration } = event.data;

  if (action === "start") {
    endTime = Date.now() + duration;
    clearInterval(timerId); // Clear any previous timer
    timerId = setInterval(() => {
      const remainingTime = endTime - Date.now();
      self.postMessage({ remaining: remainingTime });
      if (remainingTime <= 0) {
        clearInterval(timerId);
        timerId = null; // Reset timerId when the timer completes
        self.postMessage({ action: "stop" });
      }
    }, 1000); // Check every second
  } else if (action === "stop") {
    clearInterval(timerId);
    timerId = null; // Reset timerId so that a new "start" message works correctly
    endTime = 0; // Reset endTime to prevent continuing after stopping
  }
};
