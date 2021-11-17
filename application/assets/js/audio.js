const audio_player = ((_) => {
  let player = new Audio();
  player.mozAudioChannelType = "content";
  player.type = "audio/mpeg";
  player.mozaudiochannel = "content";
  player.preload = "none";
  let getduration;

  let player_status = "";
  if (navigator.mozAudioChannelManager) {
    navigator.mozAudioChannelManager.volumeControlChannel = "content";
  }

  //////////////////
  //PLAY
  //////////////////
  let play_podcast = function (url) {
    if (url != player.src) {
      player.src = url;
      player.play();
    }

    if (player_status == "play") {
      player.pause();
      bottom_bar("play", "", "");
      player_status = "pause";
      clearInterval(getduration);

      return false;
    }
    if (player_status == "pause" || player_status == "") {
      player.play();
      bottom_bar("pause", "", "");
      player_status = "play";
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

  //time duration
  let stream_id = "";
  player.onloadedmetadata = function () {
    stream_id = document.activeElement.getAttribute("data-id");
    console.log(stream_id);
    if (!audio_memory.hasOwnProperty(stream_id)) {
      audio_memory.push({ [stream_id]: "" });
    }

    if (audio_memory.hasOwnProperty(stream_id)) {
      player.pause();
      var person = confirm("would you like to continue the podcast ?");
      if (person) {
        player.currentTime = audio_memory[stream_id];
        player.play();
      }
      if (!person) {
        player.play();
      }
    }
    getduration = setInterval(function () {
      if (typeof player.duration != "number") {
        bottom_bar("pause", "-", "");
        return false;
      }
      var time = player.duration - player.currentTime;
      let percent = (player.currentTime / player.duration) * 100;

      audio_memory[stream_id] = player.currentTime;
      //var tt = JSON.stringify(audio_memory);
      //console.log(tt);
      //localStorage.setItem("audio_memory", tt);

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
      var duration = minutes + ":" + seconds;

      if (duration == "NaN:NaN") {
        bottom_bar("pause", "", "");
        helper.toaster("Can't play media", 5000);

        clearInterval(getduration);
        return false;
      }

      if (status.window_status == "audio-player")
        bottom_bar("pause", duration, "");
    }, 1000);
  };

  player.onpause = function () {
    console.log(player.networkState);
  };

  player.onplay = function () {
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
  };

  player.onended = function () {
    //when played to end

    if (audio_memory.hasOwnProperty(stream_id)) {
      delete audio_memory.stream_id;
    }

    if (localStorage.getItem("listened_elem")) {
      listened_elem = JSON.parse(localStorage["listened_elem"]);
    }

    listened_elem.push(status.active_audio_element_id);
    localStorage.setItem("listened_elem", JSON.stringify(listened_elem));
  };

  player.addEventListener("loadeddata", function () {
    console.log(player.readyState);
  });

  player.addEventListener("playing", function () {
    console.log(player.networkState);
    if (player.networkState === 2) {
      // Still loading...
    }
  });

  player.addEventListener("error", () => {
    helper.toaster("Can't play media", 5000);
  });

  return {
    play_podcast,
    seeking,
    volume_control,
  };
})();
