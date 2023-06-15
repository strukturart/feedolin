"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

export let hashCode = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ~~((hash << 5) - hash + str.charCodeAt(i));
  }
  return hash;
};

export function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export let notify = function (
  param_title,
  param_text,
  param_silent,
  requireInteraction
) {
  var options = {
    body: param_text,
    silent: param_silent,
    requireInteraction: requireInteraction,
  };

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(param_title, options);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(param_title, options, action);

        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "visible") {
            // The tab has become visible so clear the now-stale Notification.
            notification.close();
          }
        });
      }
    });
  }
};

//side toaster

let queue_st = [];
let ttimeout;
export let side_toaster = function (text, time) {
  queue_st.push({ text: text, time: time });
  if (queue_st.length === 1) {
    toast_qq(text, time);
  }
};

let toast_qq = function (text, time) {
  var x = document.querySelector("div#side-toast");
  x.innerHTML = queue_st[0].text;

  x.style.transform = "translate(0vh, 0px)";

  timeout = setTimeout(function () {
    ttimeout = null;
    x.style.transform = "translate(-100vh,0px)";
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
  document.querySelector("div#bottom-bar div#button-left").innerHTML = left;
  document.querySelector("div#bottom-bar div#button-center").innerHTML = center;
  document.querySelector("div#bottom-bar div#button-right").innerHTML = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#bottom-bar").style.display = "none";
  } else {
    document.querySelector("div#bottom-bar").style.display = "block";
  }
};

//top bar
export let top_bar = function (left, center, right) {
  document.querySelector("div#top-bar div.button-left").innerHTML = left;
  document.querySelector("div#top-bar div.button-center").textContent = center;
  document.querySelector("div#top-bar div.button-right").textContent = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#top-bar").style.display = "none";
  } else {
    document.querySelector("div#top-bar").style.display = "block";
  }
};

export let share = function (url) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "url",
      url: url,
    },
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {
    console.log("The activity encounter en error: " + this.error);
  };
};

//check if internet connection
export function check_iconnection() {
  function updateOfflineStatus() {
    toaster("Your Browser is offline", 15000);
    return false;
  }

  window.addEventListener("offline", updateOfflineStatus);
}

function delete_file(filename) {
  var sdcard = navigator.getDeviceStorage("sdcard");
  var request = sdcard.delete(filename);

  request.onsuccess = function () {
    //toaster("File deleted", 2000);
  };

  request.onerror = function () {
    //toaster("Unable to delete the file: " + this.error, 2000);
  };
}

export function get_file(filename) {
  let sdcard;
  if ("b2g" in navigator) {
    sdcard = navigator.b2g.getDeviceStorage("sdcard");
  }
  try {
    sdcard = navigator.getDeviceStorage("sdcard");
  } catch (e) {
    console.log(e);
  }
  var request = sdcard.get(filename);

  request.onsuccess = function () {
    var file = this.result;
    //alert("Get the file: " + file.name);
  };

  request.onerror = function () {
    //alert("Unable to get the file: " + this.error);
  };
}

export function write_file(data, filename) {
  let sdcard;
  if ("b2g" in navigator) {
    sdcard = navigator.b2g.getDeviceStorage("sdcard");
  }
  try {
    sdcard = navigator.getDeviceStorage("sdcard");
  } catch (e) {
    console.log(e);
  }
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

//sort
export let sort_array = function (arr, item_key, type) {
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

export function add_source(url, limit, categorie, channel) {
  let sdcard;
  if ("b2g" in navigator) {
    sdcard = navigator.b2g.getDeviceStorage("sdcard");
  }
  try {
    sdcard = navigator.getDeviceStorage("sdcard");
  } catch (e) {
    console.log(e);
  }
  let request = sdcard.get("rss-reader.json");

  request.onsuccess = function () {
    let fileget = this.result;
    let reader = new FileReader();

    reader.addEventListener("loadend", function (event) {
      let data;
      //check if json valid
      try {
        data = JSON.parse(event.target.result);
      } catch (e) {
        toaster("JSON is not valid", 2000);
        return false;
      }

      data.push({
        categorie: categorie,
        url: url,
        limit: limit,
        channel: channel,
      });

      let extData = JSON.stringify(data);

      var request_del = sdcard.delete("rss-reader.json");

      request_del.onsuccess = function () {
        //toaster('File successfully removed.', 2000);

        let file = new Blob([extData], {
          type: "application/json",
        });
        let requestAdd = sdcard.addNamed(file, "rss-reader.json");

        requestAdd.onsuccess = function () {
          toaster(
            "<br><br>the rss feed <br>has been successfully added to your list.",
            3000
          );
        };

        requestAdd.onerror = function () {
          toaster("Unable to write the file: " + this.error);
        };
      };

      request_del.onerror = function () {
        //toaster('Unable to remove the file: ' + this.error);
      };
    });

    reader.readAsText(fileget);
  };

  request.onerror = function () {
    toaster(this.error, 3000);
  };
}

export let list_files = function (filetype, callback) {
  if ("b2g" in navigator) {
    try {
      var sdcard = navigator.b2g.getDeviceStorage("sdcard");

      var iterable = sdcard.enumerate();
      var iterFiles = iterable.values();
      function next(_files) {
        _files
          .next()
          .then((file) => {
            if (!file.done) {
              let n = file.value.name.split(".");
              let file_type = n[n.length - 1];

              if (file_type == filetype) {
                callback(file.value.name);
              }
              next(_files);
            }
          })
          .catch(() => {
            next(_files);
          });
      }
      next(iterFiles);
    } catch (e) {
      console.log(e);
    }
  }

  try {
    var d = navigator.getDeviceStorage("sdcard");

    var cursor = d.enumerate();

    cursor.onsuccess = function () {
      if (!this.result) {
        console.log("finished");
      }
      if (cursor.result.name !== null) {
        var file = cursor.result;
        let n = file.name.split(".");
        let file_type = n[n.length - 1];

        if (file_type == filetype) {
          callback(file.name);
        }
        this.continue();
      }
    };

    cursor.onerror = function () {
      console.warn("No file found: " + this.error);
      callback("error");
    };
  } catch (e) {}
};

export function validate(url) {
  var pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(url)) {
    return true;
  }
  return false;
}

export let getManifest = function (callback) {
  if (!navigator.mozApps) {
    //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
  }
  let self = navigator.mozApps.getSelf();
  self.onsuccess = function () {
    callback(self.result);
  };
  self.onerror = function () {};
};

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

let lock;
export let screenlock = function (stat) {
  if (typeof window.navigator.requestWakeLock === "undefined") {
    return false;
  }
  if (stat == "lock") {
    lock = window.navigator.requestWakeLock("screen");
    lock.onsuccess = function () {
      console.log("yesah");
    };
    lock.onerror = function () {
      console.log("An error occurred: " + this.error.name);
    };
  }

  if (stat == "unlock") {
    if (lock.topic == "screen") {
      lock.unlock();
    }
  }
};

export const imageSizeReduce = () => {
  document.querySelectorAll("article img").forEach((e) => {
    let k = e.src;
    if (k.indexOf("#-moz-samplesize=1") == -1) {
      console.log("do not");
      e.src = e.src + "#-moz-samplesize=1";
    }
  });
};

export const llazyload = () => {
  document.querySelectorAll("article img").forEach((e) => {
    e.classList.add("lozad");
    if (e.hasAttribute("data-src")) {
    } else {
      e.setAttribute("data-src", e.src);
      e.src = "/assets/image/failback.png";
    }
  });
};

//filesize
export function formatFileSize(bytes, decimalPoint) {
  if (
    bytes ||
    bytes > 0 ||
    bytes != undefined ||
    bytes != NaN ||
    bytes != null
  ) {
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}

//delete file
export function deleteFile(storage, path, notification) {
  let sdcard;
  if ("b2g" in navigator) {
    sdcard = navigator.b2g.getDeviceStorage("sdcard");
  }
  try {
    sdcard = navigator.getDeviceStorage("sdcard");
  } catch (e) {
    console.log(e);
  }

  let requestDel = sdcard.delete(path);

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

export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
