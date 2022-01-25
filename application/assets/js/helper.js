"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = ~~((hash << 5) - hash + str.charCodeAt(i));
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function notify(param_title, param_text, param_silent, requireInteraction) {
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

            toaster("yes", 2000);
          }
        });
      }
    });
  }
}

//bottom bar
function bottom_bar(left, center, right) {
  document.querySelector("div#bottom-bar div#button-left").textContent = left;
  document.querySelector("div#bottom-bar div#button-center").textContent =
    center;
  document.querySelector("div#bottom-bar div#button-right").textContent = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#bottom-bar").style.display = "none";
  } else {
    document.querySelector("div#bottom-bar").style.display = "block";
  }
}

//top bar
function top_bar(left, center, right) {
  document.querySelector("div#top-bar div.button-left").innerHTML = left;
  document.querySelector("div#top-bar div.button-center").textContent = center;
  document.querySelector("div#top-bar div.button-right").textContent = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#top-bar").style.display = "none";
  } else {
    document.querySelector("div#top-bar").style.display = "block";
  }
}

function share(url) {
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
}

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

function add_source(url, limit, categorie, channel) {
  let sdcard = navigator.getDeviceStorages("sdcard");
  let request = sdcard[1].get("rss-reader.json");

  request.onsuccess = function () {
    let fileget = this.result;
    let reader = new FileReader();

    reader.addEventListener("loadend", function (event) {
      let data;
      //check if json valid
      try {
        data = JSON.parse(event.target.result);
      } catch (e) {
        toaster("Json is not valid", 2000);
        return false;
      }

      data.push({
        categorie: categorie,
        url: url,
        limit: limit,
        channel: channel,
      });

      let extData = JSON.stringify(data);

      var request_del = sdcard[1].delete("rss-reader.json");

      request_del.onsuccess = function () {
        //toaster('File successfully removed.', 2000);

        let file = new Blob([extData], {
          type: "application/json",
        });
        let requestAdd = sdcard[1].addNamed(file, "rss-reader.json");

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

const helper = (() => {
  function validate(url) {
    var pattern =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) {
      return true;
    }
    return false;
  }

  let getManifest = function (callback) {
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
  let toaster = function (text, time) {
    queue.push({ text: text, time: time });
    if (queue.length === 1) {
      toast_q(text, time);
    }
  };

  let add_script = function (script) {
    document.body.appendChild(document.createElement("script")).src = script;
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

  //filesize
  function formatFileSize(bytes, decimalPoint) {
    if (bytes || bytes > 0 || bytes != undefined || bytes != NaN) {
      var k = 1000,
        dm = decimalPoint || 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
  }

  //goodbye

  let goodbye = function () {
    document.getElementById("goodbye").style.display = "block";
    bottom_bar("", "", "");

    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }

    if (localStorage.clickcount == 300000) {
      message();
    } else {
      document.getElementById("ciao").style.display = "block";
      setTimeout(function () {
        window.close();
      }, 4000);
    }

    function message() {
      document.getElementById("donation").style.display = "block";
      setTimeout(function () {
        localStorage.clickcount = 1;

        window.close();
      }, 6000);
    }
  };

  //delete file
  function deleteFile(storage, path, notification) {
    let sdcard = navigator.getDeviceStorages("sdcard");

    let requestDel = sdcard[storage].delete(path);

    requestDel.onsuccess = function () {
      if (notification == "notification") {
        helper.toaster(
          'File "' +
            name +
            '" successfully deleted frome the sdcard storage area'
        );
      }
    };

    requestDel.onerror = function () {
      helper.toaster("Unable to delete the file: " + this.error);
    };
  }

  return {
    getManifest,
    toaster,
    add_script,
    deleteFile,
    goodbye,
    screenlock,
    validate,
    formatFileSize,
  };
})();
