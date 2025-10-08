import jsQR from "jsqr";

let mediaStream;
let video;

export let stop_scan = function (callback) {
  document.getElementById("qr-screen").style.display = "none";

  if (mediaStream) {
    mediaStream.getTracks().forEach(function (track) {
      track.stop();
    });
    mediaStream = null;
  }

  if (callback) {
    document.getElementById("qr-screen").style.display = "none";
    callback();
  }
};

export let start_scan = function (callback) {
  document.getElementById("qr-screen").style.display = "block";

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
        },
      })
      .then(function (stream) {
        mediaStream = stream; // Assign the stream to mediaStream variable

        video = document.getElementsByTagName("video")[0];

        video.muted = true;
        video.playsInline = true; // Important for iOS
        video.autoplay = true;

        video.srcObject = stream;

        video.onloadedmetadata = function () {
          video.play();

          const barcodeCanvas = document.createElement("canvas");
          const barcodeContext = barcodeCanvas.getContext("2d");

          const intv = setInterval(() => {
            barcodeCanvas.width = video.videoWidth;
            barcodeCanvas.height = video.videoHeight;
            barcodeContext.drawImage(
              video,
              0,
              0,
              video.videoWidth,
              video.videoHeight
            );

            const imageData = barcodeContext.getImageData(
              0,
              0,
              video.videoWidth,
              video.videoHeight
            );
            const idd = imageData.data;

            const code = jsQR(idd, video.videoWidth, video.videoHeight);

            if (code) {
              clearInterval(intv);
              stop_scan();
              callback(code.data);
            }
          }, 1000);
        };
      })
      .catch(function (err) {
        console.error("The following error occurred: " + err.name);
        callback("error");

        stop_scan();
      });
  } else {
    alert("getUserMedia not supported");
  }
};
