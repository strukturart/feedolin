"use strict";
import Mustache from "mustache";
import DOMPurify from "dompurify";
import { sort_array } from "./assets/js/helper.js";
import { toaster } from "./assets/js/helper.js";
import {
  screenlock,
  hashCode,
  goodbye,
  formatFileSize,
} from "./assets/js/helper.js";
import { loadCache, saveCache, getTime } from "./assets/js/cache.js";

import { bottom_bar, top_bar, list_files } from "./assets/js/helper.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import { load_settings, save_settings } from "./assets/js/settings.js";
import { play_podcast, volume_control, seeking } from "./assets/js/audio.js";

let article_array;
var content_arr = [];
var source_array = [];
var k = 0;
var panels = ["channels"];
var current_panel = 0;
const parser = new DOMParser();

//store all used article ids
var all_cid = [];
//get read articles
var read_elem =
  localStorage.getItem("read_elem") != null
    ? JSON.parse(localStorage.getItem("read_elem"))
    : [];
//get recently played podcast
export let recently_played =
  localStorage.getItem("recently_played") != null
    ? JSON.parse(localStorage.getItem("recently_played"))
    : [];
//get listened podcasts
export let listened_elem =
  localStorage.getItem("listened_elem") != null
    ? JSON.parse(localStorage.getItem("listened_elem"))
    : [];
let tab_index = 0;
//xml items
var rss_title = "";
var item_title = "";
var item_summary = "";
var item_link = "";
var item_date_unix = "";
var item_duration = "";
var item_type = "";
var item_filesize = "";
var item_date_unix = "";
var item_category = "";
var item_cid = "";
var item_image = "";
var yt_thumbnail = "";

let select_box = [];

screenlock("lock");
setTimeout(function () {
  screenlock("unlock");
}, 3000);

let setting = {
  sleep_time:
    localStorage.getItem("sleep_time") != null
      ? localStorage.getItem("sleep_time")
      : 20,
  epsiodes_download:
    localStorage.getItem("episodes_download") != null
      ? localStorage.getItem("epsiodes_download")
      : 5,

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

let default_opml =
  "https://raw.githubusercontent.com/strukturart/feedolin/master/example.opml";

export let status = {
  active_element_id: "",
  window_status: "intro",
  active_audio_element_id: "",
  volume_status: false,
  panel: "",
  audio_duration: "",
  audio_status: "play",
  sleepmode: false,
};

let reload = function () {
  window.location.reload(true);
  localStorage.setItem("reload", "true");
};

let stream_id = "";
let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
  let d = JSON.parse(localStorage.getItem("audio_memory"));
  audio_memory = d;
} else {
  audio_memory = {};
}

//get version

if (navigator.mozApps) {
  //ads || ads free

  //KaioOs ads
  let getManifest = function (callback) {
    if (!navigator.mozApps) {
      return false;
    }
    let self = navigator.mozApps.getSelf();
    self.onsuccess = function () {
      callback(self.result);
    };
    self.onerror = function () {};
  };

  let self;
  //KaiOs store true||false
  function manifest(a) {
    self = a.origin;
    let t = document.getElementById("KaiOsAds-Wrapper");
    if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
      document.querySelector("#KaiOsAds-Wrapper iframe").src = "ads.html";
    } else {
      console.log("Ads free");
      t.style.display = "none";
    }
  }

  getManifest(manifest);
}

//let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
  let d = JSON.parse(localStorage.getItem("audio_memory"));
  audio_memory = d;
}

setTimeout(() => {
  if (navigator.minimizeMemoryUsage) navigator.minimizeMemoryUsage();

  if (localStorage["source_local"] == null && localStorage["source"] == null) {
    localStorage.setItem("source", default_opml);
    load_source_opml();
  }
  //get update time; cache || download
  let a = localStorage.getItem("interval");

  //reload content without caching
  if (localStorage.getItem("reload") == null)
    localStorage.setItem("reload", "false");

  if (localStorage.getItem("reload") == "true") {
    a = 0;
  }
  localStorage.setItem("reload", "false");
  document.getElementById("intro-message").innerText = "checking feed list";
  //download
  if (getTime(a) && navigator.onLine) {
    if (
      localStorage["source"] &&
      localStorage["source"] != "" &&
      localStorage["source"] != undefined
    ) {
      load_source_opml();
    } else {
      load_local_file_opml();
    }

    //load cache
  } else {
    document.getElementById("intro-message").innerText =
      "your device is offline, loading cached data";

    content_arr = loadCache();
    if (content_arr) {
      document.getElementById("intro-message").innerText = "load cached data";
      setTimeout(function () {
        build();
      }, 1000);
    } else {
      document.getElementById("intro-message").innerText =
        "no internet connection and no cached data available";
      setTimeout(function () {
        goodbye();
      }, 4000);
    }
  }
}, 1000);

//start loading feeds

let load_feeds = function (data) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(data, "text/xml");
  let content = xmlDoc.getElementsByTagName("body")[0];

  let m = content.querySelectorAll("outline");
  for (var i = 0; i < m.length; i++) {
    var nested = m[i].querySelectorAll("outline");

    if (nested.length > 0) {
      for (var z = 0; z < nested.length; z++) {
        source_array.push([
          nested[z].getAttribute("xmlUrl"),
          setting.epsiodes_download,
          m[i].getAttribute("text"),
          m[i].getAttribute("text"),
        ]);
      }
    }
  }

  rss_fetcher(
    source_array[0][0],
    source_array[0][1],
    source_array[0][2],
    source_array[0][3]
  );
};

/////////////////////////////
////////////////////////////
//GET URL LIST/////////////
//from local file or online source
//////////////////////////
//////////////////////////

let nocaching = Math.floor(Date.now() / 1000);

///////////
///load source opml file from local source
//////////

let load_local_file_opml = function () {
  let a = localStorage.getItem("source_local");

  if (
    localStorage.getItem("source_local") == "" ||
    localStorage.getItem("source_local") == null
  ) {
    return false;
  }

  var sdcard = navigator.getDeviceStorage("sdcard");

  var request = sdcard.get(a);
  request.onerror = function () {
    document.getElementById("intro-message").innerHTML =
      "😴<br>No source file founded,<br> please create a opml file or set a url in the settings.";
  };

  request.onsuccess = function () {
    var file = this.result;

    var reader = new FileReader();
    reader.onerror = function (event) {
      reader.abort();
    };

    reader.onloadend = function (event) {
      let data = event.target.result;
      document.getElementById("intro-message").innerText =
        "load local opml file";

      load_feeds(data);
      /*
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");
      let content = xmlDoc.getElementsByTagName("body")[0];

      let m = content.querySelectorAll("outline");
      for (var i = 0; i < m.length; i++) {
        var nested = m[i].querySelectorAll("outline");

        if (nested.length > 0) {
          for (var z = 0; z < nested.length; z++) {
            source_array.push([
              nested[z].getAttribute("xmlUrl"),
              setting.epsiodes_download,
              m[i].getAttribute("text"),
              m[i].getAttribute("text"),
            ]);
          }
        }
      }

      rss_fetcher(
        source_array[0][0],
        source_array[0][1],
        source_array[0][2],
        source_array[0][3]
      );
      */
    };
    reader.readAsText(file);
  };
};

///////////
///load source opml file from online source
//////////
let load_source_opml = function () {
  let source_url = localStorage.getItem("source");

  let xhttp = new XMLHttpRequest({
    mozSystem: true,
  });

  xhttp.open("GET", source_url + "?time=" + nocaching, true);
  xhttp.timeout = 25000;
  xhttp.onload = function () {
    if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
      document.getElementById("intro-message").innerText =
        "load online opml file";
      let data = xhttp.response;

      load_feeds(data);
    }
  };

  xhttp.onerror = function () {
    document.getElementById("intro-message").innerHTML =
      "😴<br>the source file cannot be loaded";
    document.getElementById("intro").style.display = "none";

    setTimeout(() => {
      content_arr = cache.loadCache();
      if (content_arr) {
        build();
        document.getElementById("intro-message").innerText =
          "cached data loaded";
      } else {
        setTimeout(() => {
          show_settings();
        }, 3000);
      }
    }, 4000);
  };

  xhttp.send(null);
};

//////////////////////////////
//download content////
//////////////////////////////

let rss_fetcher = function (
  param_url,
  param_limit,
  param_channel,
  param_category
) {
  var xhttp = new XMLHttpRequest({
    mozSystem: true,
  });

  xhttp.open("GET", param_url, true);
  xhttp.timeout = 2000;
  xhttp.responseType = "document";
  xhttp.overrideMimeType("text/xml");
  xhttp.send();

  xhttp.addEventListener("error", transferFailed);
  xhttp.addEventListener("loadend", loadEnd);

  function transferFailed() {
    //console.log("failed" + param_channel, 1000);
  }

  // Add a hook to convert all text to capitals
  DOMPurify.addHook("afterSanitizeElements", function (node) {});

  xhttp.onload = function () {
    document.getElementById("intro-message").innerText = "loading data";
    if (xhttp.readyState === xhttp.DONE && xhttp.status == 200) {
      let data = xhttp.response;

      item_image = "";
      item_summary = "";
      item_link = "";
      item_title = "";
      item_type = "";
      item_media = "rss";
      item_duration = "";
      item_filesize = "";
      listened = "false";
      play_track = "false";
      item_cid = "";
      item_read = "not-read";
      item_date = "";
      startlistened = "";
      youtube_id = "";
      yt_thumbnail = "";

      //Channel
      rss_title = data.querySelector("title").textContent || param_channel;

      param_channel = rss_title;

      let p = Number(source_array.length - 1);
      precent = (100 / p) * k;
      document.querySelector(
        "div#intro div#loading-progress div div"
      ).style.width = precent + "%";

      if (data.getElementsByTagName("url")[0]) {
        item_image = data.getElementsByTagName("url")[0].textContent;
      }

      //ATOM
      el = data.querySelectorAll("entry");

      if (el.length > 0) {
        for (let i = 0; i < param_limit; i++) {
          item_title = el[i].querySelector("title").innerHTML;
          item_cid = hashCode(item_title);

          var elem = el[i].querySelector("summary");
          if (elem) {
            item_summary = el[i].querySelector("summary").textContent;
            item_summary = item_summary.replace(/(<!\[CDATA\[)/g, "");
            item_summary = item_summary.replace(/(]]>)/g, "");
            item_summary = item_summary.replace(/(&lt;!\[CDATA\[)/g, "");
            item_summary = item_summary.replace(/(]]&gt;)/g, "");
          } else {
            var elem = el[i].querySelector("content");
            if (elem) {
              item_summary = el[i].querySelector("content").textContent;
              item_summary = item_summary.replace(/(<!\[CDATA\[)/g, "");
              item_summary = item_summary.replace(/(]]>)/g, "");
              item_summary = item_summary.replace(/(&lt;!\[CDATA\[)/g, "");
              item_summary = item_summary.replace(/(]]&gt;)/g, "");
            }
          }

          if (el[i].getElementsByTagNameNS("*", "thumbnail").length > 0) {
            item_image = el[i]
              .getElementsByTagNameNS("*", "thumbnail")
              .item(0)
              .getAttribute("url");
          }

          if (el[i].querySelector("link") !== null) {
            item_link = el[i].querySelector("link").getAttribute("href");
          }

          if (
            el[i].querySelector("enclosure") != null ||
            el[i].querySelector("enclosure") != undefined
          ) {
            if (el[i].querySelector("enclosure").getAttribute("url"))
              item_download = el[i]
                .querySelector("enclosure")
                .getAttribute("url");
            if (el[i].querySelector("enclosure").getAttribute("type"))
              item_type = el[i].querySelector("enclosure").getAttribute("type");

            if (
              item_type == "audio/mpeg" ||
              item_type == "audio/aac" ||
              item_type == "audio/x-mpeg" ||
              item_type == "audio/mp3" ||
              item_type == "audio/x-m4a"
            ) {
              item_media = "podcast";
            }

            if (el[i].querySelector("enclosure").getAttribute("length") > 0) {
              let en_length = el[i]
                .querySelector("enclosure")
                .getAttribute("length");
              item_filesize = formatFileSize(en_length, 2);
            }
          }
          if (item_media == "podcast") {
            if (el[i].getElementsByTagNameNS("*", "duration").length > 0) {
              var duration = el[i]
                .getElementsByTagNameNS("*", "duration")
                .item(0).textContent;
              item_duration = duration;
              if (item_duration == "Invalid date") item_duration = "";
            }
          }

          //check valid date
          if (
            el[i].querySelector("updated") != null ||
            el[i].querySelector("updated") != undefined
          ) {
            if (el[i].querySelector("updated").innerHTML == "") {
              item_date_unix = new Date().valueOf();
              item_date = "";
            } else {
              item_date = new Date(el[i].querySelector("updated").innerHTML);
              item_date_unix = item_date.valueOf();
              item_date = item_date.toDateString();
            }
          }

          if (
            item_link !== null &&
            item_link.includes("https://www.youtube.com") === true
          ) {
            item_media = "youtube";
            if (el[i].getElementsByTagNameNS("*", "videoId").length > 0) {
              youtube_id = el[i]
                .getElementsByTagNameNS("*", "videoId")
                .item(0).textContent;
            }
          } else {
            item_media = "rss";
          }

          if (item_media == "youtube") {
            if (el[i].getElementsByTagNameNS("*", "group").length > 0) {
              yt_thumbnail = el[i].getElementsByTagNameNS("*", "group")[0];

              let n = yt_thumbnail.getElementsByTagNameNS("*", "thumbnail")[0];
              yt_thumbnail = n.getAttribute("url");
            }
          }

          startlistened = "";
          if (audio_memory.hasOwnProperty(item_cid)) {
            start_listened = "start_listened";
          }

          content_arr.push({
            title: DOMPurify.sanitize(item_title),
            summary: DOMPurify.sanitize(item_summary),
            link: item_link,
            date: item_date,
            dateunix: item_date_unix,
            channel: param_channel,
            category: param_category,
            type: item_type,
            image: item_image,
            duration: item_duration,
            media: item_media,
            filesize: item_filesize,
            cid: item_cid,
            listened: "not-listened",
            recently_played: null,
            recently_order: null,
            read: "not-read",
            start_listened: startlistened,
            youtube_id: youtube_id,
            youtube_thumbnail: yt_thumbnail,
          });
        }
      }

      ////////////
      //RSS
      ///////////

      el = data.querySelectorAll("item");

      if (el.length > 0) {
        for (let i = 0; i < param_limit; i++) {
          if (
            el[i].querySelector("title") &&
            el[i].querySelector("title") != undefined
          ) {
            item_title = el[i].querySelector("title").innerHTML;

            item_title = item_title.replace("<![CDATA[", "");
            item_title = item_title.replace("]]>", "");
          }
          item_cid = hashCode(item_title);
          if (el[i].querySelector("description")) {
            item_summary = el[i].querySelector("description").textContent;
            item_summary = item_summary.replace(/(<!\[CDATA\[)/g, "");
            item_summary = item_summary.replace(/(]]>)/g, "");
            item_summary = item_summary.replace(/(&lt;!\[CDATA\[)/g, "");
            item_summary = item_summary.replace(/(]]&gt;)/g, "");
          }

          if (el[i].querySelector("link")) {
            item_link = el[i].querySelector("link").textContent;
            item_download = el[i].querySelector("link");
          }

          //check valid date
          if (
            el[i].querySelector("pubDate") != null ||
            el[i].querySelector("pubDate") != undefined
          ) {
            if (el[i].querySelector("pubDate").innerHTML == "") {
              item_date_unix = new Date().valueOf();
              item_date = "";
            } else {
              item_date = new Date(el[i].querySelector("pubDate").innerHTML);
              item_date_unix = item_date.valueOf();
              item_date = item_date.toDateString();
            }
          }

          if (
            el[i].querySelector("enclosure") != null ||
            el[i].querySelector("enclosure") != undefined
          ) {
            if (el[i].querySelector("enclosure").getAttribute("url"))
              item_download = el[i]
                .querySelector("enclosure")
                .getAttribute("url");

            item_link = el[i].querySelector("enclosure").getAttribute("url");
            if (el[i].querySelector("enclosure").getAttribute("type"))
              item_type = el[i].querySelector("enclosure").getAttribute("type");

            if (
              item_type == "audio/mpeg" ||
              item_type == "audio/aac" ||
              item_type == "audio/x-mpeg" ||
              item_type == "audio/mp3" ||
              item_type == "audio/x-m4a"
            ) {
              item_media = "podcast";
            }

            if (el[i].querySelector("enclosure").getAttribute("length") > 0) {
              let en_length = el[i]
                .querySelector("enclosure")
                .getAttribute("length");
              item_filesize = formatFileSize(en_length, 2);
            }
          }
          if (item_media == "podcast") {
            if (el[i].getElementsByTagNameNS("*", "duration").length > 0) {
              var duration = el[i]
                .getElementsByTagNameNS("*", "duration")
                .item(0).textContent;
              item_duration = duration;
              if (item_duration == "Invalid date") item_duration = "";
            }
          }

          startlistened = "";
          if (audio_memory.hasOwnProperty(item_cid)) {
            startlistened = "start_listened";
          }

          content_arr.push({
            title: DOMPurify.sanitize(item_title),
            summary: DOMPurify.sanitize(item_summary),
            link: item_link,
            date: item_date,
            dateunix: item_date_unix,
            channel: param_channel,
            category: param_category,
            type: item_type,
            image: item_image,
            duration: item_duration,
            media: item_media,
            filesize: item_filesize,
            cid: item_cid,
            listened: "not-listened",
            recently_played: null,
            recently_order: null,
            read: "not-read",
            start_listened: startlistened,
            youtube_thumbnail: yt_thumbnail,
          });
        }
      }
    }

    if (xhttp.status === 404) {
      console.log(param_channel + " url not found", 3000);
    }

    if (xhttp.status === 408) {
      console.log(param_channel + "Time out", 3000);
    }

    if (xhttp.status === 409) {
      console.log(param_channel + "Conflict", 3000);
    }

    ////Redirection
    if (xhttp.status === 301) {
      //console.log(param_channel + " redirection", 3000);
      rss_fetcher(
        xhttp.getResponseHeader("Location"),
        param_limit,
        param_channel
      );
    }

    xhttp.ontimeout = function (e) {
      //console.log(param_channel + "Time out", 3000);
    };

    if (xhttp.status === 0) {
    }
  };

  function loadEnd(e) {
    //after download build html objects
    if (k == source_array.length - 1) {
      build();
      saveCache(content_arr);
    }
    if (k < source_array.length - 1) {
      document.getElementById("intro-message").innerText = "loading data";
      k++;
      rss_fetcher(
        source_array[k][0],
        source_array[k][1],
        source_array[k][2],
        source_array[k][3]
      );
    }
  }
};

//sort content by date
//build
//write html

let read_articles = function () {
  //if element in read list
  //mark article as read
  content_arr.forEach(function (index) {
    all_cid.push(index.cid);
    index.read = "not-read";
    if (read_elem.length > 0) {
      read_elem.forEach(function (p) {
        if (p == index.cid) {
          index.read = "read";
        }
      });
    }
  });
};

//end to listen
//to show icon
let listened_articles = function () {
  content_arr.forEach(function (index) {
    index.listened = "not-listened";

    if (listened_elem.length > 0) {
      for (t = 0; t < listened_elem.length; t++) {
        if (listened_elem[t] == index.cid) {
          index.listened = "listened";
        }
      }
    }
  });
};

//started to listen
//add to list recently played
let listened_podcast_articles = function () {
  content_arr.forEach(function (index) {
    index.recently_played = "";
    index.recently_order = "";
    if (recently_played.length > 0) {
      for (let t = 0; t < recently_played.length; t++) {
        if (recently_played[t] == index.cid) {
          index.recently_played = "recently-played";
          index.recently_order = t;
        }
      }
    }
  });
};

//clear local storage

let clean_localstorage = function () {
  for (let i = 0; i < read_elem.length; i++) {
    if (all_cid.indexOf(read_elem[i]) == -1) {
      read_elem.slice(i, 1);
    }
  }
  localStorage.setItem("read_elem", JSON.stringify(read_elem));

  //recently played
  for (let i = 0; i < recently_played.length; i++) {
    if (all_cid.indexOf(recently_played[i]) == -1) {
      recently_played.slice(i, 1);
    }
  }
  localStorage.setItem("recently_played", JSON.stringify(recently_played));
};

//render html
function renderHello(arr) {
  var template = document.getElementById("template").innerHTML;
  var rendered = Mustache.render(template, {
    data: arr,
  });
  document.getElementById("news-feed-list").innerHTML = rendered;
}

//render selectbox
function renderSB(arr) {
  var template = document.getElementById("sb").innerHTML;
  var rendered = Mustache.render(template, {
    data: arr,
  });
  document.getElementById("select-box").innerHTML = rendered;
}

//filter view
let heroArray = [];
let filter_data = function (cat) {
  heroArray.length = 0;
  for (let i = 0; i < content_arr.length; i++) {
    if (content_arr[i].category == cat) {
      heroArray.push(content_arr[i]);
    }
  }
};

let tabs = function () {
  for (let i = 0; i < content_arr.length; i++) {
    //set panel category
    if (
      panels.includes(content_arr[i].category) === false &&
      content_arr[i].category != 0
    ) {
      panels.push(content_arr[i].category);
    }
  }
};

let division_remove = function () {
  //remove division element
  if (document.querySelectorAll("div.division").length > 0) {
    let pp = [];
    document
      .querySelectorAll("div.division")
      .forEach(function (item, index, object) {
        if (document.querySelectorAll("div.division")[index].classList) {
          let k = document.querySelectorAll("div.division")[index].className;
          if (pp.indexOf(k) > -1) {
            item.classList.add("remove");
          }
          pp.push(k);
        }
      });

    document
      .querySelectorAll("div.remove")
      .forEach(function (item, index, object) {
        item.remove();
      });
  }
};
//build html
function build() {
  sort_array(content_arr, "channel", "string");
  read_articles();
  listened_articles();
  tabs();
  clean_localstorage();
  bottom_bar("settings", "select", "options");
  top_bar("", panels[0], "");

  panels.push("recently-played");

  renderHello(content_arr);

  division_remove();

  status.window_status = "article-list";

  document.getElementById("intro").style.display = "none";

  set_tabindex();

  article_array = document.querySelectorAll("article");
  article_array[0].focus();
}

//set tabindex

let set_tabindex = function () {
  let divs = document.querySelectorAll("article");

  let t = -1;
  for (let i = 0; i < divs.length; i++) {
    divs[i].removeAttribute("tabindex");

    t++;
    divs[i].tabIndex = t;
  }

  tab_index = 0;
  setTimeout(function () {
    article_array = document.querySelectorAll("article");
    if (article_array > 0) article_array[0].focus();
  }, 1500);
};

//mark as read

let mark_as_read = function (un_read) {
  if (un_read == true) {
    document.activeElement.setAttribute("data-read", "read");
    status.active_element_id = document.activeElement.getAttribute("data-id");
    read_elem.push(status.active_element_id);
    localStorage.setItem("read_elem", JSON.stringify(read_elem));
  }

  if (un_read == false) {
    let kk = document
      .querySelector("[data-id ='" + status.active_element_id + "']")
      .getAttribute("data-id");

    let test = [];
    for (var i = 0; i < read_elem.length; i++) {
      if (read_elem[i] != kk) test.push(read_elem[i]);
    }
    localStorage.setItem("read", JSON.stringify(test));
    document.activeElement.setAttribute("data-read", "not-read");

    toaster("article marked as not read", 2000);
  }
};

////////////////////////
//NAVIGATION
/////////////////////////

function nav_panels(left_right) {
  if (left_right == "left") {
    current_panel--;
  }

  if (left_right == "right") {
    current_panel++;
  }

  current_panel = current_panel % panels.length;
  if (current_panel < 0) {
    current_panel += panels.length;
  }

  top_bar("", panels[current_panel], "");
  if (status.sleepmode) top_bar("sleep", panels[current_panel], "");

  //filter data
  //default
  //view
  filter_data(panels[current_panel]);
  //sort
  sort_array(heroArray, "dateunix", "number");
  //build html
  renderHello(heroArray);

  setTimeout(() => {
    if (document.querySelectorAll("article").length < 1) return false;
    article_array = document.querySelectorAll("article")[0].focus();
    //smooth scrolling
    const rect = document.activeElement.getBoundingClientRect();
    const elY =
      rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

    document.activeElement.parentNode.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
  }, 1000);

  document.querySelectorAll("div.division").forEach(function (index, key) {
    document.querySelectorAll("div.division")[key].style.display = "none";
  });
  //recently played
  if (panels[current_panel] == "recently-played") {
    //to do
    heroArray.length = 0;
    listened_podcast_articles();

    for (let i = 0; i < content_arr.length; i++) {
      if (content_arr[i].recently_played == "recently-played") {
        heroArray.push(content_arr[i]);
      }
    }

    sort_array(heroArray, "recently_order", "number");
    renderHello(heroArray);

    document.querySelectorAll("div.division").forEach(function (index, key) {
      document.querySelectorAll("div.division")[key].style.display = "none";
    });
  }
  //channels
  if (panels[current_panel] == "channels") {
    document.querySelectorAll("div.division").forEach(function (index, key) {
      document.querySelectorAll("div.division")[key].style.display = "block";
    });
    sort_array(content_arr, "channel", "string");
    renderHello(content_arr);
    division_remove();
  }

  set_tabindex();

  document.activeElement.classList.remove("overscrolling");
  status.panel = panels[current_panel];
}
////////////
//TABINDEX NAVIGATION
///////////
let tabIndex = 0;

function nav(move) {
  //let elem = document.activeElement;
  // Setup siblings array and get the first sibling
  //document.activeElement.classList.remove("overscrolling");
  let siblings = [];
  //let sibling = elem.parentNode.firstChild;

  //nested input field
  if (document.activeElement.parentNode.classList.contains("input-parent")) {
    document.activeElement.parentNode.focus();
  }

  if (document.activeElement.classList.contains("input-parent")) {
    bottom_bar("", "edit", "back");
  }

  let b = document.activeElement.parentNode;
  let items = b.querySelectorAll(".item");

  for (let i = 0; i < items.length; i++) {
    siblings.push(items[i]);
  }

  if (move == "+1") {
    tab_index++;

    if (tab_index >= siblings.length) {
      // document.activeElement.classList.add("overscrolling");
      tab_index = siblings.length - 1;
      return true;
    }

    siblings[tab_index].focus();
  }

  if (move == "-1" && tab_index > 0) {
    //document.activeElement.classList.remove("overscrolling");
    tab_index--;
    siblings[tab_index].focus();
  }

  //smooth scrolling
  const rect = document.activeElement.getBoundingClientRect();
  const elY =
    rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

  document.activeElement.parentNode.scrollBy({
    left: 0,
    top: elY - window.innerHeight / 2,
    behavior: "smooth",
  });

  //overscrolling
  if (move == "-1" && tab_index == 0) {
    //document.activeElement.classList.add("overscrolling");
  }
}

//navigation between channels into channels view
division_count = 0;
let channel_navigation = function (direction) {
  let elements = document.getElementsByClassName("division");

  if (direction == "down" && division_count < elements.length) {
    let current = document.activeElement;
    let nextSibling = current.nextElementSibling;

    while (nextSibling) {
      nextSibling = nextSibling.nextElementSibling;
      if (nextSibling.classList.contains("division")) {
        nextSibling.nextElementSibling.focus();
        tab_index = document.activeElement.getAttribute("tabindex");
        const rect = document.activeElement.getBoundingClientRect();
        const elY =
          rect.top -
          document.body.getBoundingClientRect().top +
          rect.height / 2;

        document.activeElement.parentNode.scrollBy({
          left: 0,
          top: elY - window.innerHeight / 2,
          behavior: "smooth",
        });
        return true;
      }
    }
  }
  if (direction == "up") {
    let current = document.activeElement;
    let previousSibling = current.previousElementSibling;

    while (previousSibling) {
      previousSibling = previousSibling.previousElementSibling;
      if (previousSibling.classList.contains("division")) {
        previousSibling.nextElementSibling.focus();
        tab_index = document.activeElement.getAttribute("tabindex");
        const rect = document.activeElement.getBoundingClientRect();
        const elY =
          rect.top -
          document.body.getBoundingClientRect().top +
          rect.height / 2;

        document.activeElement.parentNode.scrollBy({
          left: 0,
          top: elY - window.innerHeight / 2,
          behavior: "smooth",
        });
        return true;
      }
    }
  }
};

let show_article = function () {
  document.querySelector("div#source-page").style.display = "none";

  document.querySelectorAll("div.division").forEach(function (index, key) {
    document.querySelectorAll("div.division")[key].style.display = "none";
  });

  status.window_status = "single-article";
  navigator.spatialNavigationEnabled = false;

  document.querySelector("div#news-feed").style.background = "silver";
  link_type = document.activeElement.getAttribute("data-audio-type");

  let elem = document.querySelectorAll("article");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "none";
  }

  elem = document.querySelectorAll("div.summary");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "block";
  }

  document.activeElement.style.fontStyle = "normal";
  document.activeElement.style.color = "black";

  document.activeElement.style.display = "block";
  document.activeElement.classList.add("view");

  document.getElementById("top-bar").style.display = "none";
  document.getElementById("settings").style.display = "none";

  if (document.activeElement.getAttribute("data-media") == "podcast") {
    if (document.activeElement.classList.contains("audio-playing")) {
      bottom_bar("pause", "", "options");
    } else {
      bottom_bar("play", "", "options");
    }
  }

  if (document.activeElement.getAttribute("data-media") == "rss") {
    bottom_bar("visit", "", "options");
  }

  if (document.activeElement.getAttribute("data-media") == "youtube") {
    bottom_bar("open", "", "options");
  }

  document.activeElement.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (status.panel == "channel") {
    document.querySelectorAll("div.division").forEach(function (index, key) {
      document.querySelectorAll("div.division")[key].style.display = "none";
    });
  }

  mark_as_read(true);

  document.querySelector("div#news-feed div#news-feed-list").style.top = "0px";
};

let youtube_player;
let video_time;
let video_status = "";

let toTime = function (seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};

let youtube_seeking = function (param) {
  var step = 10;
  let new_time;
  if (param == "backward") {
    new_time = youtube_player.getCurrentTime() - step++;

    youtube_player.seekTo(new_time, true);
  }

  if (param == "forward") {
    new_time = youtube_player.getCurrentTime() + step++;
    youtube_player.seekTo(new_time, true);
  }
};

//open source or youtube
function open_url() {
  let link_target = document.activeElement.getAttribute("data-link");
  let title = document.activeElement.querySelector("h1.title").textContent;
  title = title.replace(/\s/g, "-");
  bottom_bar("", "", "");

  document.querySelector("div#source-page").style.display = "block";
  document.querySelector("iframe").style.display = "block";

  if (document.activeElement.getAttribute("data-media") == "rss") {
    show_article_list();
    window.open(link_target);
    return;
  }

  if (document.activeElement.getAttribute("data-media") == "youtube") {
    document.querySelector("div#source-page").style.display = "block";
    status.window_status = "source-page";
    bottom_bar("play", "", "");

    document.getElementById("message").style.top = "0px";
    document.getElementById("message-inner").innerText = "please wait ";

    youtube_player = new YT.Player("iframe-wrapper", {
      videoId: document.activeElement.getAttribute("data-youtube-id"),
      events: {
        "onReady": onPlayerReady,
        "onStateChange": onPlayerStateChange,
      },
    });
    let t;

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        video_status = "playing";
        bottom_bar("pause", toTime(t), "");
      }

      if (event.data == YT.PlayerState.PAUSED) {
        video_status = "paused";
      }

      video_time = setInterval(function () {
        t = youtube_player.getDuration() - youtube_player.getCurrentTime();

        let percent =
          (youtube_player.getCurrentTime() / youtube_player.getDuration()) *
          100;

        document.querySelector("div#youtube-progress-bar div.bar").style.width =
          percent + "%";

        if (video_status == "playing") {
          bottom_bar("pause", toTime(t), "");
        }
        if (video_status == "paused") {
          bottom_bar("play", toTime(t), "");
        }
      }, 1000);
    }

    function onPlayerReady(event) {
      event.target.playVideo();
      document.getElementById("message").style.top = "-1000px";
    }

    return;
  }
}

/////////////////
//show article list
//////////////////
let show_article_list = function () {
  document.querySelector("div#news-feed div#news-feed-list").style.top = "27px";
  bottom_bar("settings", "select", "options");
  top_bar("", panels[current_panel], "");

  if (youtube_player) {
    youtube_player.stopVideo();
    youtube_player.destroy();
    youtube_player = "";
  }

  document.querySelector("div#source-page").style.display = "none";

  if (status.sleepmode) {
    top_bar("sleep", panels[current_panel], "");
  }

  //show hide channels division
  if (status.panel == "channels") {
    document.querySelectorAll("div.division").forEach(function (index, key) {
      document.querySelectorAll("div.division")[key].style.display = "block";
      document.querySelectorAll("div.division")[key].style.background = "black";
    });
  }

  document.getElementById("audio-player").style.display = "none";
  document.querySelector("div#news-feed").style.background = "white";

  document.getElementById("top-bar").style.display = "block";

  let elem = document.querySelectorAll("article");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "block";

    let rd = elem[i].getAttribute("data-read");

    if (rd == "read") {
      document.activeElement.style.fontStyle = "italic";
      document.activeElement.style.color = "gray";
    }
  }

  elem = document.querySelectorAll("div.summary");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "none";
  }

  document.querySelector("div#settings").style.display = "none";
  article_array[tab_index];
  document.querySelector("div#source-page").style.display = "none";
  document.querySelector("div#source-page iframe").setAttribute("src", "");

  status.window_status = "article-list";
  document.activeElement.focus();
  document.activeElement.classList.remove("view");

  const rect = document.activeElement.getBoundingClientRect();
  const elY =
    rect.top - document.body.getBoundingClientRect().top + rect.height / 2;

  document.activeElement.parentNode.scrollBy({
    left: 0,
    top: elY - window.innerHeight / 2,
    behavior: "smooth",
  });

  tab_index = document.activeElement.getAttribute("tabIndex");
};

//settings view

let show_settings = function () {
  bottom_bar("", "", "back");

  document.querySelectorAll("div#settings .item").forEach(function (e, index) {
    e.setAttribute("tabindex", index);
  });

  status.active_element_id = document.activeElement.getAttribute("data-id");
  status.window_status = "settings";
  tab_index = 0;
  document.getElementById("top-bar").style.display = "none";

  document.getElementById("settings").style.display = "block";
  document.getElementById("settings").children[0].focus();
  load_settings();
};

let open_options = function () {
  tab_index = 0;
  status.active_element_id = document.activeElement.getAttribute("data-id");
  status.window_status = "options";
  document.getElementById("options").style.display = "block";
  document.querySelectorAll("div#options button")[0].focus();
};

let start_options = function () {
  if (document.activeElement.getAttribute("data-function") == "unread") {
    mark_as_read(false);
  }
  if (document.activeElement.getAttribute("data-function") == "sleepmode") {
    sleep_mode();
  }

  if (document.activeElement.getAttribute("data-function") == "share") {
    var k = document
      .querySelector("[data-id='" + status.active_element_id + "']")
      .getAttribute("data-link");
    share(k);
  }

  if (document.activeElement.getAttribute("data-function") == "audio-player") {
    open_player(true);
  }

  if (document.activeElement.getAttribute("data-function") == "volume") {
    navigator.volumeManager.requestShow();
    status.volume_status = true;
    navigator.spatialNavigationEnabled = false;
  }
};

let sleep_mode = function () {
  let st = setting.sleep_time;
  st = st * 60 * 1000;

  status.sleepmode = true;

  toaster("sleepmode activ", 3000);
  setTimeout(() => {
    play_podcast();
    status.sleepmode = false;
  }, st);
};

let open_player = function (reopen) {
  document.getElementById("audio-player").style.display = "block";
  status.window_status = "audio-player";
  document.getElementById("options").style.display = "none";
  if (status.active_audio_element_id != "") {
    document
      .querySelector('[data-id="' + status.active_audio_element_id + '"]')
      .focus();
  } else {
    document
      .querySelector(
        '[data-id="' + document.activeElement.getAttribute("data-id") + '"]'
      )
      .focus();
  }

  status.active_element_id = document.activeElement.getAttribute("data-id");

  if (!reopen) {
    if (document.activeElement.getAttribute("data-image") != "") {
      audio_cover = document.activeElement.getAttribute("data-image");
      document.getElementById("image").style.backgroundImage =
        "url(" + document.activeElement.getAttribute("data-image") + ")";
    } else {
      document.getElementById("image").style.backgroundImage = "url(null)";
    }
  }

  if (reopen) {
    document.getElementById("image").style.backgroundImage =
      "url(" + audio_cover + ")";
  }
  top_bar("", "", "");
};

//qr scan listener
const qr_listener = document.querySelector("input#source");
let qrscan = false;
qr_listener.addEventListener("focus", (event) => {
  bottom_bar("", "qr", "back");
  qrscan = true;
});

qr_listener.addEventListener("blur", (event) => {
  bottom_bar("", "", "back");
  qrscan = false;
});

//button actions
let button_action = function () {
  bottom_bar("", "select", "");

  let p = document.activeElement.getAttribute("data-action");

  if (p == "list-opml-files") {
    document.getElementById("select-box").style.display = "block";
    status.window_status = "select-box";

    document
      .querySelectorAll("div#select-box .item")
      .forEach(function (e, index) {
        e.setAttribute("tabIndex", index);
        document.querySelectorAll("div#select-box div.item")[0].focus();
        tab_index = 0;
      });
  }

  if (p == "set-filename") {
    select_box_selected();
  }
};

let list_files_callback = function (filename) {
  select_box.push({ filename: filename });
  renderSB(select_box);
};

list_files("opml", list_files_callback);

//custom select box
let select_box_selected = function () {
  localStorage.setItem("source_local", document.activeElement.innerText);
  close_select_box();
};

let close_select_box = function () {
  document.getElementById("select-box").style.display = "none";
  show_settings();
};

//////////////////////////////
////KEYPAD HANDLER////////////
//////////////////////////////

let longpress = false;
const longpress_timespan = 1000;
let timeout;

function repeat_action(param) {
  switch (param.key) {
    case "0":
      break;
    case "ArrowLeft":
      if (status.window_status == "audio-player") {
        seeking("backward");
        break;
      }
      break;

    case "ArrowRight":
      if (status.window_status == "audio-player") {
        seeking("forward");
        break;
      }
      break;
  }
}

//////////////
////LONGPRESS
/////////////

function longpress_action(param) {
  switch (param.key) {
    case "Backspace":
      window.close();
      break;

    case "0":
      reload();
      break;
  }
}

///////////////
////SHORTPRESS
//////////////

function shortpress_action(param) {
  switch (param.key) {
    case "2":
      channel_navigation("up");
      break;
    case "5":
      channel_navigation("down");
      break;
    case "Enter":
      if (document.activeElement.hasAttributes("data-action")) {
        button_action();
      }
      if (document.activeElement.classList.contains("input-parent")) {
        document.activeElement.children[0].focus();
        return true;
      }
      if (status.window_status == "article-list") {
        show_article();
        break;
      }

      if (status.window_status == "options") {
        start_options();
        break;
      }

      if (
        status.window_status == "settings" &&
        document.activeElement.classList.contains("reload")
      ) {
        reload();
      }

      if (
        status.window_status == "settings" &&
        document.activeElement.classList.contains("loadsettings")
      ) {
        load_settings_from_file();
      }

      if (
        status.window_status == "settings" &&
        document.activeElement.classList.contains("export")
      ) {
        export_settings();
      }

      if (
        status.window_status == "settings" &&
        document.activeElement.classList.contains("save")
      ) {
        save_settings();
      }

      if (status.window_status == "settings" && qrscan == true) {
        status.window_status = "scan";

        start_scan(function (callback) {
          status.window_status = "settings";

          let slug = callback;
          document.getElementById("source").value = slug;
        });

        break;
      }

      break;

    case "ArrowLeft":
      if (status.window_status == "article-list") {
        nav_panels("left");
        break;
      }

      if (status.window_status == "audio-player") {
        seeking("backward");
        break;
      }

      if (status.window_status == "source-page") {
        youtube_seeking("backward");
        break;
      }
      break;

    case "ArrowRight":
      if (status.window_status == "article-list") {
        nav_panels("right");
        break;
      }

      if (status.window_status == "audio-player") {
        seeking("forward");
        break;
      }
      if (status.window_status == "source-page") {
        youtube_seeking("forward");
        break;
      }

      break;

    case "ArrowDown":
      if (status.window_status == "settings") {
        nav("+1");
        break;
      }

      if (status.window_status == "article-list") {
        nav("+1");
        break;
      }

      if (status.window_status == "options") {
        nav("+1");
        break;
      }

      if (status.window_status == "select-box") {
        nav("+1");
        break;
      }

      if (status.volume_status === true) {
        volume_control("down");
        break;
      }

      break;

    case "ArrowUp":
      if (status.window_status == "select-box") {
        nav("-1");
        break;
      }

      if (status.window_status == "settings") {
        nav("-1");
        break;
      }

      if (status.window_status == "options") {
        nav("-1");

        break;
      }

      if (status.window_status == "article-list") {
        nav("-1");
        break;
      }

      if (status.volume_status === true) {
        volume_control("up");
        break;
      }
      break;

    case "*":
      open_player(true);
      break;

    case "#":
      navigator.volumeManager.requestShow();
      status.volume_status = true;
      navigator.spatialNavigationEnabled = false;
      break;

    case "SoftLeft":
    case "Control":
      if (status.window_status == "article-list") {
        show_settings();
        break;
      }

      if (
        status.window_status == "single-article" &&
        document.activeElement.getAttribute("data-media") == "podcast"
      ) {
        open_player(false);
        play_podcast(document.activeElement.getAttribute("data-link"));
        break;
      }

      if (status.window_status == "single-article") {
        open_url();
        break;
      }

      if (status.window_status == "settings") {
        save_settings();
        break;
      }

      if (status.window_status == "audio-player") {
        play_podcast(document.activeElement.getAttribute("data-link"));
        break;
      }

      if (status.window_status == "source-page") {
        if (video_status == "paused" || video_status == "") {
          youtube_player.playVideo();
          return false;
        }

        if (video_status == "playing") {
          youtube_player.pauseVideo();
          return false;
        }
        break;
      }

      break;

    case "SoftRight":
    case "Alt":
      if (status.window_status == "single-article") {
        open_options();
        break;
      }
      if (status.window_status == "settings") {
        show_article_list();

        setTimeout(() => {
          article_array = document.querySelectorAll("article");
          article_array[0].focus();
        }, 1000);
        break;
      }

      if (status.window_status == "article-list") {
        open_options();
        break;
      }
      break;

    case "EndCall":
      goodbye();
      break;

    case "Backspace":
      if (status.window_status == "intro") {
        bottom_bar("", "", "");
        break;
      }

      if (status.window_status == "select-box") {
        bottom_bar("", "", "back");
        close_select_box();
        status.window_status = "settings";
        show_settings();
        break;
      }

      if (status.window_status == "article-list") {
        bottom_bar("", "", "");
        break;
      }

      if (status.window_status == "settings") {
        //show_article_list();
        break;
      }

      if (status.window_status == "single-article") {
        show_article_list();
        break;
      }

      if (status.window_status == "audio-player") {
        show_article_list();
        break;
      }

      if (status.window_status == "source-page") {
        show_article_list();
        break;
      }

      if (status.window_status == "options") {
        document.getElementById("options").style.display = "none";
        show_article_list();
        document
          .querySelector("[data-id ='" + status.active_element_id + "']")
          .focus();
        break;
      }

      if (status.window_status == "scan") {
        stop_scan();
        status.window_status == "settings";
        break;
      }

      break;
  }
}

/////////////////////////////////
////shortpress / longpress logic
////////////////////////////////

function handleKeyDown(evt) {
  if (evt.key === "Backspace" && status.window_status != "article-list") {
    evt.preventDefault();
  }

  if (evt.key === "EndCall") {
    evt.preventDefault();
    goodbye();
  }
  if (!evt.repeat) {
    longpress = false;
    timeout = setTimeout(() => {
      longpress = true;
      longpress_action(evt);
    }, longpress_timespan);
  }

  if (evt.repeat) {
    if (evt.key == "Backspace") evt.preventDefault(); // Disable close app by holding backspace

    if (evt.key == "ArrowLeft") {
      if (status.window_status == "source-page") {
        youtube_seeking("backward");
      }
    }

    if (evt.key == "ArrowRight") {
      if (status.window_status == "source-page") {
        youtube_seeking("forward");
      }
    }

    longpress = false;
    repeat_action(evt);
  }
}

function handleKeyUp(evt) {
  evt.preventDefault();

  if (evt.key == "Backspace") evt.preventDefault(); // Disable close app by holding backspace

  if (
    evt.key == "Backspace" &&
    status.window_status != "article-list" &&
    document.activeElement.tagName == "INPUT"
  ) {
    evt.preventDefault();
  }

  clearTimeout(timeout);
  if (!longpress) {
    shortpress_action(evt);
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
