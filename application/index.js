"use strict";

import {
  bottom_bar,
  side_toaster,
  load_ads,
  top_bar,
  getManifest,
  validate_url,
  pick_file,
  list_files,
} from "./assets/js/helper.js";
import { mastodon_account_info } from "./assets/js/mastodon.js";

import localforage from "localforage";
import { detectMobileOS } from "./assets/js/helper.js";
import m from "mithril";
import { v4 as uuidv4 } from "uuid";
import * as sanitizeHtml from "sanitize-html";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import swiped from "swiped-events";

import fxparser from "fast-xml-parser";

// Extend dayjs with the duration plugin
dayjs.extend(duration);

const parser = new fxparser.XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
});

//github.com/laurentpayot/minidenticons#usage
export let status = {
  visibility: true,
  deviceOnline: true,
  notKaiOS: window.innerWidth > 300 ? true : false,
  os: detectMobileOS(),
  debug: true,
  local_opml: [],
};

let current_article = "";
const proxy = "https://corsproxy.io/?";

let default_settings = {
  "opml_url":
    "https://raw.githubusercontent.com/strukturart/feedolin/master/example.opml",
  "opml_local": "",
  "proxy_url": "https://corsproxy.io/?",
};

export let settings = {};
let channels = [];
let read_articles = [];
// Load the array from localForage (on app startup)
localforage
  .getItem("read_articles")
  .then((value) => {
    if (value === null) {
      // Item does not exist, initialize it as an empty array
      read_articles = [];
      return localforage.setItem("read_articles", read_articles).then(() => {});
    } else {
      read_articles = value;
    }
  })
  .catch((err) => {
    console.error("Error accessing localForage:", err);
  });

function add_read_article(id) {
  // Add the article to the global array
  let ids = [];
  articles.map((h, i) => {
    ids.push(h.id);
  });

  //clean
  read_articles = read_articles.filter((article) => ids.includes(id));

  read_articles.push(id);

  // Sync the updated array with localForage
  localforage
    .setItem("read_articles", read_articles)
    .then(() => {})
    .catch((err) => {
      console.error("Error updating localForage:", err);
    });
}

let xml_parser = new DOMParser();

let feed_download_list = [];

if ("b2g" in navigator || "navigator.mozApps" in navigator)
  status.notKaiOS = false;

if (!status.notKaiOS) {
  const scripts = [
    "http://127.0.0.1/api/v1/shared/core.js",
    "http://127.0.0.1/api/v1/shared/session.js",
    "http://127.0.0.1/api/v1/apps/service.js",
    "http://127.0.0.1/api/v1/audiovolumemanager/service.js",
    "./assets/js/kaiads.v5.min.js",
  ];

  scripts.forEach((src) => {
    const js = document.createElement("script");
    js.type = "text/javascript";
    js.src = src;
    document.head.appendChild(js);
  });
}

let articles = [];
const channel = new BroadcastChannel("sw-messages");

if (status.debug) {
  window.onerror = function (msg, url, linenumber) {
    alert(
      "Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber
    );
    return true;
  };
}

let mastodon_connect = () => {
  localforage.getItem("settings").then(function (value) {
    settings = value;

    var currentUrl = window.location.href;
    const params = new URLSearchParams(currentUrl.split("?")[1]);
    const code = params.get("code");
    if (!code) return false;

    let result = code.split("#")[0];
    if (code) {
      localforage.setItem("mastodon_code", result);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("code", result);
      urlencoded.append("scope", "read");

      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("redirect_uri", process.env.redirect);
      urlencoded.append("client_id", process.env.clientId);
      urlencoded.append("client_secret", process.env.clientSecret);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(settings.mastodon_server_url + "/oauth/token", requestOptions)
        .then((response) => response.json()) // Parse the JSON once
        .then((data) => {
          console.log(data); // Log the parsed data

          settings.mastodon_token = data.access_token; // Access the token
          localforage.setItem("settings", settings);
          m.route.set("/start?index=0");

          side_toaster("Successfully connected", 10000);
        })
        .catch((error) => {
          console.error("Error:", error);
          side_toaster("Connection failed");
        });
    }
  });
};

//open KaiOS app
let app_launcher = () => {
  var currentUrl = window.location.href;

  // Check if the URL includes 'id='
  if (!currentUrl.includes("code=")) return false;

  const params = new URLSearchParams(currentUrl.split("?")[1]);
  const code = params.get("code");
  if (!code) return false;

  let result = code.split("#")[0];

  setTimeout(() => {
    try {
      const activity = new MozActivity({
        name: "feedolin",
        data: result,
      });
      activity.onsuccess = function () {
        console.log("Activity successfuly handled");
      };

      activity.onerror = function () {
        console.log("The activity encouter en error: " + this.error);
        alert(this.error);
      };
    } catch (e) {}
    if ("b2g" in navigator) {
      try {
        let activity = new WebActivity("feedolin", {
          name: "feedolin",
          type: "string",
          data: result,
        });
        activity.start().then(
          (rv) => {
            window.close();

            console.log("Results passed back from activity handler:");
            console.log(rv);
          },
          (err) => {
            alert(err);
          }
        );
      } catch (e) {}
    }
  }, 4000);
};
app_launcher();

function stringToHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char; // Bitwise shift
    hash |= 0; // Convert to 32-bit integer
  }
  return hash.toString(36); // Convert to base-36 for a shorter result
}

//test if device online
let checkOnlineStatus = () => {
  return fetch("https://www.google.com", {
    method: "HEAD",
    mode: "no-cors",
  })
    .then(() => true)
    .catch(() => false);
};

//media check
let check_media = (h) => {
  const hasAudio =
    h.enclosure &&
    h.enclosure["@_type"] &&
    h.enclosure["@_type"].includes("audio");

  const hasVideo =
    h.enclosure &&
    h.enclosure["@_type"] &&
    h.enclosure["@_type"].includes("video");

  if (hasAudio) {
    return "audio";
  } else if (hasVideo) {
    return "video";
  } else {
    return "text";
  }
};

//clean input
let clean = (i) => {
  return sanitizeHtml(i, {
    allowedTags: ["b", "i", "em", "strong", "a", "img", "src"],
    allowedAttributes: {
      "a": ["href"],
      "img": ["src"],
    },
  });
};

const fetchOPML = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache", // prevents caching if you want fresh data
      redirect: "follow", // follow redirects automatically
    });
    if (!response.ok) {
      alert(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    load_feeds(data); // Process the content (newly fetched data)
  } catch (error) {
    alert("Error fetching the OPML file:", error);
    m.route.set("/start/?index=0");
  }
};

const load_feeds = async (data) => {
  if (data) {
    let downloadList;
    const downloadListData = generateDownloadList(data); // Capture the returned list
    if (downloadListData.error) {
      side_toaster(downloadListData.error, 3000);
      return false;
    } else {
      downloadList = downloadListData.downloadList;
    }

    if (downloadList.length > 0) {
      // Fetch content for the feeds
      try {
        await fetchContent(downloadList);
        settings.last_update = new Date();
        localforage.setItem("settings", settings);
        m.route.set("/start/?index=0");
        //cache data
        localforage
          .setItem("articles", articles)
          .then(() => {})
          .catch((err) => {
            console.error("Feeds cached", err);
          });
      } catch (error) {}
    } else {
      alert("Generated download list is empty.");
    }
  } else {
    console.error("No OPML content found.");
  }
};

const generateDownloadList = (data) => {
  // Parse the OPML data
  const xmlDoc = xml_parser.parseFromString(data, "text/xml");

  // Check if the OPML file is valid
  if (!xmlDoc || xmlDoc.getElementsByTagName("parsererror").length > 0) {
    console.error("Invalid OPML data.");
    return { error: "Invalid OPML data", downloadList: [] };
  }

  const content = xmlDoc.querySelector("body");

  if (!content) {
    console.error("No 'body' element found in the OPML data.");
    return { error: "No 'body' element found", downloadList: [] };
  }

  let index = 0;
  const outlines = content.querySelectorAll("outline");
  const downloadList = [];

  outlines.forEach((outline) => {
    const nestedOutlines = outline.querySelectorAll("outline");

    nestedOutlines.forEach((nested) => {
      const url = nested.getAttribute("xmlUrl");
      if (!url) return; // Skip if no url attribute

      // Add feed to the download list
      downloadList.push({
        error: "",
        title: nested.getAttribute("title") || "Untitled",
        url: url,
        amount: 5,
        index: index++,
        channel: outline.getAttribute("text") || "Unknown",
        type: nested.getAttribute("type") || "rss",
      });
    });
  });

  return { error: "", downloadList }; // Return the generated list with no error
};

const fetchContent = async (feed_download_list) => {
  for (let e of feed_download_list) {
    if (e.type === "mastodon") {
      try {
        const response = await fetch(e.url);
        const data = await response.json();

        data.forEach((k, i) => {
          if (i > 5) return;

          let f = {
            channel: e.channel,
            id: k.id,
            type: "mastodon",
            pubDate: k.created_at,
            isoDate: k.created_at,
            title: k.account.display_name,
            content: k.content,
            url: k.uri,
          };

          if (k.media_attachments.length > 0) {
            if (k.media_attachments[0].type === "image") {
              f.content += `<br><img src='${k.media_attachments[0].preview_url}'>`;
            } else if (k.media_attachments[0].type === "video") {
              f.enclosure = {
                "@_type": "video",
                url: k.media_attachments[0].url,
              };
            } else if (k.media_attachments[0].type === "audio") {
              f.enclosure = {
                "@_type": "audio",
                url: k.media_attachments[0].url,
              };
            }
          }

          articles.push(f);
          articles.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
        });
      } catch (error) {
        e.error = error;
      }
    } else {
      let xhr = new XMLHttpRequest();

      xhr.open("GET", proxy + e.url, true);

      xhr.send();

      xhr.onload = function () {
        if (xhr.status != 200) {
          e.error = xhr.status;
          return;
        }

        let data = xhr.response;
        if (!data) e.error = xhr.status;

        let jObj = parser.parse(data);
        //ATOM
        if (jObj.feed)
          jObj.feed.entry.map((f, i) => {
            if (i < 15) {
              try {
                f.channel = e.channel;
                f.id = stringToHash(f.title + f.published);
                if (f["yt:videoId"]) f.type = "youtube";
                if (!f["yt:videoId"]) f.type = "text";

                f.url = f.link["@_href"];
                f.feed_title = e.title;
                f.isoDate = dayjs(f.published).toISOString();

                f.content = f.content || f.summary;
                if (typeof f.content === "object" && f.content["#text"]) {
                  f.content = f.content["#text"];
                }

                //youtube
                if (f["media:group"]) {
                  f.cover = f["media:group"]["media:thumbnail"]["@_url"];
                  f.content = f["media:group"]["media:description"];
                }

                if (f["media:thumbnail"]) {
                  f.cover = f["media:thumbnail"]["@_url"];
                }

                articles.push(f);
                articles.sort(
                  (a, b) => new Date(b.isoDate) - new Date(a.isoDate)
                );
              } catch (e) {
                console.log(e);
              }
            }
          });

        //RSS
        if (jObj.rss)
          jObj.rss.channel.item.map((f, i) => {
            if (i < 15) {
              try {
                f.channel = e.channel;
                f.id = stringToHash(f.title + f.pubDate);
                f.type = check_media(f);
                f.url = f.link;
                f.feed_title = e.title;
                f.isoDate = dayjs(f.pubDate).toISOString();

                f.content = f.content || f.description;
                if (f["itunes:image"]) {
                  f.cover = f["itunes:image"]["@_href"];
                }

                if (jObj.rss.channel.image) {
                  f.cover = jObj.rss.channel.image.url || "";
                }

                articles.push(f);
                articles.sort(
                  (a, b) => new Date(b.isoDate) - new Date(a.isoDate)
                );
              } catch (e) {
                console.log(e);
              }
            }
          });
      };

      xhr.onprogress = function (event) {};

      xhr.onerror = function () {};
    }
  }
};

let load_mastodon = () => {
  let accessToken = settings.mastodon_token;

  let url = settings.mastodon_server_url + "/api/v1/timelines/home";

  fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((k, i) => {
        if (i > 15) return;
        let f = {
          channel: "Mastodon",
          id: k.id,
          type: "mastodon",
          pubDate: k.created_at,
          isoDate: k.created_at,
          title: k.account.display_name,
          content: k.content,
          url: k.uri,
        };

        if (k.media_attachments.length > 0) {
          if (k.media_attachments[0].type === "image") {
            f.content += `<br><img src='${k.media_attachments[0].preview_url}'>`;
          } else if (k.media_attachments[0].type === "video") {
            f.enclosure = {
              "@_type": "video",
              url: k.media_attachments[0].url,
            };
          } else if (k.media_attachments[0].type === "audio") {
            f.enclosure = {
              "@_type": "audio",
              url: k.media_attachments[0].url,
            };
          }
        }

        articles.push(f);
        articles.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
      });
      channels.push("Mastodon");
    });
};

let start_loading = () => {
  fetchOPML(proxy + settings.opml_url);
  if (settings.opml_local) {
    load_feeds(settings.opml_local);
  }
  //load mastodon
  if (settings.mastodon_token) {
    mastodon_account_info(
      settings.mastodon_server_url,
      settings.mastodon_token
    ).then((f) => {
      status.mastodon_logged = f.display_name;
      load_mastodon();
    });
  }
};

localforage
  .getItem("settings")
  .then(function (value) {
    if (value == null) {
      settings = default_settings;
      localforage
        .setItem("settings", settings)
        .then(function (value) {
          // Do other things once the value has been saved.
        })
        .catch(function (err) {
          // This code runs if there were any errors
          console.log(err);
        });
    }
    settings = value;

    checkOnlineStatus().then((isOnline) => {
      if (isOnline) {
        start_loading();
      } else {
        localforage
          .getItem("articles")
          .then((value) => {
            articles = value;
            m.route.set("/start/");
            side_toaster("Device is offline, cached feeds loaded", 15000);
          })
          .catch((err) => {});
      }
    });
  })
  .catch(function (err) {
    // This code runs if there were any errors
    side_toaster("The default settings was loaded", 3000);
    settings = default_settings;
    fetchOPML(proxy + settings.opml_url);
    console.log(settings);

    localforage
      .setItem("settings", settings)
      .then(function (value) {
        // Do other things once the value has been saved.
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  });

var root = document.getElementById("app");

var options = {
  view: function () {
    return m(
      "div",
      {
        id: "optionsView",
        class: "flex",
        oncreate: () => {
          top_bar("", "", "");

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/icons/back.svg'>");

          bottom_bar(
            "",
            "<img class='not-desktop' src='assets/icons/select.svg'>",
            ""
          );

          if (status.notKaiOS) bottom_bar("", "", "");
        },
      },
      [
        m(
          "button",
          {
            tabindex: 0,

            class: "item",
            oncreate: ({ dom }) => {
              dom.focus();
            },
            onclick: () => {
              m.route.set("/about");
            },
          },
          "About"
        ),
        m(
          "button",
          {
            tabindex: 1,

            class: "item",
            onclick: () => {
              m.route.set("/settingsView");
            },
          },
          "Settings"
        ),

        m(
          "button",
          {
            tabindex: 2,

            class: "item",
            onclick: () => {
              m.route.set("/privacy_policy");
            },
          },
          "Privacy Policy"
        ),
        m("div", {
          id: "KaiOSads-Wrapper",
          class: "",

          oncreate: () => {
            if (status.notKaiOS == false) load_ads();
          },
        }),
      ]
    );
  },
};

let counter = -1;
let channel_filter = "";

var start = {
  oninit: function () {
    const entries = window.performance.getEntriesByType("navigation");

    articles.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

    if (entries.length && entries[0].type === "reload") {
      m.route.set("/start"); // Redirect to intro page
    }

    // Calculate index once and store it
    this.index = m.route.param("index") || 0;
    articles.forEach((e) => {
      if (channels.indexOf(e.channel) === -1 && e.channel) {
        channels.push(e.channel);
      }
    });
  },

  view: function () {
    return m(
      "div",
      {
        id: "start",
        oncreate: () => {
          bottom_bar(
            "",
            "<img src='assets/icons/select.svg'>",
            "<img src='assets/icons/option.svg'>"
          );

          if (status.notKaiOS)
            bottom_bar("", "", "<img src='assets/icons/option.svg'>");

          if (settings.opml_url == "")
            side_toaster(
              "The feed could not be loaded because no OPML was defined in the settings.",
              6000
            );
          if (status.notKaiOS) top_bar("", "", "");

          if (status.notKaiOS && status.player)
            top_bar("<img src='assets/icons/play.svg'>", "", "");
        },
      },
      m("span", { class: "channel", oncreate: () => {} }, channel_filter),

      articles.map((h, i) => {
        if (channel_filter !== "" && channel_filter !== h.channel) {
          return;
        }
        const index = this.index;

        const readClass = read_articles.includes(h.id) ? "read" : "";

        return m(
          "article",
          {
            class: `item  ${readClass}`,
            "data-id": h.id,
            "data-type": h.type,
            oncreate: (vnode) => {
              if (i == index) vnode.dom.focus();

              document.querySelectorAll(".item").forEach((e, k) => {
                e.setAttribute("tabindex", k);
              });
            },
            onclick: () => {
              m.route.set("/article/?index=" + i);
              add_read_article(h.id);
            },
            onkeydown: (e) => {
              if (e.key === "Enter") {
                m.route.set("/article/?index=" + i);
                add_read_article(h.id);
              }
            },
          },
          [
            m("span", { class: "type-indicator" }, h.type),
            m("time", dayjs(h.pubDate).format("DD MMM YYYY")),
            m("h2", clean(h.feed_title)),
            m("h3", clean(h.title)),
          ]
        );
      })
    );
  },
};

var article = {
  view: function () {
    return m(
      "div",
      {
        id: "article",
        oncreate: () => {
          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/icons/back.svg'>");
          bottom_bar("<img src='assets/icons/link.svg'>", "", "");
        },
      },
      articles.map((h, i) => {
        var index = m.route.param("index");
        if (index != i) return;

        current_article = h;

        return m(
          "article",
          {
            class: "item",
            tabindex: 0, // Make the article focusable

            oncreate: (vnode) => {
              vnode.dom.focus();
              console.log(h);
              scrollToTop();

              if (h.type == "audio") {
                h.type = "audio";
                bottom_bar(
                  "<img src='assets/icons/link.svg'>",
                  "<img src='assets/icons/play.svg'>",
                  ""
                );
              }

              if (h.type == "video") {
                h.type = "video";
                bottom_bar(
                  "<img src='assets/icons/link.svg'>",
                  "<img src='assets/icons/play.svg'>",
                  ""
                );
              }
            },

            onkeydown: (e) => {
              if (e.key === "Backspace") {
                m.route.set("/start/?index=" + index);
              }
            },
          },
          [
            m("time", dayjs(h.pubDate).format("DD MMM YYYY")),
            m("h2", h.title),
            m("div", { class: "text" }, [m.trust(clean(h.content))]),
          ]
        );
      })
    );
  },
};

var index = {
  view: function () {
    return m(
      "div",
      {
        class: "flex",
        id: "index",
        oncreate: () => {
          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/icons/back.svg'>");
          bottom_bar("", "", "");
        },
      },
      feed_download_list.map((h, i) => {
        return m(
          "article",
          {
            class: "item flex width-100",
            tabindex: i,
            oncreate: (vnode) => {
              if (i == 0) vnode.dom.focus();
            },
          },
          [
            m("span", h.channel),
            m("span", h.title),
            h.error ? m("span", "error") : null,
          ]
        );
      })
    );
  },
};

//KaiOS 3
var localOPML = {
  view: function () {
    return m(
      "div",
      {
        class: "flex",
        id: "index",
        oncreate: () => {
          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/icons/back.svg'>");
          bottom_bar("", "", "");
        },
      },
      status.local_opml.map((h, i) => {
        let filename = h.split("/");
        filename = filename[filename.length - 1];

        return m(
          "button",
          {
            class: "item flex width-100",
            tabindex: i,
            oncreate: (vnode) => {
              if (i == 0) vnode.dom.focus();
            },
            onclick: () => {
              try {
                let sdcard = navigator.b2g.getDeviceStorage("sdcard");
                let request = sdcard.get(h);
                request.onsuccess = function () {
                  const reader = new FileReader();

                  reader.onload = () => {
                    const downloadListData = generateDownloadList(
                      reader.result
                    );
                    if (downloadListData.error) {
                      side_toaster("OPML file not valid", 4000);
                    } else {
                      settings.opml_local = reader.result;
                      settings.opml_local_filename = data.filename;
                      localforage.setItem("settings", settings).then(() => {
                        side_toaster("OPML file added", 4000);
                      });
                    }
                  };

                  reader.onerror = () => {
                    side_toaster("OPML file not valid", 4000);
                  };

                  reader.readAsText(this.result);
                };
                request.onerror = function (error) {
                  alert(error);
                };
              } catch (e) {
                alert(e);
              }
            },
          },
          filename
        );
      })
    );
  },
};

var intro = {
  view: function () {
    return m(
      "div",
      {
        class: "width-100 height-100",
        id: "intro",
        oninit: () => {
          //check if is a mastodon redirect
          mastodon_connect();
        },
        onremove: () => {
          localStorage.setItem("version", status.version);
          document.querySelector(".loading-spinner").style.display = "none";
        },
      },
      [
        m("img", {
          src: "./assets/icons/intro.svg",

          oncreate: () => {
            document.querySelector(".loading-spinner").style.display = "block";
            let get_manifest_callback = (e) => {
              try {
                status.version = e.manifest.version;
                document.querySelector("#version").textContent =
                  e.manifest.version;
              } catch (e) {}

              if ("b2g" in navigator || status.notKaiOS) {
                fetch("/manifest.webmanifest")
                  .then((r) => r.json())
                  .then((parsedResponse) => {
                    status.version = parsedResponse.b2g_features.version;
                  });
              }
            };
            getManifest(get_manifest_callback);
          },
        }),
        m(
          "div",
          {
            class: "flex width-100  justify-content-center ",
            id: "version-box",
          },
          [
            m(
              "kbd",
              {
                id: "version",
              },
              localStorage.getItem("version") || 0
            ),
          ]
        ),
      ]
    );
  },
};

// Format time using dayjs
const formatTime = (seconds) => {
  return dayjs.duration(seconds, "seconds").format("mm:ss");
};

// VideoPlayerView definition
const VideoPlayerView = {
  videoElement: null, // Store video element
  videoDuration: 0, // Store video duration
  currentTime: 0, // Store current time of the video
  isPlaying: false, // Track play state
  seekAmount: 5, // Seek by 5 seconds

  oncreate: ({ attrs }) => {
    if (status.notKaiOS) top_bar("", "", "<img src='assets/icons/back.svg'>");
    // Mount the video element to the DOM when the component is created
    VideoPlayerView.videoElement = document.createElement("video");
    const videoContainer = document.getElementById("video-container");
    videoContainer.appendChild(VideoPlayerView.videoElement);

    // Load the video URL from the route parameter
    const videoUrl = attrs.url;
    if (videoUrl) {
      VideoPlayerView.videoElement.src = videoUrl;
      VideoPlayerView.videoElement.play();
      VideoPlayerView.isPlaying = true;
    }

    // Set up an event listener to capture the duration and update progress
    VideoPlayerView.videoElement.onloadedmetadata = () => {
      VideoPlayerView.videoDuration = VideoPlayerView.videoElement.duration;
      m.redraw(); // Force a redraw to update the UI with the duration
    };

    // Update the current time and redraw progress bar as video plays
    VideoPlayerView.videoElement.ontimeupdate = () => {
      VideoPlayerView.currentTime = VideoPlayerView.videoElement.currentTime;
      m.redraw(); // Update UI with the current time and progress
    };

    // Activate local controls with keyboard events
    document.addEventListener("keydown", VideoPlayerView.handleKeydown);
  },

  onremove: () => {
    // Remove the keydown listener when the view is removed
    document.removeEventListener("keydown", VideoPlayerView.handleKeydown);
  },

  handleKeydown: (e) => {
    if (e.key === "Enter") {
      VideoPlayerView.togglePlayPause();
    } else if (e.key === "ArrowLeft") {
      VideoPlayerView.seek("left");
    } else if (e.key === "ArrowRight") {
      VideoPlayerView.seek("right");
    }
  },

  togglePlayPause: () => {
    if (VideoPlayerView.isPlaying) {
      VideoPlayerView.videoElement.pause();
    } else {
      VideoPlayerView.videoElement.play();
    }
    VideoPlayerView.isPlaying = !VideoPlayerView.isPlaying;
  },

  seek: (direction) => {
    const currentTime = VideoPlayerView.videoElement.currentTime;
    if (direction === "left") {
      VideoPlayerView.videoElement.currentTime = Math.max(
        0,
        currentTime - VideoPlayerView.seekAmount
      );
    } else if (direction === "right") {
      VideoPlayerView.videoElement.currentTime = Math.min(
        VideoPlayerView.videoDuration,
        currentTime + VideoPlayerView.seekAmount
      );
    }
  },

  view: ({ attrs }) => {
    // Calculate progress as a percentage
    const progressPercent =
      VideoPlayerView.videoDuration > 0
        ? (VideoPlayerView.currentTime / VideoPlayerView.videoDuration) * 100
        : 0;

    return m("div", { class: "video-player" }, [
      m("div", { id: "video-container", class: "video-container" }), // Video element will be mounted here

      m("div", { class: "video-info" }, [
        ` ${formatTime(VideoPlayerView.currentTime)} / ${formatTime(
          VideoPlayerView.videoDuration
        )}`,
      ]),

      // Progress bar container
      m("div", { class: "progress-bar-container" }, [
        m("div", {
          class: "progress-bar",
          style: { width: `${progressPercent}%` },
        }),
      ]),
    ]);
  },
};

// Define the audio element globally
const globalAudioElement = document.createElement("audio");
globalAudioElement.preload = "auto"; // Load audio automatically
globalAudioElement.mozaudiochannel = "content";

if ("b2g" in navigator) {
  try {
    navigator.b2g.AudioChannelManager.volumeControlChannel = "content";
    AudioChannelClient("content");
    HTMLMediaElement.mozAudioChannelType = "content";
    AudioContext.mozAudioChannelType = "content";
  } catch (e) {
    console.log(e);
  }
}

const AudioPlayerView = {
  audioDuration: 0, // Store audio duration
  currentTime: 0, // Store current time of the audio
  isPlaying: false, // Track play state
  seekAmount: 5, // Seek by 5 seconds

  oninit: ({ attrs }) => {
    // Load the audio URL if it changes
    if (attrs.url && globalAudioElement.src !== attrs.url) {
      globalAudioElement.src = attrs.url;
      globalAudioElement.play().catch(() => {}); // Handle play promise rejection
      AudioPlayerView.isPlaying = true;
    }

    // Set up event listeners
    globalAudioElement.onloadedmetadata = () => {
      AudioPlayerView.audioDuration = globalAudioElement.duration;
      m.redraw(); // Force a redraw to update the UI with the duration
    };

    globalAudioElement.ontimeupdate = () => {
      AudioPlayerView.currentTime = globalAudioElement.currentTime;
      m.redraw(); // Update UI with the current time and progress
    };

    // Restore play/pause state
    AudioPlayerView.isPlaying = !globalAudioElement.paused;

    // Activate local controls with keyboard events
    document.addEventListener("keydown", AudioPlayerView.handleKeydown);
  },

  oncreate: () => {
    status.player = true;

    top_bar("", "", "");
    bottom_bar("", "<img src='assets/icons/play.svg'>", "");

    if (status.notKaiOS) top_bar("", "", "<img src='assets/icons/back.svg'>");

    document
      .querySelector("div.button-center")
      .addEventListener("click", function (event) {
        AudioPlayerView.togglePlayPause();
      });
  },

  onremove: () => {
    // Remove the keydown listener when the view is removed
    document.removeEventListener("keydown", AudioPlayerView.handleKeydown);
  },

  handleKeydown: (e) => {
    if (e.key === "Enter") {
      AudioPlayerView.togglePlayPause();
    } else if (e.key === "ArrowLeft") {
      AudioPlayerView.seek("left");
    } else if (e.key === "ArrowRight") {
      AudioPlayerView.seek("right");
    }
  },

  togglePlayPause: () => {
    if (AudioPlayerView.isPlaying) {
      globalAudioElement.pause();
    } else {
      globalAudioElement.play().catch(() => {}); // Handle play promise rejection
    }
    AudioPlayerView.isPlaying = !AudioPlayerView.isPlaying;
  },

  seek: (direction) => {
    const currentTime = globalAudioElement.currentTime;
    if (direction === "left") {
      globalAudioElement.currentTime = Math.max(
        0,
        currentTime - AudioPlayerView.seekAmount
      );
    } else if (direction === "right") {
      globalAudioElement.currentTime = Math.min(
        AudioPlayerView.audioDuration,
        currentTime + AudioPlayerView.seekAmount
      );
    }
  },

  view: ({ attrs }) => {
    // Calculate progress as a percentage
    const progressPercent =
      AudioPlayerView.audioDuration > 0
        ? (AudioPlayerView.currentTime / AudioPlayerView.audioDuration) * 100
        : 0;

    return m("div", { class: "audio-player" }, [
      m("div", {
        id: "audio-container",
        class: "audio-container",
      }),

      m("div", {
        class: "cover-container",
        style: {
          "background-color": "rgb(121, 71, 255)",
          "background-image": `url(${current_article.cover})`,
        },
      }),
      m("div", { class: "audio-info" }, [
        `${formatTime(AudioPlayerView.currentTime)} / ${formatTime(
          AudioPlayerView.audioDuration
        )}`,
      ]),

      // Progress bar container
      m("div", { class: "progress-bar-container" }, [
        m("div", {
          class: "progress-bar",
          style: { width: `${progressPercent}%` },
        }),
      ]),
    ]);
  },
};

var about = {
  view: function () {
    return m(
      "div",
      { class: "page" },
      m(
        "p",
        "Feedolin is an RSS/Atom reader and podcast player, available for both KaiOS and non-KaiOS users."
      ),
      m(
        "p",
        "It supports connecting a Mastodon account to display articles alongside your RSS/Atom feeds."
      ),
      m(
        "p",
        "The app allows you to listen to audio and watch videos directly if the feed provides the necessary URLs."
      ),
      m(
        "p",
        "The list of subscribed websites and podcasts is managed either locally or via an OPML file from an external source, such as a public link in the cloud."
      ),
      m("p", "For non-KaiOS users, local files must be uploaded to the app."),
      m("h4", { style: "margin-top:20px; margin-bottom:10px;" }, "Navigation:"),
      m("ul", [
        m(
          "li",
          m.trust(
            "Use the <strong>up</strong> and <strong>down</strong> arrow keys to navigate between articles.<br><br>"
          )
        ),
        m(
          "li",
          m.trust(
            "Use the <strong>left</strong> and <strong>right</strong> arrow keys to switch between categories.<br><br>"
          )
        ),
        m(
          "li",
          m.trust(
            "Press <strong>Enter</strong> to view the content of an article.<br><br>"
          )
        ),
        m(
          "li",
          m.trust(
            "Use <strong>Ctrl</strong> and <strong>Alt</strong> to access various options."
          )
        ),
      ])
    );
  },
};

var privacy_policy = {
  view: function () {
    return m("div", { id: "privacy_policy", class: "page" }, [
      m("h1", "Privacy Policy for Feedolin"),
      m(
        "p",
        "Feedolin is committed to protecting your privacy. This policy explains how data is handled within the app."
      ),

      m("h2", "Data Storage and Collection"),
      m("p", [
        "All data related to your RSS/Atom feeds and Mastodon account is stored ",
        m("strong", "locally"),
        " in your device’s browser. Feedolin does ",
        m("strong", "not"),
        " collect or store any data on external servers. The following information is stored locally:",
      ]),
      m("ul", [
        m("li", "Your subscribed RSS/Atom feeds and podcasts."),
        m("li", "OPML files you upload or manage."),
        m("li", "Your Mastodon account information and related data."),
      ]),
      m("p", "No server-side data storage or collection is performed."),

      m("h2", "KaiOS Users"),
      m("p", [
        "If you are using Feedolin on a KaiOS device, the app uses ",
        m("strong", "KaiOS Ads"),
        ", which may collect data related to your usage. The data collected by KaiOS Ads is subject to the ",
        m(
          "a",
          {
            href: "https://www.kaiostech.com/privacy-policy/",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          "KaiOS privacy policy"
        ),
        ".",
      ]),
      m("p", [
        "For users on all other platforms, ",
        m("strong", "no ads"),
        " are used, and no external data collection occurs.",
      ]),

      m("h2", "External Sources Responsibility"),
      m("p", [
        "Feedolin enables you to add feeds and connect to external sources such as RSS/Atom feeds, podcasts, and Mastodon accounts. You are ",
        m("strong", "solely responsible"),
        " for the sources you choose to trust and subscribe to. Feedolin does not verify or control the content or data provided by these external sources.",
      ]),

      m("h2", "Third-Party Services"),
      m(
        "p",
        "Feedolin integrates with third-party services such as Mastodon. These services have their own privacy policies, and you should review them to understand how your data is handled."
      ),

      m("h2", "Policy Updates"),
      m(
        "p",
        "This Privacy Policy may be updated periodically. Any changes will be communicated through updates to the app."
      ),

      m(
        "p",
        "By using Feedolin, you acknowledge and agree to this Privacy Policy."
      ),
    ]);
  },
};

var settingsView = {
  view: function () {
    return m(
      "div",
      {
        class: "flex justify-content-center page",
        id: "settings-page",
        oncreate: () => {
          if (!status.notKaiOS) {
            status.local_opml = [];
            let cbb = (data) => {
              status.local_opml.push(data);
            };
            list_files("opml", cbb);
          }
          bottom_bar("", "<img src='assets/icons/select.svg'>", "");
          if (status.notKaiOS) bottom_bar("", "", "");

          document.querySelectorAll(".item").forEach((e, k) => {
            e.setAttribute("tabindex", k);
          });

          if (status.notKaiOS)
            top_bar("", "", "<img src='assets/icons/back.svg'>");
          if (status.notKaiOS) bottom_bar("", "", "");
        },
      },
      [
        m(
          "div",
          {
            class: "item input-parent  flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "url-opml",
              },
              "OPML"
            ),
            m("input", {
              id: "url-opml",
              placeholder: "",
              value: settings.opml_url || "",
              type: "url",
            }),
          ]
        ),
        m(
          "button",
          {
            class: "item",
            onclick: () => {
              let cb = (data) => {
                const reader = new FileReader();

                reader.onload = () => {
                  const downloadListData = generateDownloadList(reader.result);
                  if (downloadListData.error) {
                    side_toaster("OPML file not valid", 4000);
                  } else {
                    settings.opml_local = reader.result;
                    settings.opml_local_filename = data.filename;
                    localforage.setItem("settings", settings).then(() => {
                      side_toaster("OPML file added", 4000);
                    });
                  }
                };

                reader.onerror = () => {
                  side_toaster("OPML file not valid", 4000);
                };

                reader.readAsText(data.blob);
              };
              if (status.notKaiOS) {
                pick_file(cb);
              } else {
                status.local_opml.length > 0
                  ? m.route.set("/localOPML")
                  : side_toaster("not enough", 3000);
              }
            },
          },
          "Upload OPML file"
        ),

        m("div", settings.opml_local_filename),

        m("div", { class: "seperation" }),
        m(
          "div",
          {
            tabindex: 1,

            class: "item input-parent  flex justify-content-spacearound",
          },
          [
            m(
              "label",
              {
                for: "url-proxy",
              },
              "PROXY"
            ),
            m("input", {
              id: "url-proxy",
              placeholder: "",
              value: settings.proxy_url || "",
              type: "url",
            }),
          ]
        ),
        m("div", { class: "seperation" }),

        m(
          "h2",
          { class: "flex justify-content-spacearound" },
          "Mastodon Account"
        ),

        status.mastodon_logged
          ? m(
              "div",
              {
                id: "account_info",
              },
              `You have successfully logged in as ${status.mastodon_logged} and the data is being loaded from server ${settings.mastodon_server_url}.`
            )
          : null,

        status.mastodon_logged
          ? m(
              "button",
              {
                class: "item",
                onclick: function () {
                  settings.mastodon_server_url = "";
                  settings.mastodon_token = "";
                  localforage.setItem("settings", settings);
                  status.mastodon_logged = "";
                  m.route.set("/settingsView");
                },
              },
              "Disconnect"
            )
          : null,

        status.mastodon_logged
          ? null
          : m(
              "div",
              {
                class: "item input-parent flex justify-content-spacearound",
              },
              [
                m(
                  "label",
                  {
                    for: "mastodon-server-url",
                  },
                  "URL"
                ),
                m("input", {
                  id: "mastodon-server-url",
                  placeholder: "Server URL",
                  value: settings.mastodon_server_url,
                }),
              ]
            ),

        status.mastodon_logged
          ? null
          : m(
              "button",
              {
                class: "item",
                onclick: function () {
                  localforage.setItem("settings", settings);

                  settings.mastodon_server_url = document.getElementById(
                    "mastodon-server-url"
                  ).value;

                  let url =
                    settings.mastodon_server_url +
                    "/oauth/authorize?client_id=" +
                    process.env.clientId +
                    "&scope=read&redirect_uri=" +
                    process.env.redirect +
                    "&response_type=code";
                  window.open(url);
                },
              },
              "Connect"
            ),

        m(
          "button",
          {
            class: "item",
            id: "button-save-settings",
            onclick: function () {
              if (!validate_url(document.getElementById("url-opml").value))
                side_toaster("URL not valid");
              settings.opml_url = document.getElementById("url-opml").value;
              settings.proxy_url = document.getElementById("url-proxy").value;
              status.mastodon_logged
                ? null
                : (settings.mastodon_server_url = document.getElementById(
                    "mastodon-server-url"
                  ).value);

              localforage
                .setItem("settings", settings)
                .then(function (value) {
                  // Do other things once the value has been saved.
                  side_toaster("settings saved", 2000);
                })
                .catch(function (err) {
                  // This code runs if there were any errors
                  console.log(err);
                });
            },
          },
          "save settings"
        ),
      ]
    );
  },
};

m.route(root, "/intro", {
  "/settingsView": settingsView,
  "/intro": intro,
  "/start": start,
  "/options": options,
  "/about": about,
  "/privacy_policy": privacy_policy,
  "/article": article,
  "/index": index,
  "/localOPML": localOPML,
  "/AudioPlayerView": AudioPlayerView,
  "/VideoPlayerView": VideoPlayerView,
});

function scrollToCenter() {
  const activeElement = document.activeElement;
  if (!activeElement) return;

  const rect = activeElement.getBoundingClientRect();
  let elY = rect.top + rect.height / 2;

  let scrollContainer = activeElement.parentNode;

  // Find the first scrollable parent
  while (scrollContainer) {
    if (
      scrollContainer.scrollHeight > scrollContainer.clientHeight ||
      scrollContainer.scrollWidth > scrollContainer.clientWidth
    ) {
      // Calculate the element's offset relative to the scrollable parent
      const containerRect = scrollContainer.getBoundingClientRect();
      elY = rect.top - containerRect.top + rect.height / 2;
      break;
    }
    scrollContainer = scrollContainer.parentNode;
  }

  if (scrollContainer) {
    scrollContainer.scrollBy({
      left: 0,
      top: elY - scrollContainer.clientHeight / 2,
      behavior: "smooth",
    });
  } else {
    // If no scrollable parent is found, scroll the document body
    document.body.scrollBy({
      left: 0,
      top: elY - window.innerHeight / 2,
      behavior: "smooth",
    });
  }
}

let scrollToTop = () => {
  document.body.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });

  document.documentElement.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

document.addEventListener("DOMContentLoaded", function (e) {
  /////////////////
  ///NAVIGATION
  /////////////////

  let nav = function (move) {
    if (
      document.activeElement.nodeName == "SELECT" ||
      document.activeElement.type == "date" ||
      document.activeElement.type == "time"
    )
      return false;

    if (document.activeElement.classList.contains("scroll")) {
      const scrollableElement = document.querySelector(".scroll");
      if (move == 1) {
        scrollableElement.scrollBy({ left: 0, top: 10 });
      } else {
        scrollableElement.scrollBy({ left: 0, top: -10 });
      }
    }

    const currentIndex = document.activeElement.tabIndex;
    let next = currentIndex + move;
    let items = 0;

    items = document.getElementById("app").querySelectorAll(".item");

    if (document.activeElement.parentNode.classList.contains("input-parent")) {
      document.activeElement.parentNode.focus();
      return true;
    }

    let targetElement = 0;

    if (next <= items.length) {
      targetElement = items[next];
      targetElement.focus();
    }

    if (next >= items.length) {
      targetElement = items[0];
      targetElement.focus();
    }

    scrollToCenter();
  };

  // Add click listeners to simulate key events
  document
    .querySelector("div.button-left")
    .addEventListener("click", function (event) {
      simulateKeyPress("SoftLeft");
    });

  document
    .querySelector("div.button-right")
    .addEventListener("click", function (event) {
      simulateKeyPress("SoftRight");
    });

  document
    .querySelector("div.button-center")
    .addEventListener("click", function (event) {
      simulateKeyPress("Enter");
    });

  //top bar

  document
    .querySelector("#top-bar div div.button-right")
    .addEventListener("click", function (event) {
      simulateKeyPress("Backspace");
    });

  document
    .querySelector("#top-bar div div.button-left")
    .addEventListener("click", function (event) {
      simulateKeyPress("*");
    });

  // Function to simulate key press events
  function simulateKeyPress(k) {
    shortpress_action({ key: k });
  }

  // Add an event listener for keydown events
  document.addEventListener("keydown", function (event) {
    handleKeyDown(event);
  });

  // Add an event listener for keydown events
  document.addEventListener("keyup", function (event) {
    handleKeyUp(event);
  });

  document.addEventListener("swiped", function (e) {
    let r = m.route.get();

    let dir = e.detail.dir;
    if (dir == "right") {
      if (r.startsWith("/start")) {
        counter--;
        if (counter < 1) counter = channels.length - 1;

        channel_filter = channels[counter];
        m.redraw();
        // Update the route with the new parameter, preserving the rest
        const currentParams = m.route.param(); // Get the current parameters
        currentParams.index = 0; // Modify the `index` parameter

        m.route.set("/start", currentParams); // Update the route with the new parameters
      }
    }
    if (dir == "left") {
      if (r.startsWith("/start")) {
        counter++;
        if (counter > channels.length - 1) counter = 0;

        channel_filter = channels[counter];
        m.redraw();
        const currentParams = m.route.param(); // Get the current parameters
        currentParams.index = 0; // Modify the `index` parameter

        m.route.set("/start", currentParams); // Update the route with the new parameters
      }
    }
  });

  // ////////////////////////////
  // //KEYPAD HANDLER////////////
  // ////////////////////////////

  let longpress = false;
  const longpress_timespan = 2000;
  let timeout;

  function repeat_action(param) {
    switch (param.key) {
    }
  }

  //////////////
  ////LONGPRESS
  /////////////

  function longpress_action(param) {
    let route = m.route.get();

    switch (param.key) {
      case "Backspace":
        window.close();
        break;

      case "Enter":
        break;
    }
  }

  // /////////////
  // //SHORTPRESS
  // ////////////

  function shortpress_action(param) {
    let r = m.route.get();

    switch (param.key) {
      case "ArrowRight":
        if (r.startsWith("/start")) {
          counter++;

          if (counter > channels.length - 1) counter = 0;

          channel_filter = channels[counter];
          m.redraw();
          const currentParams = m.route.param(); // Get the current parameters
          currentParams.index = 0; // Modify the `index` parameter
          m.route.set("/start", currentParams); // Update the route with the new parameters

          setTimeout(() => {
            document.querySelectorAll("article.item")[0].focus();
            scrollToCenter();
          }, 500);
        }
        break;

      case "ArrowLeft":
        if (r.startsWith("/start")) {
          counter--;

          if (counter < 0) counter = channels.length - 1;

          channel_filter = channels[counter];

          m.redraw();
          // Update the route with the new parameter, preserving the rest
          const currentParams = m.route.param(); // Get the current parameters
          currentParams.index = 0; // Modify the `index` parameter
          m.route.set("/start", currentParams); // Update the route with the new parameters
          setTimeout(() => {
            document.querySelectorAll("article.item")[0].focus();

            scrollToCenter();
          }, 500);
        }
        break;
      case "ArrowUp":
        nav(-1);
        break;
      case "ArrowDown":
        nav(+1);

        break;

      case "SoftRight":
      case "Alt":
        if (r.startsWith("/start")) {
          m.route.set("/options");
        }
        break;

      case "SoftLeft":
      case "Control":
        if (r.startsWith("/start")) {
          m.route.set("/index");
        }

        if (r.startsWith("/article")) {
          window.open(current_article.url);
        }
        break;

      case "Enter":
        if (document.activeElement.classList.contains("input-parent")) {
          document.activeElement.children[0].focus();
        }
        if (r.startsWith("/article")) {
          if (current_article.type == "audio")
            m.route.set(
              `/AudioPlayerView?url=${encodeURIComponent(
                current_article.enclosure["@_url"]
              )}`
            );

          if (current_article.type == "video")
            m.route.set(
              `/VideoPlayerView?url=${encodeURIComponent(
                current_article.enclosure["@_url"]
              )}`
            );
        }
        break;

      case "*":
        m.route.set(`/AudioPlayerView`);
        break;

      case "Backspace":
        if (r.startsWith("/article")) {
          history.back();
        }

        if (r.startsWith("/index")) {
          m.route.set("/start?index=0");
        }

        if (r.startsWith("/about")) {
          m.route.set("/options");
        }

        if (r.startsWith("/privacy_policy")) {
          m.route.set("/options");
        }

        if (r.startsWith("/options")) {
          m.route.set("/start?index=0");
        }

        if (r.startsWith("/settingsView")) {
          if (document.activeElement.tagName == "INPUT") return false;
          m.route.set("/options");
        }

        if (r.startsWith("/Video")) {
          history.back();
        }

        if (r.startsWith("/Audio")) history.back(); // Navigate back in history

        break;
    }
  }

  // ///////////////////////////////
  // //shortpress / longpress logic
  // //////////////////////////////

  function handleKeyDown(evt) {
    if (evt.key == "Backspace" && document.activeElement.tagName != "INPUT")
      evt.preventDefault();

    if (evt.key === "EndCall") {
      evt.preventDefault();
      window.close();
    }
    if (!evt.repeat) {
      longpress = false;
      timeout = setTimeout(() => {
        longpress = true;
        longpress_action(evt);
      }, longpress_timespan);
    }

    if (evt.repeat) {
      if (evt.key == "Backspace") longpress = false;

      repeat_action(evt);
    }
  }

  function handleKeyUp(evt) {
    if (evt.key == "Backspace") evt.preventDefault();

    if (status.visibility === false) return false;

    clearTimeout(timeout);
    if (!longpress) {
      shortpress_action(evt);
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      status.visibility = true;
      let dif = new Date() / 1000 - settings.last_update / 1000;
      if (dif > 36000) {
        articles = [];

        side_toaster("load new content", 4000);
        start_loading();
      }
    } else {
      status.visibility = false;
    }
  });
});

window.addEventListener("online", () => {
  status.deviceOnline = true;
});
window.addEventListener("offline", () => {
  status.deviceOnline = false;
});

//webActivity KaiOS 3

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistration().then((registration) => {
    if (!registration) {
      // No service worker registered, proceed with registration
      try {
        navigator.serviceWorker
          .register(new URL("sw.js", import.meta.url), {
            type: "module",
          })
          .then((registration) => {
            if (registration.waiting) {
              // Handle waiting service worker if needed
            } else {
              // Registration was successful, no waiting worker
            }

            registration.systemMessageManager.subscribe("activity").then(
              (rv) => {
                console.log(rv);
              },
              (error) => {
                console.log(error);
              }
            );
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      // Service worker already registered
    }
  });
}

const sw_channel = new BroadcastChannel("sw-messages");
sw_channel.addEventListener("message", (event) => {
  alert(event);
  let result = event.data.oauth_success.data;

  if (result) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("code", result);
    urlencoded.append("scope", "read");

    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("redirect_uri", process.env.redirect);
    urlencoded.append("client_id", process.env.clientId);
    urlencoded.append("client_secret", process.env.clientSecret);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(settings.mastodon_server_url + "/oauth/token", requestOptions)
      .then((response) => response.json()) // Parse the JSON once
      .then((data) => {
        console.log(data); // Log the parsed data

        settings.mastodon_token = data.access_token; // Access the token
        localforage.setItem("settings", settings);
        m.route.set("/start?index=0");

        side_toaster("Successfully connected", 10000);
      })
      .catch((error) => {
        console.error("Error:", error);
        side_toaster("Connection failed");
      });
  }
});
