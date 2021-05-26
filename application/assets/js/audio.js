const audio_player = ((_) => {
  let player = new Audio();
  player.mozAudioChannelType = "content";
  player.type = "audio/mpeg";
  player.preload = "none";
  let player_status = "";
  if (navigator.mozAudioChannelManager) {
    navigator.mozAudioChannelManager.volumeControlChannel = "content";
  }
  let active_element = "";
  let listened = [];

  //////////////////
  //PLAY
  //////////////////
  let play_podcast = function () {
    player.mozaudiochannel = "content";

    if (player.currentSrc == "" || player.currentSrc != link_target) {
      player.src = "";
      player.src = link_target;
      player.play();
      return false;
    }

    if (player_status == "play") {
      player.pause();
      return false;
    }

    if (player_status == "pause") {
      player.play();
      return false;
    }
  };

  let pause = function () {
    player.pause();
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

        if ($(":focus").hasClass("youtube") && window_status == "source-page") {
          navigator.spatialNavigationEnabled = true;
        }
      }, 3000);
    }

    if (param == "down") {
      navigator.volumeManager.requestDown();
      setTimeout(function () {
        volume_status = false;

        if (window_status == "source-page") {
          navigator.spatialNavigationEnabled = true;
        }
      }, 3000);
    }
  };

  //time duration
  player.onloadedmetadata = function () {
    var getduration = setInterval(function () {
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
      if (window_status == "audio-player") bottom_bar("pause", duration, "");
    }, 1000);
  };

  player.onpause = function () {
    player_status = "pause";
    bottom_bar("play", "", "");
    toaster("pause", 3000);
  };

  player.onplay = function () {
    let articles = document.querySelectorAll("article");
    for (var i = 0; i < articles.length; i++) {
      articles[i].classList.remove("audio-playing");
    }
    document.activeElement.classList.add("audio-playing");
    player_status = "play";
    bottom_bar("pause", "", "");
    toaster("play", 3000);
    active_element = document.activeElement.getAttribute("data-id");
    document.getElementById(
      "audio-title"
    ).innerText = document.activeElement.getAttribute("data-title");

    //add recently played tracks in list
    if (localStorage.getItem("recentlyplayed")) {
      recently_played = JSON.parse(localStorage.getItem("recentlyplayed"));
    }

    if (recently_played.indexOf(active_element) == -1) {
      recently_played.unshift(active_element);
      if (recently_played.length > 4) recently_played.splice(-1, 1);
      localStorage.setItem("recentlyplayed", JSON.stringify(recently_played));
    }
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
    pause,
  };
})();
