const audio_player = ((_) => {
  let player = new Audio();
  player.mozAudioChannelType = "content";
  player.type = "audio/mpeg";
  player.mozaudiochannel = "content";
  player.preload = "none";
  let getduration;
  let duration = "";

  if (navigator.mozAudioChannelManager) {
    navigator.mozAudioChannelManager.volumeControlChannel = "content";
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
  let play_podcast = function (url) {
    if (url != player.src) {
      player.src = url;
      player.play();
    }

    if (!player.paused) {
      player.pause();
      return false;
    }
    if (player.paused) {
      player.play();
    }
  };

  ////SEEKING//////

  let seeking = function (param) {
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

  let volume_control = function (param) {
    if (param == "up") {
      navigator.volumeManager.requestUp();
      setTimeout(function () {
        volume_status = false;
        if (status.window_status == "source-page") {
          navigator.spatialNavigationEnabled = true;
        }
      }, 3000);
    }

    if (param == "down") {
      navigator.volumeManager.requestDown();
      setTimeout(function () {
        volume_status = false;
        if (status.window_status == "source-page") {
          navigator.spatialNavigationEnabled = true;
        }
      }, 3000);
    }
  };

  player.onloadedmetadata = function () {
    stream_id = document.activeElement.getAttribute("data-id");
    //clearInterval(getduration);

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
    bottom_bar("pause", duration, "");
  });

  player.addEventListener("pause", (event) => {
    remember();
    clearInterval(getduration);
    setTimeout(function () {
      bottom_bar("play", duration, "");
    }, 1000);
  });

  player.addEventListener("playing", (event) => {
    if (player.networkState === 2) {
      helper.toaster("loading media", 1000);
    }
    let articles = document.querySelectorAll("article");
    for (var i = 0; i < articles.length; i++) {
      articles[i].classList.remove("audio-playing");
    }
    document.activeElement.classList.add("audio-playing");

    status.active_audio_element_id = document.activeElement.getAttribute(
      "data-id"
    );

    status.active_element_id = document.activeElement.getAttribute("data-id");
    document.getElementById(
      "audio-title"
    ).innerText = document.activeElement.getAttribute("data-title");

    //add recently played tracks in list
    if (recently_played.indexOf(status.active_element_id) == -1) {
      if (recently_played.length > 4) recently_played.shift();
      recently_played.push(status.active_element_id);
      localStorage.setItem("recently_played", JSON.stringify(recently_played));
    }

    getduration = setInterval(function () {
      if (!player.paused) {
        var time = player.duration - player.currentTime;
        let percent = (player.currentTime / player.duration) * 100;

        document.querySelector("div#progress-bar div").style.width =
          percent + "%";

        var minutes = parseInt(time / 60, 10);
        var seconds_long = parseInt(time % 60, 10);
        var seconds;
        if (seconds_long < 10) {
          seconds = "0" + seconds_long;
        } else {
          seconds = seconds_long;
        }
        duration = minutes + ":" + seconds;
        bottom_bar("pause", duration, "");
      }
    }, 1000);
  });

  player.onended = function () {
    if (audio_memory.hasOwnProperty(stream_id)) {
      delete audio_memory.stream_id;
    }

    if (localStorage.getItem("listened_elem")) {
      listened_elem = JSON.parse(localStorage["listened_elem"]);
    }

    listened_elem.push(status.active_audio_element_id);
    localStorage.setItem("listened_elem", JSON.stringify(listened_elem));
    clearInterval(getduration);
    //bottom_bar("play", "", "");
  };

  player.addEventListener("error", () => {
    helper.toaster("Can't play media", 5000);
    clearInterval(getduration);
  });

  return {
    play_podcast,
    seeking,
    volume_control,
  };
})();
