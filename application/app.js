"use strict";
import { translations } from "./assets/js/translations.js";
import { cred } from "./cred.js";
import Mustache from "mustache";
import DOMPurify from "dompurify";
import {
  side_toaster,
  sort_array,
  imageSizeReduce,
  llazyload,
} from "./assets/js/helper.js";
import {
  toaster,
  share,
  isValidUrl,
  pushLocalNotification,
  isAnyAudioPlaying,
} from "./assets/js/helper.js";
import { hashCode, formatFileSize } from "./assets/js/helper.js";
import { loadCache, saveCache, getTime } from "./assets/js/cache.js";
import { bottom_bar, top_bar, list_files, notify } from "./assets/js/helper.js";
import { start_scan } from "./assets/js/scan.js";
import { stop_scan } from "./assets/js/scan.js";
import { load_context, mastodon_account_info } from "./assets/js/mastodon.js";
import "url-search-params-polyfill";

import {
  setting,
  load_settings,
  save_settings,
  export_settings,
  load_settings_from_file,
} from "./assets/js/settings.js";
import {
  play_podcast,
  seeking,
  stop_player,
  volume_control,
} from "./assets/js/audio.js";

import { v4 as uuidv4 } from "uuid";

import lozad from "lozad";

const dayjs = require("dayjs");
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
const debug = false;
let article_array;
//data layer
let content_arr = [];
//store all used article ids
var all_cid = [];
let feed_download_list_count = 0;

let panels = ["channels", "recently-played"];

let current_panel = 0;
const parser = new DOMParser();

let video_player = "";
let youtube_player;
let video_time;
let youtube_time;
let video_status = "";
let youtube_status = "";
let video = document.getElementById("videoplayer");
let source_url_cleaner = ["$$", "mm"];
try {
  //screenlock("lock");
} catch (e) {}

//get read articles
export let read_elem =
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

const mastodon_server_url = localStorage.getItem("mastodon_server") ?? "";

if (navigator.minimizeMemoryUsage) navigator.minimizeMemoryUsage();

const sync_time = Number(localStorage.getItem("interval"));

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
  audio_status: "",
  sleepmode: false,
  sort: "number",
  current_panel: "channels",
};

let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
  audio_memory = JSON.parse(localStorage.getItem("audio_memory"));
} else {
  audio_memory = {};
}

async function loadDataAndHandle() {
  try {
    content_arr = await loadCache();

    if (content_arr.length > 0) {
      build();
      document.getElementById("intro-message").innerText = "cached data loaded";
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

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
false;

//KAiOS 2.x || 3.x
if (navigator.mozApps) {
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

  function manifest(a) {
    if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
      load_ads();
    }
  }
  getManifest(manifest);
}
if ("b2g" in navigator) load_ads();

/////////////////////////////
////////////////////////////
//GET URL LIST/////////////
//from local file or online source
//////////////////////////
//////////////////////////

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

  let sdcard;
  if ("b2g" in navigator) {
    sdcard = navigator.b2g.getDeviceStorage("sdcard");
  }
  try {
    sdcard = navigator.getDeviceStorage("sdcard");
  } catch (e) {
    console.log(e);
  }

  var request = sdcard.get(a);
  request.onerror = function () {
    document.getElementById("intro-message").innerHTML =
      translations[userLang].app_error_0;
  };

  request.onsuccess = function () {
    let file = this.result;

    let reader = new FileReader();
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
  let nocaching = Math.floor(Date.now() / 1000);

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

    loadDataAndHandle();
  };

  xhttp.send(null);
};

setTimeout(() => {
  if (localStorage["source_local"] == null && localStorage["source"] == null) {
    localStorage.setItem("source", default_opml);
  }
  //get update time; cache || download
  let a = localStorage.getItem("interval");
  a == "never" ? (a = 0) : (a = a);

  document.getElementById("intro-message").innerText = "checking feed list";
  //download
  if (getTime(a) && navigator.onLine) {
    let check = false;

    // Load online OPML
    if (localStorage["source"]) {
      load_source_opml();
      check = true;
    }

    // Load local OPML
    if (localStorage["source_local"]) {
      load_local_file_opml();
      check = true;
    }

    if (!check) {
      localStorage.setItem("source", default_opml);
      load_source_opml();
    }

    //load cache
  } else {
    loadDataAndHandle();
  }
}, 1000);

//sync test
const sync = () => {
  //download
  if (localStorage.getItem("feed_download_list") == null) {
    localStorage.setItem("feed_download_list", feed_download_list);
  } else {
    try {
      feed_download_list = JSON.parse(
        localStorage.getItem("feed_download_list")
      );
    } catch (e) {}
  }

  if (navigator.onLine) {
    article_array ?? article_array.splice(0, article_array.length);
    content_arr ?? content_arr.splice(0, content_arr.length);
    feed_download_list ??
      feed_download_list.splice(0, feed_download_list.length);

    try {
      load_local_file_opml();
    } catch (e) {}

    try {
      load_source_opml();
    } catch (e) {}

    try {
      loadMastodon();
    } catch (e) {}
  }
};
/////////////////

//start loading feeds
let feed_download_list = [];

if (localStorage.getItem("feed_download_list") == null) {
  localStorage.setItem("feed_download_list", feed_download_list);
} else {
  feed_download_list = JSON.parse(localStorage.getItem("feed_download_list"));
}

let load_feeds = function (data) {
  try {
    feed_download_list = JSON.parse(localStorage.getItem("feed_download_list"));
  } catch (e) {} //load feed list to compare and store again

  var xmlDoc = parser.parseFromString(data, "text/xml");
  let content = xmlDoc.getElementsByTagName("body")[0];
  let index = 0;

  let m = content.querySelectorAll("outline");
  for (var i = 0; i < m.length; i++) {
    var nested = m[i].querySelectorAll("outline");

    if (nested.length > 0) {
      for (var z = 0; z < nested.length; z++) {
        //feed_download_list

        //only push in list when not exist
        let result = false;

        for (let k = 0; k < feed_download_list.length; k++) {
          if (feed_download_list[k].url == nested[z].getAttribute("xmlUrl")) {
            source_url_cleaner.push(nested[z].getAttribute("xmlUrl"));
            result = true;
            k == feed_download_list.length;
            break;
          }
        }
        //put in list
        if (!result) {
          feed_download_list.push({
            error: "",
            title: nested[z].getAttribute("title"),
            url: nested[z].getAttribute("xmlUrl"),
            amount: 5,
            index: index++,
            channel: nested[z].parentElement.getAttribute("text"),
            type:
              nested[z].getAttribute("type") == undefined
                ? "rss"
                : nested[z].getAttribute("type"),
          });
        }
      }
    }
  }
  //start downloading feeds
  setTimeout(function () {
    document.querySelector(".loading-spinner").style.display = "block";
    if (status.window_status == "intro")
      document.querySelector(".loading-spinner").style.top = "80%";

    rss_fetcher(
      feed_download_list[0].url,
      feed_download_list[0].amount,
      feed_download_list[0].title,
      feed_download_list[0].channel,
      feed_download_list[0].type
    );
  }, 1000);

  //clean source feed
  for (let p = 0; p < feed_download_list.length; p++) {
    if (source_url_cleaner.includes(feed_download_list[p].url) == false) {
      feed_download_list.splice(p, 1);
    }
  }

  localStorage.setItem(
    "feed_download_list",
    JSON.stringify(feed_download_list)
  );
};

//////////////////////////////
//download content////
//////////////////////////////

let rss_fetcher = function (
  param_url,
  param_limit,
  param_channel,
  param_category,
  param_type
) {
  if (param_type == "mastodon") {
    try {
      fetch(param_url, {
        method: "GET",
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          data.forEach(function (i) {
            let item_image = "";
            let video_url = "";
            let item_type = "mastodon";
            let item_media = "mastodon";
            let item_filesize = "";
            let item_download = "";
            let startlistened = "";

            if (i.media_attachments.length > 0) {
              if (i.media_attachments[0].type == "image")
                item_image = i.media_attachments[0].preview_url;

              if (i.media_attachments[0].type == "video") {
                video_url = i.media_attachments[0].url;
                item_image = i.media_attachments[0].preview_url;
                item_media = "video";
              }

              if (i.media_attachments[0].type == "audio") {
                video_url = i.media_attachments[0].url;
                item_media = "audio";
              }
            }

            //date
            let item_date = new Date(i.created_at);
            let item_date_unix = item_date.valueOf();
            item_date = item_date.toDateString();

            content_arr.push({
              index: 0,
              title: DOMPurify.sanitize(i.account.display_name),
              summary: DOMPurify.sanitize(i.content),
              link: i.uri,
              date: item_date,
              dateunix: item_date_unix,
              channel: param_channel,
              category: param_category,
              type: item_type,

              image: item_image,
              duration: "",
              media: item_media,
              filesize: item_filesize,
              cid: i.id,
              listened: "not-listened",
              recently_played: null,
              recently_order: null,
              read: "not-read",
              start_listened: startlistened,
              youtube_id: "",
              youtube_thumbnail: "",
              video_url: video_url,
              url: item_download,
              mastodon: item_image,
              replies_count: i.replies_count ?? 0,
              reblogs_count: i.reblogs_count ?? 0,
              favourites_count: i.favourites_count ?? 0,
            });

            if (i.replies_count > 0) {
              load_context(
                localStorage.getItem("mastodon_server"),
                i.id,
                "public"
              )
                .then((r) => {
                  content_arr.forEach((e) => {
                    if (e.cid === i.id) {
                      e.replies = r;
                      console.log(e);
                    }
                  });
                })
                .catch((error) => {
                  console.log("Error loading context:", error);
                });
            }
          });

          if (feed_download_list_count < feed_download_list.length - 1) {
            feed_download_list_count++;
            rss_fetcher(
              feed_download_list[feed_download_list_count].url,
              feed_download_list[feed_download_list_count].amount,
              feed_download_list[feed_download_list_count].title,
              feed_download_list[feed_download_list_count].channel,
              feed_download_list[feed_download_list_count].type
            );
          }
        })
        .catch((error) => {
          console.log("json parser error: " + error);
          feed_download_list[feed_download_list_count].error = "error";
        });
    } catch (e) {
      console.log(e);
    }
  }

  var xhttp = new XMLHttpRequest({
    mozSystem: true,
  });

  xhttp.open("GET", param_url, true);
  xhttp.timeout = 2000;
  xhttp.responseType = "document";
  xhttp.overrideMimeType("text/xml");
  xhttp.send();

  let loadEnd = function (e) {
    //after download build html objects
    if (feed_download_list_count == feed_download_list.length - 1) {
      ready_to_build();
    }
    if (feed_download_list_count < feed_download_list.length - 1) {
      document.getElementById("intro-message").innerText = "loading data";

      //error log
      if (xhttp.status != 200) {
        feed_download_list[feed_download_list_count].error = "error";
      }
      feed_download_list_count++;
      rss_fetcher(
        feed_download_list[feed_download_list_count].url,
        feed_download_list[feed_download_list_count].amount,
        feed_download_list[feed_download_list_count].title,
        feed_download_list[feed_download_list_count].channel,
        feed_download_list[feed_download_list_count].type
      );
    }
  };

  xhttp.addEventListener("loadend", loadEnd);

  xhttp.onload = function () {
    document.getElementById("intro-message").innerText = "loading data";
    if (xhttp.readyState === xhttp.DONE && xhttp.status == 200) {
      let data = xhttp.response;
      let rss_title = "";
      let item_image = "";
      let item_summary = "";
      let item_link = "";
      let item_title = "";
      let item_type = "";
      let item_date_unix = "";

      let item_media = "rss";
      let item_duration = "";
      let item_filesize = "";
      let item_download = "";
      let item_cid = "";
      let item_date = "";
      let startlistened = "";
      let youtube_id = "";
      let yt_thumbnail = "";
      let item_video_url = "";
      let el = "";

      //xml items
      document.querySelector(".loading-spinner").style.display = "block";

      //Channel
      try {
        rss_title = data.querySelector("title").textContent;
      } catch (e) {
        rss_title = param_channel;
      }

      try {
        item_image = data.getElementsByTagName("url")[0].textContent;
      } catch (e) {}

      //ATOM
      try {
        el = data.querySelectorAll("entry");
      } catch (e) {}

      if (el.length > 0 && typeof el != undefined) {
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

          if (
            el[i].querySelector("link") !== null &&
            typeof el[i].querySelector("link") !== undefined
          ) {
            item_link = el[i].querySelector("link").getAttribute("href");
          }

          if (
            el[i].querySelector("enclosure") != null &&
            typeof el[i].querySelector("enclosure") != undefined
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
              item_media = "audio";
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
              if (en_length) item_filesize = formatFileSize(en_length, 2);
            }
          }
          if (item_media == "audio") {
            if (el[i].getElementsByTagNameNS("*", "duration").length > 0) {
              item_duration = el[i].getElementsByTagNameNS("*", "duration")[0]
                .textContent;
            }
          }

          //check valid date
          if (
            el[i].querySelector("updated") != null ||
            typeof el[i].querySelector("updated") != undefined
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
            youtube_id: youtube_id,
            youtube_thumbnail: yt_thumbnail,
            video_url: item_video_url,
            url: item_download,
            replies_count: "0",
            reblogs_count: "0",
            favourites_count: "0",
          });
        }
      }

      ////////////
      //RSS
      ///////////
      //reset vars
      rss_title = "";
      item_image = "";
      item_summary = "";
      item_link = "";
      item_title = "";
      item_type = "";
      item_date_unix = "";

      item_media = "rss";
      item_duration = "";
      item_filesize = "";
      item_download = "";
      item_cid = "";
      item_date = "";
      startlistened = "";
      youtube_id = "";
      yt_thumbnail = "";
      item_video_url = "";
      el = "";

      try {
        el = data.querySelectorAll("item");
      } catch (e) {}

      try {
        item_image = data.getElementsByTagName("url")[0].textContent;
      } catch (e) {}

      if (el.length > 0 && typeof el != undefined) {
        for (let i = 0; i < param_limit; i++) {
          item_title = el[i].querySelector("title").innerHTML;
          item_title = item_title.replace("<![CDATA[", "");
          item_title = item_title.replace("]]>", "");
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
            el[i].querySelector("pubDate") != null &&
            typeof el[i].querySelector("pubDate") != undefined
          ) {
            if (el[i].querySelector("pubDate").innerHTML == "") {
              item_date_unix = new Date().valueOf();
              item_date = "";
            } else {
              item_date = new Date(el[i].querySelector("pubDate").innerHTML);
              item_date_unix = item_date.valueOf();
              item_date = item_date.toDateString();
              length > 0;
            }
          }

          if (
            el[i].querySelector("enclosure") != null &&
            typeof el[i].querySelector("enclosure") != undefined
          ) {
            if (el[i].querySelector("enclosure").getAttribute("url"))
              item_download = el[i]
                .querySelector("enclosure")
                .getAttribute("url");

            item_link = item_download;

            if (
              el[i].querySelector("enclosure").getAttribute("type") != null &&
              typeof el[i].querySelector("enclosure").getAttribute("type") !=
                undefined
            )
              item_type = el[i].querySelector("enclosure").getAttribute("type");

            if (
              item_type == "audio/mpeg" ||
              item_type == "audio/aac" ||
              item_type == "audio/x-mpeg" ||
              item_type == "audio/mp3" ||
              item_type == "audio/x-m4a"
            ) {
              item_media = "audio";
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
              if (en_length) item_filesize = formatFileSize(en_length, 2);
            }
          }
          if (item_media == "audio") {
            if (el[i].getElementsByTagNameNS("*", "duration").length > 0) {
              item_duration = el[i].getElementsByTagNameNS("*", "duration")[0]
                .textContent;
            }
          }

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
            replies_count: 0,
            reblogs_count: 0,
            favourites_count: 0,
          });
        }
      }
    }

    ////Redirection
    if (xhttp.status === 301) {
      rss_fetcher(
        xhttp.getResponseHeader("Location"),
        param_limit,
        param_channel,
        param_channel
      );
    }
  };
};

//mastodon

let mastodon_timeline_urls = {
  home: mastodon_server_url + "/api/v1/timelines/home",
  local: mastodon_server_url + "/api/v1/timelines/public?local=true",
};

let mastodon_load_feed = (url) => {
  let a = JSON.parse(localStorage.getItem("oauth_auth"));
  let accessToken = a.access_token;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the response data
      data
        .forEach(function (i) {
          let item_image = "";
          let video_url = "";
          let item_type = "mastodon";
          let item_media = "mastodon";
          let item_filesize = "";
          let item_download = "";
          let startlistened = "";
          let param_channel = "";
          let param_category = "";
          if (url == mastodon_timeline_urls.home) {
            param_channel = "mastodon home";
            param_category = "mastodon home";
          }
          if (url == mastodon_timeline_urls.local) {
            param_channel = "mastodon local";
            param_category = "mastodon local";
          }

          if (i.media_attachments.length > 0) {
            if (i.media_attachments[0].type == "image")
              item_image = i.media_attachments[0].preview_url;

            if (i.media_attachments[0].type == "video") {
              video_url = i.media_attachments[0].url;
              item_image = i.media_attachments[0].preview_url;
              item_media = "video";
            }

            if (i.media_attachments[0].type == "audio") {
              video_url = i.media_attachments[0].url;
              item_media = "audio";
            }
          }

          let content = i.content;
          if (content == "") {
            try {
              content = i.reblog.content;
            } catch (e) {}
          }

          //date
          let item_date = new Date(i.created_at);
          let item_date_unix = item_date.valueOf();
          item_date = item_date.toDateString();

          content_arr.push({
            index: 0,
            title: DOMPurify.sanitize(i.account.display_name),
            summary: DOMPurify.sanitize(content),
            link: i.uri,
            date: item_date,
            dateunix: item_date_unix,
            channel: param_channel ?? "",
            category: param_category ?? "",
            type: item_type,
            image: item_image,
            duration: "",
            media: item_media,
            filesize: item_filesize,
            cid: i.id,
            listened: "not-listened",
            recently_played: null,
            recently_order: null,
            read: "not-read",
            start_listened: startlistened,
            youtube_id: "",
            youtube_thumbnail: "",
            video_url: video_url,
            url: item_download,
            mastodon: item_image,
            replies_count: i.replies_count ? i.replies_count : "0",
            reblogs_count: i.reblogs_count ? i.reblogs_count : "0",
            favourites_count: i.favourites_count ? i.favourites_count : "0",
            replies: "",
          });

          if (i.replies_count > 0) {
            load_context(localStorage.getItem("mastodon_server"), i.id)
              .then((r) => {
                content_arr.forEach((e) => {
                  if (e.cid === i.id) {
                    e.replies = r;
                    console.log(e);
                  }
                });
              })
              .catch((error) => {
                alert("Error loading context:", error);
              });
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error:", error);
        });
    });
};

const loadMastodon = () => {
  if (localStorage.getItem("oauth_auth") == null) return false;

  mastodon_account_info()
    .then((data) => {
      mastodon_load_feed(mastodon_timeline_urls.home);
      mastodon_load_feed(mastodon_timeline_urls.local);
      panels.push("mastodon home");
      panels.push("mastodon local");

      document.querySelector("#mastodon-label").innerText =
        "logged in as " + data.username;

      document.querySelector("input#mastodon-server").readOnly = true;

      document
        .querySelector("[data-function='mastodon-connect']")
        .setAttribute("data-function", "mastodon-disconnect");

      document.querySelector("button.mastodon-connect-button").innerText =
        "disconnect";
    })
    .catch((e) => {
      console.log(e);
    });
};

loadMastodon();

//sort content by date
//build
//write html

let read_articles = function () {
  //if element in read list
  //mark article as read
  if (content_arr.length == 0 || undefined) return false;
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
  if (content_arr.length == 0) {
    return false;
  }

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
    } else {
      const index = panels.indexOf("recently-played");
      if (index !== -1) {
        panels.splice(index, 1);
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
export let renderSB = function (arr) {
  var template = document.getElementById("sb").innerHTML;
  var rendered = Mustache.render(template, {
    data: arr,
  });
  document.getElementById("source-local").innerHTML = rendered;
};

//filter view
let heroArray = [];
let filter_data = function (cat) {
  heroArray.length = 0;
  let index = 0;

  let ids = [];

  content_arr.forEach((item, i) => {
    if (item.category === cat) {
      if (ids.indexOf(item.cid) === -1) {
        ids.push(item.cid);
        item.index = ++index;
        heroArray.push(item);
      }
    }
  });
};
// set panel category
let tabs = () => {
  for (let i = 0; i < content_arr.length; i++) {
    if (!panels.includes(content_arr[i].category) && content_arr.length !== 0) {
      panels.push(content_arr[i].category);
    }
  }
};

//build html
let build = function () {
  document.getElementById("intro").style.display = "none";

  read_articles();
  listened_articles();

  clean_localstorage();
  bottom_bar(
    "<img src='assets/icons/option.svg'>",
    "",
    "<img src='assets/icons/list.svg'>"
  );

  top_bar("", panels[0], "");

  renderHello(content_arr);
  render_feed_download_list(feed_download_list);

  status.window_status = "article-list";

  set_tabindex();

  article_array = document.querySelectorAll("article");
  article_array[0].focus();

  tabs();
};

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

const ready_to_build = function () {
  build();
  saveCache(content_arr);
  localStorage.setItem("updated", new Date());
  document.querySelector(".loading-spinner").style.top = "50%";
  document.querySelector(".loading-spinner").style.display = "none";
  localStorage.setItem("last-update", new Date());
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

  top_bar("", panels[current_panel], "");
  if (status.sleepmode) top_bar("sleep", panels[current_panel], "");

  read_articles();
  //tabs();
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

  status.panel = panels[current_panel];
  document.querySelector("div#news-feed div#news-feed-list").style.top = "40px";
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

    if (document.activeElement.parentElement.id == "KaiOsAds-Wrapper")
      open_options();

    siblings[tab_index].focus();
  }

  document.querySelector("div#news-feed div#news-feed-list").style.top = "2px";
  if (tab_index == 0)
    document.querySelector("div#news-feed div#news-feed-list").style.top =
      "40px";

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
  side_toaster("sleepmode activ", 3000);
  setTimeout(() => {
    play_podcast();
    show_article_list();
    status.sleepmode = false;
    top_bar("", panels[current_panel], "");
  }, st);
};

let show_article = function () {
  imageSizeReduce();
  mark_as_read(true);
  detectURLs();
  status.window_status = "single-article";
  document.getElementById("news-feed-list").scrollTo(0, 0);
  document.getElementById("progress-bar").style.display = "none";

  document.querySelector("div#youtube-player").style.display = "none";
  document.querySelector("div#video-player").style.display = "none";
  document.querySelector("div#audio-player").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("options").style.display = "none";

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

  if (document.activeElement.getAttribute("data-media") == "audio") {
    bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
    if (status.linkfy)
      bottom_bar(
        "<img src='assets/icons/23EF.svg'>",
        "<img src='assets/icons/2-5.svg'>",
        "<img src='assets/icons/E269.svg'>"
      );
  }

  if (document.activeElement.getAttribute("data-media") == "video") {
    bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
    if (status.linkfy)
      bottom_bar(
        "<img src='assets/icons/23EF.svg'>",
        "<img src='assets/icons/2-5.svg'>",
        "<img src='assets/icons/E269.svg'>"
      );
  }

  if (
    document.activeElement.getAttribute("data-media") == "rss" ||
    document.activeElement.getAttribute("data-media") == "mastodon"
  ) {
    bottom_bar(
      "<img src='assets/icons/E24F.svg'>",
      "<img src='assets/icons/2-5.svg'>",
      ""
    );
    if (status.linkfy)
      bottom_bar(
        "<img src='assets/icons/E24F.svg'>",
        "<img src='assets/icons/2-5.svg'>",
        "<img src='assets/icons/E269.svg'>"
      );
  }

  if (document.activeElement.getAttribute("data-media") == "youtube") {
    bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
    if (status.linkfy)
      bottom_bar(
        "<img src='assets/icons/23EF.svg'>",
        "<img src='assets/icons/2-5.svg'>",
        "<img src='assets/icons/E269.svg'>"
      );
  }

  document.querySelector("div#news-feed").style.background = "white";
  document.querySelector("div#news-feed div#news-feed-list").style.top = "2px";
  document.querySelector("div#news-feed div#news-feed-list").style.overflow =
    "scroll";
};

export let toTime = function (seconds) {
  let n = "";
  if (seconds == "") {
    n = "";
  } else {
    try {
      var date = new Date();
      date.setSeconds(seconds);
      n = date.toISOString().substr(11, 8);
    } catch (error) {
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
  if (
    document.activeElement.getAttribute("data-media") == "rss" ||
    document.activeElement.getAttribute("data-media") == "mastodon"
  ) {
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
    if (document.activeElement.getAttribute("data-media") == "audio") {
      bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");
    }

    video_player.onloadedmetadata = function () {
      document.querySelector(".loading-spinner").style.display = "block";
    };

    video_player.onplaying = function () {
      stop_player(); //stop audio player
      //  screenlock("lock");

      document.querySelector(".loading-spinner").style.display = "none";
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
      video_status = "paused";
      bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
      //  screenlock("unlock");
    };

    return;
  }

  //youtube

  if (document.activeElement.getAttribute("data-media") == "youtube") {
    stop_player();
    status.window_status = "youtube";
    bottom_bar("", "", "");
    document.querySelector(".loading-spinner").style.display = "block";
    document.getElementById("youtube-player").style.display = "block";

    youtube_player = new YT.Player("iframe-wrapper", {
      videoId: document.activeElement.getAttribute("data-youtube-id"),
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    let tt = function () {
      youtube_time = setInterval(function () {
        if (youtube_player.getDuration() && youtube_player.getCurrentTime()) {
          let t =
            youtube_player.getDuration() - youtube_player.getCurrentTime();

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
        }
      }, 1000);
    };
    let t;

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        youtube_status = "playing";
        bottom_bar("<img src='assets/icons/23EF.svg'>", toTime(t), "");
        tt();
        // screenlock("lock");
      }

      if (event.data == YT.PlayerState.PAUSED) {
        youtube_status = "paused";
        clearInterval(youtube_time);
        // screenlock("unlock");
      }
    }

    function onPlayerReady(event) {
      event.target.playVideo();
      document.querySelector(".loading-spinner").style.display = "none";
    }

    return;
  }
}

/////////////////
//show article list
//////////////////
let show_article_list = function () {
  llazyload();

  imageSizeReduce();
  //https://github.com/ApoorvSaxena/lozad.js
  observer.observe();

  document.querySelector("div#video-player").style.display = "none";
  document.getElementById("audio-player").style.display = "none";

  document.querySelector("div#youtube-player").style.display = "none";
  document.getElementById("progress-bar").style.display = "none";
  document.querySelector("div#settings").style.display = "none";
  document.querySelector("div#options").style.display = "none";

  document.querySelector("div#news-feed div#news-feed-list").style.overflow =
    "hidden";

  document.querySelector("div#news-feed div#news-feed-list").style.top = "40px";
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

  let htmlStr =
    "<p class='item info width-100 justify-content-spacebetween'>you can define the downloads of the episodes/articles of a channel, click on the corresponding title and change the value. the entries are saved automatically and are valid the next time the app is started.<br><br> The red titles could not be downloaded <br> <br></p>";

  console.log(
    document.querySelectorAll("div#feed-download-list-box p.item").length
  );
  if (
    document.querySelectorAll("div#feed-download-list-box p.item").length == 0
  ) {
    document
      .querySelector("div#feed-download-list-box")
      .insertAdjacentHTML("beforeend", htmlStr);
  }

  document
    .querySelectorAll("div#feed-download-list-box .item")
    .forEach(function (i, e) {
      i.setAttribute("tabIndex", e);
    });

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
load_settings();

let show_settings = function () {
  status.active_element_id = document.activeElement.getAttribute("data-id");

  status.window_status = "settings";

  bottom_bar("", "", "");
  load_settings();

  document.querySelectorAll("div#settings .item").forEach(function (e, index) {
    if (e.style.display != "none") {
      e.setAttribute("tabindex", index);
    }
  });

  tab_index = 0;
  document.getElementById("top-bar").style.display = "none";

  document.getElementById("settings").style.display = "block";
  document.getElementById("settings").children[0].focus();
  document.getElementById("last-update").innerText =
    "last update: " + localStorage.getItem("last-update");

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
    sync();
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
    let k = document
      .querySelector("[data-id='" + status.active_element_id + "']")
      .getAttribute("data-link");
    share(k);
  }

  if (document.activeElement.getAttribute("data-function") == "audio-player") {
    if (status.active_audio_element_id != "") open_player(true);
  }

  if (document.activeElement.getAttribute("data-function") == "volume") {
    volume_control();
  }

  if (document.activeElement.getAttribute("data-function") == "open-url") {
    window.open(document.activeElement.getAttribute("data-url"));
  }
};

//linkfy menu
let links = [];
function detectURLs() {
  status.linkfy = false;
  links.length = 0;
  let message = document.activeElement.querySelector(".summary").textContent;

  let l =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  // let f = message.match(l);
  if (message != null) {
    let f = document.activeElement.querySelector(".summary");
    f.querySelectorAll("a").forEach(function (e, i) {
      links.push({ url: e.getAttribute("href"), index: i });
    });

    if (links.length > 0) {
      status.linkfy = true;
    } else {
      status.linkfy = false;
    }
  }

  console.log(status.linkfy);
}

const open_linkfy = () => {
  tab_index = 0;
  status.window_status = "link-list";
  var template = document.getElementById("link-list-template").innerHTML;
  var rendered = Mustache.render(template, {
    data: links,
  });
  document.querySelector("#link-list").innerHTML = rendered;
  document.querySelector("#link-list").style.display = "block";
  setTimeout(function () {
    document.querySelectorAll("#link-list button")[0].focus();
  }, 1000);
};

//video-player view

function reset_animation() {
  var el = document.getElementById("audio-title");
  el.style.animation = "none";
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null;
}

let open_video_player = function () {
  document.getElementById("video-player").style.display = "block";
  status.window_status = "video";
  video.src = document.activeElement.getAttribute("data-video-url");
};

let open_player = function (reopen) {
  //clear background image and title
  top_bar("", "", "");
  bottom_bar("<img src='assets/icons/23EF.svg'>", "", "");

  reset_animation();
  try {
    document.getElementById("image").style.backgroundImage ==
      document.activeElement.getAttribute("data-image");
  } catch (e) {
    document.getElementById("image").style.backgroundImage =
      "url('/assets/image/fallback.png')";
  }

  document.getElementById("audio-title").innerText = "";
  document.getElementById("audio-player").style.display = "block";
  status.window_status = "audio-player";
  document.getElementById("options").style.display = "none";

  if (!reopen) {
    status.active_element_id = document.activeElement.getAttribute("data-id");
    status.active_audio_element_id = status.active_element_id;
  }

  let w = content_arr.filter(function (i) {
    if (i.cid == status.active_audio_element_id) {
      return i;
    }
  });

  setTimeout(function () {
    document.getElementById("audio-title").innerText = w[0].title;

    if (w[0].image != "") {
      document.getElementById("image").style.backgroundImage =
        "url(" + w[0].image + ")";
    }
  }, 500);
};

//sync

if ("b2g" in Navigator) {
  try {
    navigator.serviceWorker
      .register(new URL("sw.js", import.meta.url), {
        type: "module",
        scope: "/",
      })
      .then((registration) => {
        registration.systemMessageManager.subscribe("alarm").then(
          (rv) => {
            console.log(
              'Successfully subscribe system messages of name "alarm".'
            );
          },
          (error) => {
            console.log("Fail to subscribe system message, error: " + error);
          }
        );
        registration.systemMessageManager.subscribe("activity").then(
          (rv) => {},
          (error) => {}
        );
      });
  } catch (e) {
    console.log(e);
  }
}

let add_alarm = function (date, message_text, id) {
  // KaiOs  2.xx
  if ("mozAlarms" in navigator) {
    // This is arbitrary data pass to the alarm
    var data = {
      note: message_text,
      event_id: id,
    };

    var request = navigator.mozAlarms.add(date, "honorTimezone", data);

    request.onsuccess = function (e) {
      // notify("alarm set", data.note, false, false);
      localStorage.setItem("next-update", data.note);
    };

    request.onerror = function () {
      console.log("An error occurred: " + this.error.name);
    };
  }

  // KaiOs  3.xx
  if ("b2g" in navigator) {
    try {
      let options = {
        date: date,
        data: { note: message_text },
        ignoreTimezone: false,
      };

      navigator.b2g.alarmManager.add(options).then(
        (id) => console.log("add id: " + id),
        (err) => console.log("add err: " + err)
      );
    } catch (e) {
      console.log(e);
    }
  }
};

let remove_alarm = function () {
  // KaiOs  2.xx

  try {
    let request = navigator.mozAlarms.getAll();

    request.onsuccess = function () {
      this.result.forEach(function (alarm) {
        let r = navigator.mozAlarms.remove(alarm.id);

        r.onsuccess = function () {
          console.log("removed");
        };

        r.onerror = function () {
          console.log("An error occurred: " + this.error.name);
        };
      });
    };

    request.onerror = function () {
      console.log("An error occurred:", this.error.name);
    };
  } catch (e) {}

  // KaiOs  3.xx
  if ("b2g" in navigator) {
    try {
      let request = navigator.b2g.alarmManager.getAll();
      request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          if (id == "all") {
            let req = navigator.b2g.alarmManager.remove(alarm.id);

            req.onsuccess = function () {
              console.log("removed");
            };

            req.onerror = function () {
              console.log("An error occurred: " + this.error.name);
            };
          } else {
            if (alarm.data.event_id == id) {
              let req = navigator.b2g.alarmManager.remove(alarm.id);

              req.onsuccess = function () {
                console.log("removed");
              };

              req.onerror = function () {
                console.log("An error occurred: " + this.error.name);
              };
            } else {
              console.log("no alarm founded");
            }
          }
        });
      };
    } catch (e) {
      console.log(e);
    }
  }
};

//sync KaiOS 2.x

try {
  if ("mozAlarms" in navigator) {
    //set alarm
    let m = function () {
      if (localStorage.getItem("interval") == "never") return false;

      var d = new Date();
      d.setMinutes(d.getMinutes() + Number(localStorage.getItem("interval")));
      add_alarm(d, d, uuidv4());

      sync();
    };

    //reset alarm
    navigator.mozSetMessageHandler("alarm", function (message) {
      remove_alarm();
      const isVisible = document.hidden ? false : true;
      const audioPlaying = isAnyAudioPlaying() ? false : tue;

      if (navigator.onLine && isVisible == false && audioPlaying == false) m();
    });

    //start sync loop

    if (
      navigator.mozHasPendingMessage("alarm") == false &&
      localStorage.getItem("interval") != "never" &&
      localStorage.getItem("interval") != null
    ) {
      let d = new Date();
      let f = Number(localStorage.getItem("interval"));
      d.setMinutes(d.getMinutes() + f);

      let request = navigator.mozAlarms.getAll();
      let action = true;

      request.onsuccess = function () {
        this.result.forEach(function (alarm) {
          //alert("alarm: " + alarm.date);
          if (dayjs(alarm.date).isAfter(dayjs()) == true && action == true) {
            action = false;
          }
        });
        //no alarm in the future set alarm
        if (action == true) {
          add_alarm(d, d, uuidv4());
        }
      };
    }
  }
} catch (e) {
  console.log(e);
}

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
});

let select_box = [];

let list_files_callback = function (filename) {
  select_box.push({ filename: filename });
  renderSB(select_box);
};
setTimeout(() => {
  list_files("opml", list_files_callback);
}, 1500);

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
      let k = document
        .querySelector("[data-id='" + status.active_element_id + "']")
        .getAttribute("data-link");
      share(k);
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
      sync();
      break;
  }
}

///////////////
////SHORTPRESS
//////////////

function shortpress_action(param) {
  switch (param.key) {
    case "0":
      share(document.activeElement.getAttribute("data-url"));
      break;
    case "2":
      channel_navigation("up");
      if (status.window_status == "single-article") {
        if (!document.activeElement.previousElementSibling) return false;

        show_article_list();
        document.querySelector("body").style.filter = "blur(40px)";

        setTimeout(() => {
          document.activeElement.previousElementSibling.focus();
          document.querySelector("body").style.filter = "blur(0px)";

          show_article();
        }, 300);
      }
      break;
    case "5":
      channel_navigation("down");
      if (status.window_status == "single-article") {
        if (!document.activeElement.nextElementSibling) return false;
        show_article_list();
        document.querySelector("body").style.filter = "blur(40px)";
        setTimeout(() => {
          document.activeElement.nextElementSibling.focus();
          show_article();
          document.querySelector("body").style.filter = "blur(0px)";
        }, 300);
      }
      break;

    case "1":
      mark_as_read(false);
      break;

    case "3":
      sleep_mode();
      break;

    case "4":
      break;

    case "8":
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

      if (
        status.window_status == "options" ||
        status.window_status == "link-list"
      ) {
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

      if (
        document.activeElement.getAttribute("data-function") ==
        "mastodon-connect"
      ) {
        let m = document.getElementById("mastodon-server").value;
        if (m != "" && isValidUrl(m)) {
          let url =
            m +
            "/oauth/authorize?client_id=" +
            cred.clientId +
            "&scope=read&redirect_uri=" +
            cred.redirect +
            "&response_type=code";
          window.open(url);
        } else {
          side_toaster("ups, wrong url", 2000);
        }
      }

      if (
        document.activeElement.getAttribute("data-function") ==
        "mastodon-disconnect"
      ) {
        document.getElementById("mastodon-server").value = "";
        localStorage.removeItem("mastodon_server");
        localStorage.removeItem("oauth_auth");
        document.querySelector("input#mastodon-server").readOnly = false;
        document.querySelector("[data-function='mastodon-disconnect']").value =
          "connect";
        document.querySelector("#mastodon-label").innerText = "-";
        side_toaster("account removed", 3000);
        document.activeElement.setAttribute("data-function") ==
          "mastodon-connect";
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

      if (status.window_status == "link-list") {
        nav("+1");
        break;
      }

      if (status.window_status == "select-box") {
        nav("+1");
        break;
      }
      if (status.window_status == "volume") {
        navigator.volumeManager.requestVolumeDown();

        break;
      }

      break;

    case "ArrowUp":
      if (status.window_status == "link-list") {
        nav("-1");
        break;
      }

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
      if (status.window_status == "volume") {
        navigator.volumeManager.requestVolumeUp();
        break;
      }

      break;

    case "*":
      if (status.active_audio_element_id != "") open_player(true);
      break;

    case "#":
      volume_control();
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
        document.activeElement.getAttribute("data-media") == "audio"
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
        if (status.linkfy == true) open_linkfy();
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
      break;

    case "9":
      break;

    case "Backspace":
      if (status.window_status == "intro") {
        bottom_bar("", "", "");
        break;
      }

      if (status.window_status == "link-list") {
        document.querySelector("div#link-list").style.display = "none";
        status.window_status = "single-article";

        document
          .querySelector("[data-id ='" + status.active_element_id + "']")
          .focus();
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
        clearInterval(youtube_time);
        setTimeout(() => {
          show_article_list();
        }, 1000);

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
        open_options();
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

    if (evt.key == "Backspace" && status.window_status == "article-list")
      window.close();

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
  //evt.preventDefault();

  if (evt.key == "Backspace") {
    if (status.audio_status != "play" && status.window_status == "article-list")
      window.close();
    if (status.audio_status == "play") evt.preventDefault();
  }

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

if (debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      "Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber
    );
    return true;
  };
}

if ("b2g" in Navigator) {
  try {
    navigator.serviceWorker
      .register(new URL("sw.js", import.meta.url), {
        type: "module",
        scope: "/",
      })
      .then((registration) => {
        registration.systemMessageManager.subscribe("alarm").then(
          (rv) => {
            console.log(
              'Successfully subscribe system messages of name "alarm".'
            );
          },
          (error) => {
            console.log("Fail to subscribe system message, error: " + error);
          }
        );
        registration.systemMessageManager.subscribe("activity").then(
          (rv) => {},
          (error) => {}
        );
      });
  } catch (e) {
    console.log(e);
  }
}

const channel = new BroadcastChannel("sw-messages");
channel.addEventListener("message", (event) => {
  //callback from  OAuth
  //ugly method to open a new window, because a window from sw clients.open can no longer be closed
  const l = event.data.oauth_success;
  if (event.data.oauth_success) {
    setTimeout(() => {
      window.open(l);
    }, 5000);
  }

  if (event.data.oauthsuccess) {
    loadMastodon();
  }
});
