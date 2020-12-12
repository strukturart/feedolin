var player = new Audio();
player.mozAudioChannelType = 'content';
player.type = "audio/mpeg";
player.preload = "none";
var player_status = "";
var volume = navigator.volumeManager;
navigator.mozAudioChannelManager.volumeControlChannel = 'content';


//////////////////
//PLAY
//////////////////
function play_podcast() {
    player.mozaudiochannel = 'content';


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
    //player.pause();
    if (param == "backward") {
        player.currentTime = player.currentTime - step++
    }


    if (param == "forward") {
        player.currentTime = player.currentTime + step++
    }

}

////////////////////////
////VOLUME CONTROL//////
///////////////////////



function volume_control(param) {

    if (param == "up") {
        volume.requestUp()
        setTimeout(function() {
            volume_status = false;

            if ($(":focus").hasClass("youtube") && window_status == "source-page") {
                navigator.spatialNavigationEnabled = true;
            }

        }, 3000);
    }



    if (param == "down") {
        volume.requestDown()
        setTimeout(function() {
            volume_status = false;

            if ($(":focus").hasClass("youtube") && window_status == "source-page") {
                navigator.spatialNavigationEnabled = true;
            }

        }, 3000);
    }





}





$(document).ready(function() {



    //time duration
    $(player).on("loadedmetadata", function() {


        var getduration = setInterval(function() {
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


            $("div#bottom-bar div#button-center").text(duration)
        }, 1000);


    });



    player.onpause = function() {

        player_status = "pause";
        bottom_bar("play", "", "download")
        toaster("pause", 3000)
    };

    player.onplay = function() {
        $("article").removeClass("audio-playing");
        $(":focus").addClass("audio-playing");
        player_status = "play";
        bottom_bar("pause", "", "download")
        toaster("play", 3000)


    };

})