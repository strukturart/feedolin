"use strict";

import { status, settings } from "../../index.js";

export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export let setTabindex = () => {
  let visibleElements = document.querySelectorAll(
    '.item:not([style*="display: none"])'
  );

  visibleElements.forEach((element, index) => {
    if (getComputedStyle(element).display !== "none") {
      element.setAttribute("tabindex", index);
    } else {
      element.removeAttribute("tabindex");
    }
  });
};

export let load_ads = function () {
  getKaiAd({
    publisher: "4408b6fa-4e1d-438f-af4d-f3be2fa97208",
    app: "flop",
    slot: "flop",
    test: 0,
    timeout: 10000,
    h: 120,
    w: 240,
    container: document.getElementById("KaiOSads-Wrapper"),
    onerror: (err) => console.error("Error:", err),
    onready: (ad) => {
      // user clicked the ad
      ad.on("click", () => console.log("click event"));

      // user closed the ad (currently only with fullscreen)
      ad.on("close", () => console.log("close event"));

      // the ad succesfully displayed
      ad.on("display", () => {
        setTabindex();
      });

      // Ad is ready to be displayed
      // calling 'display' will display the ad
      ad.call("display", {
        navClass: "item",
        tabindex: 3,
        display: "block",
      });
    },
  });
};

export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

//polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

export const geolocation = function (callback) {
  let n = document.getElementById("side-toast");
  if (n) {
    n.style.transform = "translate(0vw,0px)";
    n.innerHTML = "Determining position...";
  }

  let lastCallbackTime = 0;

  let showPosition = function (position) {
    console.log(position);
    const now = Date.now();

    // Only proceed if 20 seconds have passed since the last callback
    if (now - lastCallbackTime >= 20000) {
      lastCallbackTime = now;
      callback(position);

      if (n) {
        n.style.transform = "translate(-100vw,0px)";
        n.innerHTML = "";
      }
    }
  };

  let error = function (error) {
    if (n) {
      n.style.transform = "translate(-100vw,0px)";
      n.innerHTML = "";
    }

    switch (error.code) {
      case error.PERMISSION_DENIED:
        side_toaster("Location not provided", 5000);
        break;
      case error.POSITION_UNAVAILABLE:
        side_toaster("Current location not available", 5000);
        break;
      case error.TIMEOUT:
        side_toaster("Current location not available", 5000);
        break;
      default:
        side_toaster("Current location not available", 5000);
        break;
    }
  };

  // Use watchPosition to continuously monitor location
  const watchID = navigator.geolocation.watchPosition(showPosition, error, {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
  });
};

export let clipboard = function () {
  try {
    let text =
      window.location.origin + "/#!/intro?id=" + settings.custom_peer_id;

    let input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand("copy");
    document.body.removeChild(input);
    side_toaster(
      "You can now open an app of your choice and invite a person to chat, the address that leads to the chat room is in your clipboard",
      3000
    );

    return result; // Returns true if the copy was successful, false otherwise
  } catch (error) {
    console.error("Failed to copy text: ", error);
    return false; // Returns false if an error occurred
  }
};

export function share(url) {
  return new Promise((resolve) => {
    try {
      var activity = new MozActivity({
        name: "share",
        data: {
          type: "url",
          url: url,
        },
      });

      activity.onsuccess = function () {
        resolve(true);
      };

      activity.onerror = function () {
        console.log("The activity encountered an error: " + this.error);
        resolve(false);
      };
    } catch (e) {
      // Handle the case where MozActivity is not available
    }

    if ("b2g" in navigator) {
      let activity = new WebActivity("share", {
        type: "url",
        url: url,
      });
      activity.start().then(
        () => {
          console.log("WebActivity successful");
          resolve(true);
        },
        (err) => {
          console.log(err);
          resolve(false);
        }
      );
    }

    if (status.notKaiOS) {
      let success = clipboard();
      if (success) {
        console.log("Text copied to clipboard successfully.");
        resolve(true);
      } else {
        console.log("Failed to copy text to clipboard.");
        resolve(false);
      }
    }

    if (status.os !== "unknow") {
      if (navigator.share) {
        navigator
          .share({
            title: "Flop P2P-Messenger",
            text: "Flop P2P-Messenger",
            url: url,
          })
          .then(() => {
            console.log("Successful share");
            resolve(true);
          })
          .catch((error) => {
            console.log("Error sharing", error);
            resolve(false);
          });
      } else {
        console.log("Share not supported on this browser, do it the old way.");
        resolve(false);
      }
    }
  });
}

export function detectMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if ("b2g" in navigator || "b2g" in navigator) {
    // return "KaiOS";
  }

  // Other mobile OS or not a mobile device
  return false;
}

export function open(url) {
  try {
    var activity = new MozActivity({
      name: "view",
      data: {
        type: "url",
        url: url,
      },
    });

    activity.onsuccess = function () {};

    activity.onerror = function () {
      console.log("The activity encounter en error: " + this.error);
    };
  } catch (e) {}

  if ("b2g" in navigator) {
    let activity = new WebActivity("view", {
      type: "url",
      url: url,
    });
    activity.start().then(
      (rv) => {
        console.log("Results passed back from activity handler:");
        console.log(rv);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export var sms = (n) => {
  const smsLink = document.createElement("a");

  smsLink.href = "sms:" + n;
  smsLink.textContent = "";
  document.body.appendChild(smsLink);
  smsLink.addEventListener("click", function () {});
  smsLink.click();
  document.body.removeChild(smsLink);
};

export var email = (n) => {
  var email = "";
  var subject = "";
  var emailBody = n;

  const smsLink = document.createElement("a");
  smsLink.href =
    "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
  smsLink.textContent = "";
  document.body.appendChild(smsLink);
  smsLink.addEventListener("click", function () {});
  smsLink.click();
  document.body.removeChild(smsLink);
};

//check if internet connection
function check_iconnection() {
  function updateOfflineStatus() {
    toaster("Your Browser is offline", 15000);
    return false;
  }

  window.addEventListener("offline", updateOfflineStatus);
}

function delete_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].delete(filename);

  request.onsuccess = function () {
    //toaster("File deleted", 2000);
  };

  request.onerror = function () {
    //toaster("Unable to delete the file: " + this.error, 2000);
  };
}

function get_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].get(filename);

  request.onsuccess = function () {
    var file = this.result;
    //alert("Get the file: " + file.name);
  };

  request.onerror = function () {
    //alert("Unable to get the file: " + this.error);
  };
}

function write_file(data, filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var file = new Blob([data], {
    type: "text/plain",
  });
  var request = sdcard[1].addNamed(file, filename);

  request.onsuccess = function () {
    var name = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
  };

  // An error typically occur if a file with the same name already exist
  request.onerror = function () {
    toaster("Unable to write the file: " + this.error, 2000);
  };
}

export let sort_array = function (arr, item_key, type) {
  if (type == "date") {
    arr.sort((a, b) => {
      let da = new Date(a[item_key]),
        db = new Date(b[item_key]);
      return da - db;
    });
  }

  //sort by number
  if (type == "number") {
    arr.sort((a, b) => {
      return b[item_key] - a[item_key];
    });
  }
  //sort by string
  if (type == "string") {
    arr.sort((a, b) => {
      let fa = a[item_key].toLowerCase(),
        fb = b[item_key].toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
};

let uid = function () {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
};

let notification = "";
let notify = function (param_title, param_text, param_silent) {
  var options = {
    body: param_text,
    silent: param_silent,
    requireInteraction: false,
    //actions: [{ action: "test", title: "test" }],
  };

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    notification = new Notification(param_title, options);
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        notification = new Notification(param_title, options);
      }
    });
  }
};

//https://notifications.spec.whatwg.org/#dictdef-notificationaction

export let pushLocalNotification = function (title, body) {
  window.Notification.requestPermission().then((result) => {
    var notification = new window.Notification(title, {
      body: body,
    });

    if (Notification.permission === "denied") {
      console.error("Notification permission is denied");
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Proceed to create a notification
        }
      });
    }

    notification.onerror = function (err) {
      console.log(err);
    };
    notification.onclick = function (event) {
      if (window.navigator.mozApps) {
        var request = window.navigator.mozApps.getSelf();
        request.onsuccess = function () {
          if (request.result) {
            notification.close();
            request.result.launch();
          }
        };
      } else {
        window.open(document.location.origin, "_blank");
      }
    };
    notification.onshow = function () {
      // notification.close();
    };
  });
};
if (navigator.mozSetMessageHandler) {
  navigator.mozSetMessageHandler("alarm", function (message) {
    pushLocalNotification("Greg", message.data.note);
  });
}

export function validate_url(url) {
  var pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(url)) {
    return true;
  }
  return false;
}

export let getManifest = function (callback) {
  if (navigator.mozApps) {
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function () {
      callback(self.result);
    };
    self.onerror = function () {};
  } else {
    fetch("/manifest.webmanifest")
      .then((r) => r.json())
      .then((parsedResponse) => callback(parsedResponse));
  }
};

//top toaster
let queue = [];
let timeout;
export let toaster = function (text, time) {
  queue.push({ text: text, time: time });
  if (queue.length === 1) {
    toast_q(text, time);
  }
};

let toast_q = function (text, time) {
  var x = document.querySelector("div#toast");
  x.innerHTML = queue[0].text;

  x.style.transform = "translate(0px, 0px)";

  timeout = setTimeout(function () {
    timeout = null;
    x.style.transform = "translate(0px, -100px)";
    queue = queue.slice(1);
    if (queue.length > 0) {
      setTimeout(() => {
        toast_q(text, time);
      }, 1000);
    }
  }, time);
};

//side toaster

let queue_st = [];
export let side_toaster = function (text, time) {
  queue_st.push({ text: text, time: time });
  if (queue_st.length === 1) {
    toast_qq(text, time);
  }
};

let toast_qq = function (text, time) {
  var x = document.querySelector("div#side-toast");
  x.style.opacity = "100";
  x.innerHTML = queue_st[0].text;

  x.style.transform = "translate(0vh, 0vw)";

  timeout = setTimeout(function () {
    x.style.transform = "translate(-100vw,0px)";
    queue_st = queue.slice(1);
    if (queue_st.length > 0) {
      setTimeout(() => {
        toast_qq(text, time);
      }, 1000);
    }
  }, time);
};

//bottom bar
export let bottom_bar = function (left, center, right) {
  document.querySelector("div#bottom-bar div.button-left").innerHTML = left;
  document.querySelector("div#bottom-bar div.button-center").innerHTML = center;
  document.querySelector("div#bottom-bar div.button-right").innerHTML = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#bottom-bar").style.display = "none";
  } else {
    document.querySelector("div#bottom-bar").style.display = "block";
  }
};

//top bar
export let top_bar = function (left, center, right) {
  document.querySelector("div#top-bar div.button-left").innerHTML = left;
  document.querySelector("div#top-bar div.button-center").innerHTML = center;
  document.querySelector("div#top-bar div.button-right").innerHTML = right;
  if (left == "" && center == "" && right == "") {
    document.querySelector("div#top-bar").style.display = "none";
  } else {
    document.querySelector("div#top-bar").style.display = "block";
  }
};

let lock;
let screenlock = function (stat) {
  if (typeof window.navigator.requestWakeLock === "undefined") {
    return false;
  }
  if (stat == "lock") {
    lock = window.navigator.requestWakeLock("screen");
    lock.onsuccess = function () {};
    lock.onerror = function () {
      alert("An error occurred: " + this.error.name);
    };
  }

  if (stat == "unlock") {
    if (lock.topic == "screen") {
      lock.unlock();
    }
  }
};

//pick image
export let pick_image = function (callback) {
  try {
    let pick = new MozActivity({
      name: "pick",
      data: {
        type: ["image/png", "image/jpg", "image/jpeg"],
      },
    });

    pick.onsuccess = function (e) {
      console.log("success" + this.result);
      callback(this.result);
    };

    pick.onerror = function () {
      console.log("The activity encounter en error: " + this.error);
    };
  } catch (e) {
    console.log(e);
  }

  if ("b2g" in navigator) {
    let pick = new WebActivity("pick", {
      type: "image/*",
    });

    pick.start().then(
      (rv) => {
        callback(rv);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  if (status.notKaiOS) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.click();

    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];

      if (file) {
        callback({
          blob: file,
          filename: file.name,
          filetype: file.type,
        });
      }
    });
  }
};

//delete file
export function deleteFile(storage, path, notification) {
  let sdcard = navigator.getDeviceStorages("sdcard");

  let requestDel = sdcard[storage].delete(path);

  requestDel.onsuccess = function () {
    if (notification == "notification") {
      helper.toaster(
        'File "' + name + '" successfully deleted frome the sdcard storage area'
      );
    }
  };

  requestDel.onerror = function () {
    helper.toaster("Unable to delete the file: " + this.error);
  };
}

export let downloadFile = function (filename, data, callback) {
  if (status.notKaiOS) {
    const imgSrc = data;

    // Create a link element
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = filename;

    // Append the link to the body
    document.body.appendChild(a);

    // Programmatically click the link to trigger the download
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
  } else {
    let sdcard = "";

    try {
      sdcard = navigator.getDeviceStorage("sdcard");
    } catch (e) {}

    if ("b2g" in navigator) {
      try {
        sdcard = navigator.b2g.getDeviceStorage("sdcard");
      } catch (e) {}
    }

    fetch(data)
      .then((res) => res.blob())
      .then((blob) => {
        let request = sdcard.addNamed(blob, filename);
        request.onsuccess = function () {
          side_toaster("file downloaded", 2000);
        };

        request.onerror = function () {
          side_toaster(
            "Unable to download the file, the file probably already exists.",
            4000
          );
        };
      })
      .catch((error) => {
        side_toaster("Unable to download the file", 2000);
      });
  }
};

export function createAudioRecorder() {
  let mediaRecorder;
  let recordedChunks = [];
  let isInitialized = false;
  let stream;

  async function init() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

      mediaRecorder.ondataavailable = (event) => {
        console.log(event);

        if (event.data.size > 0) {
          recordedChunks.push(event.data);
          console.log(event.data);
        }
      };

      mediaRecorder.addEventListener("error", (event) => {
        console.error(`Error recording stream: ${event.error.name}`);
      });

      isInitialized = true; // Set the flag to true when initialization is complete
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }

  async function startRecording() {
    if (!isInitialized) {
      await init(); // Ensure initialization is complete before starting recording
    }
    recordedChunks = []; // Clear any previous recordings
    mediaRecorder.start();
  }

  function stopRecording() {
    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        let mimeType = "";

        if (MediaRecorder.isTypeSupported("audio/webm; codecs=opus")) {
          mimeType = "audio/webm; codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/ogg; codecs=opus")) {
          mimeType = "audio/ogg; codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
          mimeType = "audio/mpeg";
        } else {
          console.warn("No supported MIME type found for audio recording.");
        }

        const blob = new Blob(recordedChunks, { type: mimeType });

        recordedChunks = [];
        resolve(blob);
      };
      mediaRecorder.stop();
    });
  }

  function cleanup() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    mediaRecorder = null;
    recordedChunks = [];
    stream = null;
    isInitialized = false;
  }

  // Return an object with the methods to start and stop recording
  return {
    startRecording,
    stopRecording,
    cleanup,
  };
}
