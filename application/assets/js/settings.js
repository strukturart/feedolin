"use strict";
import { default_opml } from "../../app.js";
import { toaster, validate } from "./helper.js";

export let setting = {
  sleep_time:
    localStorage.getItem("sleep_time") != null
      ? localStorage.getItem("sleep_time")
      : 20,

  interval:
    localStorage.getItem("interval") != null
      ? localStorage.getItem("interval")
      : 0,
  source_local:
    localStorage.getItem("source_local") != null
      ? localStorage.getItem("source_local")
      : "",

  source:
    localStorage.getItem("source") != null
      ? localStorage.getItem("source")
      : "",

  local_file: false,
  wwww_file: false,
  ads: false,
};

export let load_settings = function () {
  document.getElementById("time").value = setting.interval;

  if (localStorage.getItem("source") != null) {
    document.getElementById("source").value = localStorage.getItem("source");
  } else {
    document.getElementById("source").value = "";
  }

  if (localStorage.getItem("source_local") != null) {
    document.getElementById("source-local").value =
      localStorage.getItem("source_local");
  }

  if (localStorage.getItem("sleep_time") !== null) {
    document.getElementById("sleep-mode").value =
      localStorage.getItem("sleep_time");
  }
};

export let save_settings = function () {
  if (
    document.getElementById("source-local").value == "" &&
    document.getElementById("source").value == default_opml
  ) {
    toaster("please fill in the location of the source file", 3000);
    return false;
  }

  if (document.getElementById("source").value != "") {
    if (!validate(document.getElementById("source").value)) {
      toaster("url not valid", 2000);
      return false;
    }
  }

  localStorage.setItem("interval", document.getElementById("time").value);
  localStorage.setItem("source", document.getElementById("source").value);
  localStorage.setItem(
    "source_local",
    document.getElementById("source-local").value
  );
  localStorage.setItem(
    "sleep_time",
    document.getElementById("sleep-mode").value
  );

  toaster(
    "saved, the settings will be active the next time the app is started.",
    5000
  );

  toaster("saved successfully", 2000);
  return true;
};

export let load_settings_from_file = function () {
  const sdcard = navigator.getDeviceStorage("sdcard");
  var file = sdcard.get("feedolin_settings.json");

  toaster("search setting file", 2000);

  file.onerror = function () {
    toaster("error", 2000);
  };

  file.onerror = function () {
    toaster("error", 2000);
  };

  file.onsuccess = function () {
    toaster(file.result, 2000);

    let reader = new FileReader();
    reader.readAsText(file.result);

    reader.onload = function () {
      let data = JSON.parse(reader.result);

      let settings = data[0];
      console.log(settings);
      document.getElementById("source-local").value = settings.source_local;
      document.getElementById("source").value = settings.source;
      document.getElementById("time").value = settings.interval;

      document.getElementById("sleep-mode").value = settings.sleep_time;

      toaster(
        "the settings were loaded from the file, if you want to use them permanently don't forget to save.",
        3000
      );

      reader.onerror = function () {
        toaster(reader.error);
      };
    };
  };
};

export let export_settings = function () {
  var sdcard = navigator.getDeviceStorage("sdcard");

  var request_del = sdcard.delete("feedolin_settings.json");
  request_del.onsuccess = function () {};
  request_del.onerror = function () {};
  setTimeout(function () {
    let data = JSON.stringify(setting);
    var file = new Blob(["[" + data + "]"], {
      type: "application/json",
    });

    var request = sdcard.addNamed(file, "feedolin_settings.json");

    request.onsuccess = function () {
      var name = this.result;
      toaster("settings exported, feedolin_settings.json", 5000);
    };

    request.onerror = function () {
      toaster("Unable to write the file", 2000);
    };
  }, 2000);
};
