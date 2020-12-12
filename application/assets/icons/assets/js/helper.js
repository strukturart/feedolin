function notify(param_title, param_text, param_silent) {

    var options = {
            body: param_text,
            silent: param_silent
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
                var notification = new Notification(param_title, options);


            }
        });
    }

}

//silent notification
function toaster(text) {

    $("div#toast").text(text)
    $("div#toast").animate({ top: "0px" }, 1000, "linear", function() {


        $("div#toast").delay(2000).animate({ top: "-100px" }, 1000);


    });

}


//check if internet connection 
function check_iconnection() {


    if (navigator.onLine) {


    } else {
        toaster("No Internet connection");
    }
}



//disable enable sleep mode
function lock_screen(param1) {
    var lock;
    if (param1 == "lock") {
        lock = window.navigator.requestWakeLock('screen');
    }

    if (param1 == "unlock") {
        lock.unlock();

    }
}