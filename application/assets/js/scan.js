const qr = ((_) => {
    let video;
    let start_scan = function(callback) {
        window_status = "scan";
        bottom_bar("", "", "");

        document.getElementById("qr-screen").style.display = "block";

        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                    audio: false,
                    video: {
                        width: 240,
                        height: 320
                    }
                },
                function(stream) {
                    video = document.querySelector("video");
                    video.srcObject = stream;

                    video.onloadedmetadata = function(e) {
                        video.play();

                        var barcodeCanvas = document.createElement("canvas");
                        let intv = setInterval(() => {
                            barcodeCanvas.width = video.videoWidth;
                            barcodeCanvas.height = video.videoHeight;
                            var barcodeContext = barcodeCanvas.getContext("2d");
                            var imageWidth = video.videoWidth,
                                imageHeight = video.videoHeight;
                            barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);

                            var imageData = barcodeContext.getImageData(
                                0,
                                0,
                                imageWidth,
                                imageHeight
                            );
                            var idd = imageData.data;

                            let code = jsQR(idd, imageWidth, imageHeight);

                            if (code) {
                                callback(code.data);
                                stop_scan();
                                clearInterval(intv);
                            }
                        }, 1000);
                    };
                },
                function(err) {
                    console.log("The following error occurred: " + err.name);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    };

    function stop_scan() {
        window_status = "settings";
        document.getElementById("qr-screen").style.display = "none";


        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
            document.getElementById("qr-screen").style.display = "none";
        });

        video.srcObject = null;
    }

    return {
        start_scan,
        stop_scan
    };
})();