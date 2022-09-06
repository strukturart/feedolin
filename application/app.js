"use strict";
import { translations } from "./assets/js/translations.js";

import Mustache from "mustache";
import DOMPurify from "dompurify";
import { side_toaster, sort_array } from "./assets/js/helper.js";
import { toaster } from "./assets/js/helper.js";
import { share } from "./assets/js/helper.js";

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
import {
  setting,
  load_settings,
  save_settings,
  export_settings,
  load_settings_from_file,
} from "./assets/js/settings.js";
import {
  play_podcast,
  volume_control,
  seeking,
  stop_player,
} from "./assets/js/audio.js";

let article_array;
var content_arr = [];
var k = 0;
var panels = ["channels"];
var current_panel = 0;
const parser = new DOMParser();

let video_player = "";
let youtube_player;
let video_time;
let youtube_time;
let video_status = "";
let youtube_status = "";
let video = document.getElementById("videoplayer");
let source_url_cleaner = ["$$", "mm"];

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
let rss_title = "";
let item_title = "";
let item_summary = "";
let item_link = "";
let item_date_unix = "";
let item_duration = "";
let item_type = "";
let item_filesize = "";
let item_category = "";
let item_cid = "";
let item_image = "";
let yt_thumbnail = "";

screenlock("lock");
setTimeout(function () {
  screenlock("unlock");
}, 3000);

//translation
export let userLang = navigator.language || navigator.userLanguage;
if (!translations[userLang]) {
  userLang = "en-EN";
}

export let default_opml =
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
  sort: "number",
  current_panel: "channels",
};

let reload = function () {
  window.location.reload(true);
  localStorage.setItem("reload", "true");
};

let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
  let d = JSON.parse(localStorage.getItem("audio_memory"));
  audio_memory = d;
} else {
  audio_memory = {};
}

if (navigator.mozApps) {
  //ads || ads free

  let load_ads = function () {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "assets/js/kaiads.v5.min.js";

    js.onload = function () {
      getKaiAd({
        publisher: "4408b6fa-4e1d-438f-af4d-f3be2fa97208",
        app: "feedolin",
        slot: "feedolin",
        test: 0,
        timeout: 10000,
        h: 100,
        w: 240,
        container: document.getElementById("KaiOsAds-Wrapper"),
        onerror: (err) => console.error("Error:", err),
        onready: (ad) => {
          // user clicked the ad
          ad.on("click", function () {
            open_options();
          });

          // user closed the ad (currently only with fullscreen)
          ad.on("close", () => console.log("close event"));

          // the ad succesfully displayed
          ad.on("display", () => console.log("display event"));

          // Ad is ready to be displayed
          // calling 'display' will display the ad
          ad.call("display", {
            navClass: "item",
            tabindex: 9,
            display: "block",
          });
        },
      });
    };
    document.head.appendChild(js);
  };

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
    document.getElementById("version").innerText =
      "Version: " + a.manifest.version;
    console.log(a.manifest.version);
    if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
      load_ads();
    } else {
      load_ads();
    }
  }

  getManifest(manifest);
}

//let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
  let d = JSON.parse(localStorage.getItem("audio_memory"));
  audio_memory = d;
}

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
      translations[userLang].app_error_0;
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
        translations[userLang].app_load_file;

      load_feeds(data);
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
        translations[userLang].app_load_file;

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

setTimeout(() => {
  if (navigator.minimizeMemoryUsage) navigator.minimizeMemoryUsage();

  if (localStorage["source_local"] == null && localStorage["source"] == null) {
    localStorage.setItem("source", default_opml);
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
    let check = false;
    if (
      localStorage["source"] &&
      localStorage["source"] != "" &&
      localStorage["source"] != undefined
    ) {
      load_source_opml();
      check = true;
    }
    if (
      localStorage["source_local"] &&
      localStorage["source_local"] != "" &&
      localStorage["source_local"] != undefined
    ) {
      load_local_file_opml();
      check = true;
    }
    if (!check) {
      localStorage.setItem("source", default_opml);
      load_source_opml();
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
        build();
      }, 4000);
    }
  }
}, 1000);

//start loading feeds
let feed_download_list = [];
if (localStorage.getItem("feed_download_list") == null) {
  localStorage.setItem("feed_download_list", feed_download_list);
} else {
  feed_download_list = JSON.parse(localStorage.getItem("feed_download_list"));
}
let load_feeds = function (data) {
  var xmlDoc = parser.parseFromString(data, "text/xml");
  let content = xmlDoc.getElementsByTagName("body")[0];
  let index = 0;

  let m = content.querySelectorAll("outline");
  for (var i = 0; i < m.length; i++) {
    var nested = m[i].querySelectorAll("outline");

    if (nested.length > 0) {
      for (var z = 0; z < nested.length; z++) {
        //feed_download_list

        let result = false;

        for (var k = 0; k < feed_download_list.length; k++) {
          if (feed_download_list[k].url == nested[z].getAttribute("xmlUrl")) {
            source_url_cleaner.push(nested[z].getAttribute("xmlUrl"));
            result = true;
            break;
          }
        }
        //put in list
        if (result == false) {
          feed_download_list.push({
            title: nested[z].getAttribute("title"),
            url: nested[z].getAttribute("xmlUrl"),
            amount: 5,
            index: index++,
            channel: nested[z].parentElement.getAttribute("text"),
          });
        }
      }
    }

    localStorage.setItem(
      "feed_download_list",
      JSON.stringify(feed_download_list)
    );
  }

  rss_fetcher(
    feed_download_list[0].url,
    feed_download_list[0].amount,
    feed_download_list[0].channel,
    feed_download_list[0].channel
  );

  //clean source feed
  for (let p = 0; p < feed_download_list.length; p++) {
    if (source_url_cleaner.includes(feed_download_list[p].url) == false) {
      feed_download_list.splice(p, 1);
    }
  }
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

  function transferFailed() {}

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
      item_video_url = "";

      //Channel
      rss_title = data.querySelector("title").textContent || param_channel;

      param_channel = rss_title;

      let p = Number(feed_download_list.length - 1);
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

            if (
              item_type == "video/mp4" ||
              item_type == "application/x-mpegurl"
            ) {
              item_media = "video";
              item_video_url = el[i]
                .querySelector("enclosure")
                .getAttribute("url");
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
              item_duration = el[i].getElementsByTagNameNS("*", "duration")[0]
                .textContent;
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
            index: 0,
            title: DOMPurify.sanitize(item_title),
            summary: DOMPurify.sanitize(item_summary),
            link: item_link,
            date: item_date,
            dateunix: item_date_unix,
            channel: param_channel,
            category: param_category,
            type: item_type,
            image: item_image,
            duration: toTime(item_duration),
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
            video_url: item_video_url,
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

            if (
              item_type == "video/mp4" ||
              item_type == "application/x-mpegurl"
            ) {
              item_media = "video";
              item_video_url = el[i]
                .querySelector("enclosure")
                .getAttribute("url");
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
              item_duration = el[i].getElementsByTagNameNS("*", "duration")[0]
                .textContent;
            }
          }

          startlistened = "";
          if (audio_memory.hasOwnProperty(item_cid)) {
            startlistened = "start_listened";
          }

          content_arr.push({
            index: 0,
            title: DOMPurify.sanitize(item_title),
            summary: DOMPurify.sanitize(item_summary),
            link: item_link,
            date: item_date,
            dateunix: item_date_unix,
            channel: param_channel,
            category: param_category,
            type: item_type,
            image: item_image,
            duration: toTime(item_duration),
            media: item_media,
            filesize: item_filesize,
            cid: item_cid,
            listened: "not-listened",
            recently_played: null,
            recently_order: null,
            read: "not-read",
            start_listened: startlistened,
            youtube_thumbnail: yt_thumbnail,
            video_url: item_video_url,
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
      console.log(param_channel + " redirection", 3000);
      rss_fetcher(
        xhttp.getResponseHeader("Location"),
        param_limit,
        param_channel,
        param_channel
      );
    }

    xhttp.ontimeout = function (e) {
      console.log(param_channel + "Time out", 3000);
    };

    if (xhttp.status === 0) {
    }
  };

  function loadEnd(e) {
    //after download build html objects
    if (k == feed_download_list.length - 1) {
      build();
      saveCache(content_arr);
    }
    if (k < feed_download_list.length - 1) {
      document.getElementById("intro-message").innerText = "loading data";
      k++;
      rss_fetcher(
        feed_download_list[k].url,
        feed_download_list[k].amount,
        feed_download_list[k].channel,
        feed_download_list[k].channel
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
  if (content_arr.length == 0) return false;
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
  if (content_arr.length == 0) return false;

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
  if (content_arr.length == 0) return false;

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
  document.querySelector("#news-feed-list").innerHTML = rendered;
}

//render download-list
function render_feed_download_list(arr) {
  var template = document.getElementById(
    "feed-download-list-template"
  ).innerHTML;
  var rendered = Mustache.render(template, {
    data: arr,
  });
  document.querySelector("#feed-download-list div").innerHTML = rendered;
}

//render selectbox
function renderSB(arr) {
  var template = document.getElementById("sb").innerHTML;
  var rendered = Mustache.render(template, {
    data: arr,
  });
  document.getElementById("source-local").innerHTML = rendered;
}

//filter view
let heroArray = [];
let filter_data = function (cat) {
  heroArray.length = 0;
  let index = 0;
  for (let i = 0; i < content_arr.length; i++) {
    if (content_arr[i].category == cat) {
      index++;
      content_arr[i].index = index;
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

//build html
function build() {
  sort_array(content_arr, "channel", "string");
  read_articles();
  listened_articles();
  tabs();
  clean_localstorage();
  bottom_bar(
    "<img src='assets/icons/option.svg'>",
    "",
    "<img src='assets/icons/list.svg'>"
  );

  top_bar("", panels[0], "");

  panels.push("recently-played");

  renderHello(content_arr);
  render_feed_download_list(feed_download_list);

  //division_remove();

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
    article_array = document.querySelectorAll("article .item");
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
    document.activeElement.style.color = "silver";
    return true;
  }

  if (un_read == false) {
    status.active_element_id = document.activeElement.getAttribute("data-id");

    let kk = document
      .querySelector("[data-id ='" + status.active_element_id + "']")
      .getAttribute("data-id");

    document
      .querySelector("[data-id ='" + status.active_element_id + "']")
      .setAttribute("data-read", "not-read");

    let test = [];
    for (var i = 0; i < read_elem.length; i++) {
      if (read_elem[i] != kk) test.push(read_elem[i]);
    }
    localStorage.setItem("read_elem", JSON.stringify(test));
    read_elem = test;
    document.activeElement.style.color = "black";

    side_toaster("article marked as not read", 2000);
  }
};

let sort_tab = function (type) {
  if (
    status.current_panel == "channels" ||
    status.current_panel == "recently-played"
  ) {
    side_toaster("this tab can't be sorted", 2000);
    return false;
  }

  console.log(heroArray, status.current_panel);
  filter_data(status.current_panel);
  //sort
  if (type == "string") {
    sort_array(heroArray, "title", "string");
    status.tabsort = "string";
  }

  if (type == "date") {
    sort_array(heroArray, "dateunix", "number");
    status.tabsort = "date";
  }
  //build html
  renderHello(heroArray);
  set_tabindex();
  document.querySelectorAll("div#news-feed-list article")[0].focus();

  side_toaster("sorted", 2000);
};

////////////////////////
//NAVIGATION
/////////////////////////

let division_count = 0;

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

  status.current_panel = panels[current_panel];
  console.log(status);

  top_bar("", panels[current_panel], "");
  if (status.sleepmode) top_bar("sleep", panels[current_panel], "");

  read_articles();
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
    sort_array(content_arr, "channel", "string");
    renderHello(content_arr);
  }

  set_tabindex();

  document.activeElement.classList.remove("overscrolling");
  status.panel = panels[current_panel];
}
////////////
//TABINDEX NAVIGATION
///////////

function nav(move) {
  // Setup siblings array and get the first sibling
  let siblings = [];

  //nested input field
  if (document.activeElement.parentNode.classList.contains("input-parent")) {
    document.activeElement.parentNode.focus();
  }

  if (document.activeElement.classList.contains("input-parent")) {
    bottom_bar("", "", "");
  }

  let b = document.activeElement.parentNode;
  let items = b.querySelectorAll(".item");

  for (let i = 0; i < items.length; i++) {
    siblings.push(items[i]);
  }

  if (move == "+1") {
    tab_index++;

    if (tab_index >= siblings.length) {
      tab_index = siblings.length - 1;
      return true;
    }

    siblings[tab_index].focus();
  }

  if (move == "-1" && tab_index > 0) {
    tab_index--;

    console.log(document.activeElement.parentElement.id);
    if (document.activeElement.parentElement.id == "KaiOsAds-Wrapper")
      open_options();

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
}

//navigation between channels into channels view
let channel_navigation = function (direction) {
  let el = document.activeElement;

  if (direction == "down") {
    // Get the next sibling element
    var sibling = el.nextElementSibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      console.log(
        sibling.getAttribute("data-channel") +
          "/" +
          el.getAttribute("data-channel")
      );
      if (
        sibling.getAttribute("data-channel") != el.getAttribute("data-channel")
      ) {
        sibling.focus();
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
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }
  }
  if (direction == "up") {
    // Get the next sibling element
    var sibling = el.previousElementSibling;

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      if (
        sibling.getAttribute("data-channel") !=
        document.activeElement.getAttribute("data-channel")
      ) {
        sibling.focus();
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
        return sibling;
      }
      sibling = sibling.previousElementSibling;
    }
  }
};

let sleep_mode = function () {
  let st = setting.sleep_time;
  st = st * 60 * 1000;

  status.sleepmode = true;
  toaster("sleepmode activ", 3000);
  setTimeout(() => {
    play_podcast();
    show_article_list();
    status.sleepmode = false;
  }, st);
};

let show_article = function () {
  mark_as_read(true);
  status.window_status = "single-article";
  document.getElementById("news-feed-list").scrollTo(0, 0);

  document.querySelector("div#youtube-player").style.display = "none";
  document.querySelector("div#video-player").style.display = "none";
  document.querySelector("div#audio-player").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("options").style.display = "none";

  link_type = document.activeElement.getAttribute("data-audio-type");

  let elem = document.querySelectorAll("article");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "none";
  }

  elem = document.querySelectorAll("div.summary");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "block";
  }

  document.activeElement.style.background = "white";

  document.activeElement.style.fontStyle = "normal";
  document.activeElement.style.color = "black";

  document.activeElement.style.display = "block";
  document.activeElement.classList.add("view");

  document.getElementById("top-bar").style.display = "none";

  if (document.activeElement.getAttribute("data-media") == "podcast") {
    bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
  }

  if (document.activeElement.getAttribute("data-media") == "video") {
    bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
  }

  if (document.activeElement.getAttribute("data-media") == "rss") {
    bottom_bar("<img src='assets/icons/E24F.svg'>", "", "");
  }

  if (document.activeElement.getAttribute("data-media") == "youtube") {
    bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
  }

  document.querySelector("div#news-feed").style.background = "white";

  document.querySelector("div#news-feed div#news-feed-list").style.top = "0px";

  document.querySelector("div#news-feed div#news-feed-list").style.overflow =
    "scroll";
};

let toTime = function (seconds) {
  let n = "";
  if (seconds == "") {
    n = "";
  } else {
    try {
      var date = new Date();
      date.setSeconds(seconds);
      n = date.toISOString().substr(11, 8);
    } catch (error) {
      console.log(seconds);
      n = seconds;
    }
  }

  return n;
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

let video_seeking = function (param) {
  var step = 10;
  if (param == "backward") {
    video.currentTime = video.currentTime - step++;
  }

  if (param == "forward") {
    video.currentTime = video.currentTime + step++;
  }
};
//open source or youtube
function open_url() {
  //rss
  if (document.activeElement.getAttribute("data-media") == "rss") {
    let link_target = document.activeElement.getAttribute("data-link");
    let title = document.activeElement.querySelector("h1.title").textContent;
    title = title.replace(/\s/g, "-");
    bottom_bar("", "", "");
    show_article_list();
    window.open(link_target);
    return true;
  }
  //video
  if (document.activeElement.getAttribute("data-media") == "video") {
    video_player = document.getElementById("videoplayer");

    video.src = document.activeElement.getAttribute("data-video-url");

    open_video_player();
    document.getElementById("progress-bar").style.display = "block";

    status.window_status = "video";
    if (document.activeElement.getAttribute("data-media") == "podcast") {
      bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
    }

    video_player.onloadedmetadata = function () {
      document.getElementById("message").style.top = "0px";
      document.getElementById("message-inner").innerText = "please wait ";
    };

    video_player.onplaying = function () {
      stop_player(); //stop audio player

      document.getElementById("message").style.top = "-1000px";
      video_status = "playing";

      video_time = setInterval(function () {
        t = video.duration - video.currentTime;

        let percent = (video.currentTime / video.duration) * 100;
        document.getElementById("progress-bar").style.display = "block";

        document.querySelector("div#progress-bar div").style.width =
          percent + "%";

        if (video_status == "playing") {
          bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
        }
        if (video_status == "paused") {
          bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
        }
      }, 1000);
    };

    video_player.onpause = function () {
      document.getElementById("message").style.top = "-1000px";
      video_status = "paused";
      bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
    };

    return;
  }

  //youtube

  if (document.activeElement.getAttribute("data-media") == "youtube") {
    stop_player();
    status.window_status = "youtube";
    bottom_bar("", "", "");

    document.getElementById("message").style.top = "0px";
    document.getElementById("message-inner").innerText = "please wait ";
    document.getElementById("youtube-player").style.display = "block";

    youtube_player = new YT.Player("iframe-wrapper", {
      videoId: document.activeElement.getAttribute("data-youtube-id"),
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    let t;

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        youtube_status = "playing";
        bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
      }

      if (event.data == YT.PlayerState.PAUSED) {
        youtube_status = "paused";
      }

      youtube_time = setInterval(function () {
        t = youtube_player.getDuration() - youtube_player.getCurrentTime();

        let percent =
          (youtube_player.getCurrentTime() / youtube_player.getDuration()) *
          100;
        document.getElementById("progress-bar").style.display = "block";

        document.querySelector("div#progress-bar div").style.width =
          percent + "%";

        if (youtube_status == "playing") {
          bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
        }
        if (youtube_status == "paused") {
          bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
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
  document.querySelector("div#video-player").style.display = "none";
  document.getElementById("audio-player").style.display = "none";
  document.querySelector("div#youtube-player").style.display = "none";
  document.getElementById("progress-bar").style.display = "none";
  document.querySelector("div#settings").style.display = "none";
  document.querySelector("div#options").style.display = "none";

  document.querySelector("div#news-feed div#news-feed-list").style.overflow =
    "hidden";

  document.querySelector("div#news-feed div#news-feed-list").style.top = "27px";
  bottom_bar(
    "<img src='assets/icons/option.svg'>",
    "",
    "<img src='assets/icons/list.svg'>"
  );
  top_bar("", panels[current_panel], "");

  if (youtube_player) {
    youtube_player.stopVideo();
    youtube_player.destroy();
    youtube_player = "";
    clearInterval(youtube_time);
  }
  video.src = "";
  article_array[tab_index];

  document.querySelector("div#youtube-player iframe").setAttribute("src", "");

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

  document.getElementById("top-bar").style.display = "block";

  let elem = document.querySelectorAll("article");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "block";

    let rd = elem[i].getAttribute("data-read");

    if (rd == "read") {
      document.activeElement.style.opacity = "0.8";
      document.activeElement.style.color = "rgb(107, 98, 112)";
    }
  }

  elem = document.querySelectorAll("div.summary");
  for (let i = 0; i < elem.length; i++) {
    elem[i].style.display = "none";
  }

  status.window_status = "article-list";
  document
    .querySelector("[data-id='" + status.active_element_id + "']")
    .focus();
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

  video.src = "";
  clearInterval(video_time);
};

let show_feed_download_list = function () {
  tab_index = 0;
  bottom_bar("", "<img src='assets/icons/pencil.svg'>", "");
  status.window_status = "download-list";
  document.getElementById("feed-download-list").style.display = "block";
  document.getElementById("options").style.display = "none";

  document.querySelector("div#feed-download-list div:first-child").focus();

  document.querySelectorAll("#feed-download-list input").forEach(function (e) {
    e.addEventListener("change", function () {
      feed_download_list.forEach(function (f) {
        if (f.url == e.getAttribute("data-url")) {
          f.amount = e.value;

          //save list
          localStorage.setItem(
            "feed_download_list",
            JSON.stringify(feed_download_list)
          );
        }
      });
    });
  });
};

let focus_after_selection = function () {
  if (document.querySelectorAll(".select-box") == null) return false;
  document.querySelectorAll(".select-box").forEach(function (e) {
    e.addEventListener("blur", function (k) {
      setTimeout(function () {
        e.parentElement.focus();
      }, 200);
    });
  });
};

//settings view

let show_settings = function () {
  status.active_element_id = document.activeElement.getAttribute("data-id");

  status.window_status = "settings";

  load_settings();

  bottom_bar("", "", "");

  document.querySelectorAll("div#settings .item").forEach(function (e, index) {
    if (e.style.display != "none") {
      e.setAttribute("tabindex", index);
    }
  });

  tab_index = 0;
  document.getElementById("top-bar").style.display = "none";

  document.getElementById("settings").style.display = "block";
  document.getElementById("settings").children[0].focus();
  list_files("opml", list_files_callback);
  focus_after_selection();
};

//options view

let open_options = function () {
  bottom_bar("", "", "");
  tab_index = 0;
  status.active_element_id = document.activeElement.getAttribute("data-id");
  status.window_status = "options";
  document.getElementById("options").style.display = "block";
  document.querySelectorAll("div#options div")[0].focus();
};

let start_options = function () {
  if (document.activeElement.getAttribute("data-function") == "unread") {
    mark_as_read(false);
  }
  if (document.activeElement.getAttribute("data-function") == "sleepmode") {
    sleep_mode();
  }

  if (document.activeElement.getAttribute("data-function") == "reload") {
    reload();
  }

  if (document.activeElement.getAttribute("data-function") == "download-list") {
    show_feed_download_list();
  }

  if (document.activeElement.getAttribute("data-function") == "sort-by-name") {
    sort_tab("string");
  }

  if (document.activeElement.getAttribute("data-function") == "sort-by-date") {
    sort_tab("number");
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

//video-player view

let open_video_player = function () {
  document.getElementById("video-player").style.display = "block";
  status.window_status = "video";
  video.src = document.activeElement.getAttribute("data-video-url");
};

let open_player = function (reopen) {
  status.active_element_id = document.activeElement.getAttribute("data-id");

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
  bottom_bar("<img src='assets/icons/E1D8.svg'>", "", "");
  qrscan = true;
});

qr_listener.addEventListener("blur", (event) => {
  bottom_bar("", "", "");
  qrscan = false;
});

document.querySelector("#source-local").addEventListener("change", (event) => {
  localStorage.setItem("source_local", this.value);
  console.log(this.value);
});

let select_box = [];

let list_files_callback = function (filename) {
  if (filename == "error") {
  }
  select_box.push({ filename: filename });
  renderSB(select_box);
};

let callback_scan = function (url) {
  document.activeElement.value = url;

  status.window_status = "settings";
};

let stop_scan_callback = function () {
  document.getElementById("qr-screen").style.display = "none";
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

    case "1":
      mark_as_read(false);
      break;

    case "3":
      sleep_mode();

      break;

    case "7":
      status.tabsort == "string" ? sort_tab("date") : sort_tab("string");

      break;

    case "Enter":
      if (document.activeElement.classList.contains("input-parent")) {
        if (document.activeElement.querySelector("input") != null)
          document.activeElement.querySelector("input").focus();

        if (document.activeElement.querySelector("select") != null)
          document.activeElement.querySelector("select").focus();
        return true;
      }

      if (document.activeElement.classList.contains("set-download-amount")) {
        show_feed_download_list();
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

      if (status.window_status == "youtube") {
        youtube_seeking("backward");
        break;
      }

      if (status.window_status == "video") {
        video_seeking("backward");
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
      if (status.window_status == "youtube") {
        youtube_seeking("forward");
        break;
      }

      if (status.window_status == "video") {
        video_seeking("forward");
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

      if (status.window_status == "download-list") {
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

      if (status.window_status == "download-list") {
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

      if (status.window_status == "settings" && qrscan == true) {
        start_scan(callback_scan);
        status.window_status = "scan";

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

      if (status.window_status == "audio-player") {
        play_podcast(document.activeElement.getAttribute("data-link"));
        break;
      }

      if (status.window_status == "video") {
        if (video_status == "paused" || video_status == "") {
          video.play();

          return false;
        }

        if (video_status == "playing") {
          video.pause();
          return false;
        }
      }

      if (status.window_status == "youtube") {
        if (youtube_status == "paused" || youtube_status == "") {
          youtube_player.playVideo();
          return false;
        }

        if (youtube_status == "playing") {
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

      if (status.window_status == "scan") {
        status.window_status = "settings";
        stop_scan(stop_scan_callback);
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
      console.log(status.window_status);
      if (status.window_status == "intro") {
        bottom_bar("", "", "");
        break;
      }

      if (status.window_status == "scan") {
        status.window_status = "settings";
        stop_scan(stop_scan_callback);
        break;
      }

      if (status.window_status == "article-list") {
        bottom_bar("", "", "");
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

      if (status.window_status == "video") {
        show_article_list();
        break;
      }

      if (status.window_status == "youtube") {
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

      if (status.window_status == "settings") {
        show_article_list();

        break;
      }

      if (status.window_status == "download-list") {
        document.getElementById("feed-download-list").style.display = "none";
        show_settings();
        status.window_status = "settings";
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
      if (status.window_status == "youtube") {
        youtube_seeking("backward");
      }

      if (status.window_status == "video") {
        video_seeking("backward");
      }
    }

    if (evt.key == "ArrowRight") {
      if (status.window_status == "youtube") {
        youtube_seeking("forward");
      }

      if (status.window_status == "video") {
        video_seeking("forward");
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
