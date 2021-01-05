const download = (() => {

    //download media

    let downloadFile = function(url, filetitle) {
        var xhttp = new XMLHttpRequest({
            mozSystem: true
        });

        xhttp.open('GET', url, true)
        xhttp.withCredentials = true;
        xhttp.responseType = 'blob';
        toaster("download started", 3000);


        xhttp.onload = function() {
            if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {

                var blob = xhttp.response;

                var sdcard = navigator.getDeviceStorage("music");
                var file = new Blob([blob], {
                    type: "audio/mpeg"
                });
                toaster("done", 3000);

                var request = sdcard.addNamed(file, filetitle + ".mp3");

                request.onsuccess = function() {
                    notify("RSS - Reader", "successfully wrote on the storage area", false, false)
                }

                // An error typically occur if a file with the same name already exist
                request.onerror = function() {
                    alert('Unable to write the file: ' + this.error);
                }
            }

            if (xhttp.status === 404) {
                toaster(" url not found" + xhttp.getAllResponseHeaders(), 3000);
            }

            ////Redirection
            if (xhttp.status === 301) {
                toaster(" redirection", 3000);
            }

            if (xhttp.status === 0) {
                toaster(" status: " + xhttp.status + xhttp.getAllResponseHeaders(), 30000);
            }

        };

        xhttp.onerror = function() {
            toaster(" status: " + xhttp.status + xhttp.getAllResponseHeaders(), 3000);
        };

        xhttp.addEventListener("progress", updateProgress);

        function updateProgress(oEvent) {
            if (oEvent.lengthComputable) {
                var percentComplete = oEvent.loaded / oEvent.total * 100;
                toaster(percentComplete, 1000)

            } else {
                toaster("loading....", 1000)
            }
        }

        xhttp.send(null)
    }



    return {
        downloadFile
    };
})();