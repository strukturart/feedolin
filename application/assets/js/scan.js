import jsQR from "jsqr";
import { status } from "../../app.js";

let video;
let intv;

export let stop_scan = function () {
  document.getElementById("qr-screen").style.display = "none";
  console.log("yeah");
  clearInterval(intv);
  status.window_status = "settings";
};

export let start_scan = function (callback) {
  document.getElementById("qr-screen").style.display = "block";
  console.log("start");

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        audio: false,
        video: {
          width: 200,
          height: 200,
        },
      },
      function (stream) {
        video = document.querySelector("video");
        video.srcObject = stream;

        video.onloadedmetadata = function (e) {
          video.play();

          var barcodeCanvas = document.createElement("canvas");
          intv = setInterval(() => {
            barcodeCanvas.width = video.videoWidth;
            barcodeCanvas.height = video.videoHeight;
            var barcodeContext = barcodeCanvas.getContext("2d");
            var imageWidth = Math.max(1, Math.floor(video.videoWidth)),
              imageHeight = Math.max(1, Math.floor(video.videoHeight));

            barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);

            var imageData = barcodeContext.getImageData(
              0,
              0,
              imageWidth,
              imageHeight
            );
            var idd = imageData.data;

            let code = jsQR(idd, imageWidth, imageHeight);
            console.log(code);

            if (code) {
              stop_scan();
              callback(code.data);
              clearInterval(intv);
              status.window_status = "settings";
            }
          }, 1000);
        };
      },
      function (err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
};
