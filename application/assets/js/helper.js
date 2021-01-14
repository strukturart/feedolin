"use strict";


function validate(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) {
        return true;
    }
    return false;

}




function notify(param_title, param_text, param_silent, requireInteraction) {

    var options = {
        body: param_text,
        silent: param_silent,
        requireInteraction: requireInteraction


    }


    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(param_title, options);

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(param_title, options, action);

                document.addEventListener('visibilitychange', function() {
                    if (document.visibilityState === 'visible') {
                        // The tab has become visible so clear the now-stale Notification.                                                                                                                                      
                        notification.close();

                        toaster("yes", 2000)


                    }
                });


            }
        });
    }

}

//bottom bar
function bottom_bar(left, center, right) {
    $("div#bottom-bar div#button-left").text(left)
    $("div#bottom-bar div#button-center").text(center)
    $("div#bottom-bar div#button-right").text(right)
}


//silent notification
function toaster(text, time, height) {


    $("div#toast").html(text)

    $("div#toast").animate({
        top: "0px"
    }, 1000, "linear", function() {
        $("div#toast").delay(time).animate({
            top: "-110vh"
        }, 1000);

        $("div#toast").css("height", height)



    });



}



function share(url) {
    var activity = new MozActivity({
        name: "share",
        data: {
            type: "url",
            url: url
        }
    });

    activity.onsuccess = function() {

    };

    activity.onerror = function() {
        console.log("The activity encounter en error: " + this.error);
    };
}

let open_os_settings = function() {
    var act = new MozActivity({
        name: "configure",
        data: {
            target: "networkAndConnectivity",
            section: "bluetooth"
        }
    })

    act.onsuccess = function() {

    };

    act.onerror = function() {
        alert(JSON.stringify(this.error));
    };
}


//check if internet connection 
function check_iconnection() {




    function updateOfflineStatus() {
        toaster("Your Browser is offline", 15000)
        return false;
    }

    window.addEventListener('offline', updateOfflineStatus);
}


//wake up screen
function screenWakeLock(param1) {
    if (param1 == "lock") {
        lock = window.navigator.requestWakeLock("screen");

        lock.onsuccess = function() {
            toaster("screen-lock", 10000);

        };

        lock.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };
    }

    if (param1 == "unlock") {
        if (lock.topic == "screen") {
            lock.unlock();
        }
    }
}

function delete_file(filename) {

    var sdcard = navigator.getDeviceStorages('sdcard');
    var request = sdcard[1].delete(filename);

    request.onsuccess = function() {
        //toaster("File deleted", 2000);
    }

    request.onerror = function() {
        //toaster("Unable to delete the file: " + this.error, 2000);
    }

}

window.goodbye = function() {
    document.getElementById("goodbye").style.display = "block";

    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
        localStorage.clickcount = 1;
    }

    if (localStorage.clickcount == 3) {
        message();
    } else {
        document.getElementById("ciao").style.display = "block";
        setTimeout(function() {
            window.close();
        }, 4000);
    }

    function message() {
        document.getElementById("donation").style.display = "block";
        setTimeout(function() {
            localStorage.clickcount = 1;

            window.close();
        }, 6000);
    }
};







function get_file(filename) {

    var sdcard = navigator.getDeviceStorages('sdcard');
    var request = sdcard[1].get(filename);

    request.onsuccess = function() {
        var file = this.result;
        //alert("Get the file: " + file.name);
    }

    request.onerror = function() {
        //alert("Unable to get the file: " + this.error);
    }
}


function write_file(data, filename) {

    var sdcard = navigator.getDeviceStorages("sdcard");
    var file = new Blob([data], {
        type: "text/plain"
    });
    var request = sdcard[1].addNamed(file, filename);

    request.onsuccess = function() {
        var name = this.result;
        //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
    }

    // An error typically occur if a file with the same name already exist
    request.onerror = function() {
        toaster('Unable to write the file: ' + this.error, 2000);
    }

}


function add_source(url, limit, categorie, channel) {



    let sdcard = navigator.getDeviceStorages("sdcard");
    let request = sdcard[1].get("rss-reader.json");



    request.onsuccess = function() {

        let fileget = this.result;
        let reader = new FileReader();

        reader.addEventListener("loadend", function(event) {


            let data;
            //check if json valid
            try {
                data = JSON.parse(event.target.result);
            } catch (e) {
                toaster("Json is not valid", 2000)
                return false;
            }


            data.push({
                "categorie": categorie,
                "url": url,
                "limit": limit,
                "channel": channel
            });


            let extData = JSON.stringify(data);


            var request_del = sdcard[1].delete("rss-reader.json");

            request_del.onsuccess = function() {
                //toaster('File successfully removed.', 2000);

                let file = new Blob([extData], {
                    type: "application/json"
                });
                let requestAdd = sdcard[1].addNamed(file, "rss-reader.json");

                requestAdd.onsuccess = function() {

                    toaster('<br><br>the rss feed <br>has been successfully added to your list.', 3000);

                }

                requestAdd.onerror = function() {
                    toaster('Unable to write the file: ' + this.error);
                }
            }

            request_del.onerror = function() {
                //toaster('Unable to remove the file: ' + this.error);
            }

        })


        reader.readAsText(fileget);
    }

    request.onerror = function() {
        toaster(this.error, 3000)
    }



}