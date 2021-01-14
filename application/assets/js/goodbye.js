const goodbye = (() => {


    document.getElementById("goodbye").style.display = "block";

    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
        localStorage.clickcount = 1;
    }

    if (localStorage.clickcount == 3) {
        document.getElementById("donation").style.display = "block";
        setTimeout(function() {
            localStorage.clickcount = 1;

            window.close();
        }, 6000)
    } else {
        document.getElementById("ciao").style.display = "block";
        setTimeout(function() {
            window.close();
        }, 4000);
    }


}
})();