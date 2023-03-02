"use strict";
import { userLang } from "../../app.js";
import { status } from "../../app.js";
import { recently_played } from "../../app.js";

import { toTime } from "../../app.js";

//status, listened_elem, recently_played,
import { toaster, bottom_bar } from "./helper.js";
import { translations } from "../../assets/js/translations.js";
const dayjs = require("dayjs");
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

let player = new Audio();
player.mozAudioChannelType = "content";
player.type = "audio/mpeg";
player.mozaudiochannel = "content";
player.preload = "auto";
let getduration;
let dduration = "";

if (navigator.mozAudioChannelManager) {
  navigator.mozAudioChannelManager.volumeControlChannel = "content";
}

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

let stream_id = "";
let audio_memory;
if (localStorage.getItem("audio_memory") != null) {
  let d = JSON.parse(localStorage.getItem("audio_memory"));
  audio_memory = d;
} else {
  audio_memory = {};
}

//////////////////
//PLAY
//////////////////
export let play_podcast = function (url) {
  if (url != player.src) {
    player.src = url;
    player.play();
    status.audio_status = "play";
    return true;
  }

  if (!player.paused) {
    player.pause();
    status.audio_status = "pause";

    return false;
  }
  if (player.paused) {
    status.audio_status = "play";

    player.play();
  }
};

export let stop_player = function () {
  player.src = "";
  clearInterval(getduration);
};

////SEEKING//////

export let seeking = function (param) {
  var step = 10;
  if (param == "backward") {
    player.currentTime = player.currentTime - step++;
  }

  if (param == "forward") {
    player.currentTime = player.currentTime + step++;
  }
};

////////////////////////
////VOLUME CONTROL//////
///////////////////////

function startVolumeManager() {
  const session = new lib_session.Session();
  const sessionstate = {};
  navigator.volumeManager = null;
  sessionstate.onsessionconnected = function () {
    // console.log(AudioVolumeManager onsessionconnected);
    lib_audiovolume.AudioVolumeManager.get(session)
      .then((AudioVolumeManagerService) => {
        navigator.volumeManager = AudioVolumeManagerService;
      })
      .catch((e) => {
        // console.log(Error calling AudioVolumeManager service${JSON.stringify(e)});
        navigator.volumeManager = null;
      });
  };
  sessionstate.onsessiondisconnected = function () {
    startVolumeManager();
  };
  session.open("websocket", "localhost", "secrettoken", sessionstate, true);
}
if ("b2g" in navigator) setTimeout(startVolumeManager, 5000);

export let volume_control = function () {
  //KaiOS 3.x
  if ("b2g" in navigator) {
    try {
      navigator.volumeManager.requestVolumeShow();
      let f = status.window_status;
      status.window_status = "volume";
      setTimeout(() => {
        status.window_status = f;
      }, 3000);
    } catch (e) {}
  }

  //KaiOS 2.x
  try {
    navigator.volumeManager.requestShow();
  } catch (e) {
    alert("jj");
  }
};

player.onloadedmetadata = function () {
  stream_id = document.activeElement.getAttribute("data-id");

  if (audio_memory.hasOwnProperty(stream_id)) {
    player.pause();

    var w = confirm("would you like to continue the podcast ?");
    if (w) {
      player.play();
      player.currentTime = audio_memory[stream_id];
    }
    if (!w) {
      player.play();
      delete audio_memory[stream_id];
    }
  }
};

let remember = function () {
  //rember position
  if (player.currentTime > 10) {
    audio_memory[stream_id] = player.currentTime;
    var tt = JSON.stringify(audio_memory);
    localStorage.setItem("audio_memory", tt);
  }
};

player.addEventListener("play", (event) => {
  bottom_bar("<img src='assets/icons/23EF.svg'>", dduration, "");
});

player.addEventListener("pause", (event) => {
  remember();
  bottom_bar("<img src='assets/icons/23EF.svg'>", dduration, "");

  clearInterval(getduration);
});

player.addEventListener("playing", (event) => {
  if (player.networkState === 2) {
    console.log("loading media");
  }

  if (player.networkState === 3) {
    clearInterval(getduration);
  }
  let articles = document.querySelectorAll("article");
  for (var i = 0; i < articles.length; i++) {
    articles[i].classList.remove("audio-playing");
  }
  document.activeElement.classList.add("audio-playing");
  document.getElementById("progress-bar").style.display = "block";

  status.active_audio_element_id =
    document.activeElement.getAttribute("data-id");

  status.active_element_id = document.activeElement.getAttribute("data-id");
  document.getElementById("audio-title").innerText =
    document.activeElement.getAttribute("data-title");

  //add recently played tracks in list
  if (recently_played.indexOf(status.active_element_id) == -1) {
    if (recently_played.length > 4) recently_played.shift();
    recently_played.push(status.active_element_id);
    localStorage.setItem("recently_played", JSON.stringify(recently_played));
  }

  getduration = setInterval(function () {
    if (!player.paused) {
      var time = player.duration - player.currentTime;
      let f = typeof time;
      if (f != "number") return false;

      time = Math.floor(time);
      let l = dayjs.duration(time, "seconds").format("hh");
      let ff = l == "undefined" ? "mm:ss" : "hh:mm:ss";
      let d = dayjs.duration(time, "seconds").format(ff);

      let percent = (player.currentTime / player.duration) * 100;

      document.querySelector("div#progress-bar div").style.width =
        percent + "%";

      status.audio_duration = toTime(time);
      if (status.window_status == "audio-player" && f == "number")
        bottom_bar("<img src='assets/icons/23EF.svg'>", d, "");
      remember();
    } else {
      clearInterval(getduration);
    }
  }, 1000);
});

player.onended = function () {
  if (audio_memory.hasOwnProperty(stream_id)) {
    delete audio_memory.stream_id;
  }
  let listened_elem;
  if (localStorage.getItem("listened_elem")) {
    listened_elem = JSON.parse(localStorage["listened_elem"]);
  }

  listened_elem.push(status.active_audio_element_id);
  localStorage.setItem("listened_elem", JSON.stringify(listened_elem));
  clearInterval(getduration);
  status.audio_duration = 0;
  document.getElementById("progress-bar").style.display = "none";
};

player.addEventListener("error", () => {
  clearInterval(getduration);
});
