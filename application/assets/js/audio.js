var player = new Audio();
player.mozAudioChannelType = 'content';
player.type = "audio/mpeg";
player.preload = "none";
var player_status = "";
var volume = navigator.volumeManager;



//////////////////
//PLAY
//////////////////
function play_podcast() {

    if (player.currentSrc == "" || player.currentSrc != link_target) {
        player.mozAudioChannelType = 'content';

        player.src = "";
        player.src = link_target;
        player.play();
        alert(player.mozAudioChannelType)
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
}


////SEEKING//////


function seeking(param) {
    var step = 10;
    //player.pause();
    if (param == "backward") {
        player.currentTime = player.currentTime - step++
    }


    if (param == "forward") {
        player.currentTime = player.currentTime + step++
    }
    //player.play();

}

////////////////////////
////VOLUME CONTROL//////
///////////////////////



function volume_control(param) {
    if (param == "up") {
        volume.requestUp()

        setTimeout(function() {
            volume_status = "false";
        }, 2000);
    }



    if (param == "down") {
        volume.requestDown()
        setTimeout(function() {
            volume_status = "false";
        }, 2000);
    }





}





$(document).ready(function() {

    //time duration
    $(player).on("loadedmetadata", function() {

        setInterval(function() {
            var time = player.duration - player.currentTime;
            var minutes = parseInt(time / 60, 10);
            var seconds_long = parseInt(time % 60, 10);
            var seconds;
            if (seconds_long < 10) {
                seconds = "0" + seconds_long;
            } else {
                seconds = seconds_long;
            }
            var duration = minutes + ":" + seconds;

            bottom_bar("pause", duration, "download")


        }, 1000);


    });



    player.onpause = function() {
        player_status = "pause";
        bottom_bar("play", "", "download")
    };

    player.onplay = function() {
        $("article").removeClass("audio-playing");
        $(":focus").addClass("audio-playing");
        player_status = "play";
        bottom_bar("pause", "", "download")
    };

})