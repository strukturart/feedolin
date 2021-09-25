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
  let active_element = "";
  let listened = [];

  //////////////////
  //PLAY
  //////////////////
  let play_podcast = function (url) {
    if (url != player.src) {
      player.src = url;
      player.play();
    }

    if (player_status == "play") {
      clearInterval(getduration);

      player.pause();
      bottom_bar("play", "", "");
      player_status = "pause";
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
    //player.pause();
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

        if (
          $(":focus").hasClass("youtube") &&
          status.window_status == "source-page"
        ) {
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
  player.onloadedmetadata = function () {
    getduration = setInterval(function () {
      if (typeof player.duration != "number") {
        bottom_bar("pause", "-", "");
        return false;
      }
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
    helper.toaster("pause", 3000);
    //player_status = "pause";
  };

  player.onplay = function () {
    let articles = document.querySelectorAll("article");
    for (var i = 0; i < articles.length; i++) {
      articles[i].classList.remove("audio-playing");
    }
    document.activeElement.classList.add("audio-playing");
    helper.toaster("play", 3000);
    active_element = document.activeElement.getAttribute("data-id");

    status.active_element_id = document.activeElement.getAttribute("data-id");
    document.getElementById(
      "audio-title"
    ).innerText = document.activeElement.getAttribute("data-title");

    //add recently played tracks in list
    if (localStorage.getItem("recentlyplayed")) {
      recently_played = JSON.parse(localStorage.getItem("recentlyplayed"));
    }

    recently_played.unshift(active_element);
    if (recently_played.length > 4) recently_played.splice(-1, 1);
    localStorage.setItem("recentlyplayed", JSON.stringify(recently_played));
    //player_status = "play";
  };

  player.onended = function () {
    //when played to end
    if (localStorage.getItem("listened")) {
      listened = JSON.parse(localStorage["listened"]);
    }

    listened.push(active_element);
    localStorage.setItem("listened", JSON.stringify(listened));
  };

  return {
    play_podcast,
    seeking,
    volume_control,
  };
})();
