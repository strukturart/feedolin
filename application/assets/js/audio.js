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
}


////SEEKING//////


function seeking(param) {
    var step = 10;
    player.pause();
    if (param == "backward") {
        player.currentTime = player.currentTime - step++
    }


    if (param == "forward") {
        player.currentTime = player.currentTime + step++
    }
    player.play();

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




function player_seeking_run() {
    player.muted = true;
    player.volume = 0;
}



$(document).ready(function() {


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