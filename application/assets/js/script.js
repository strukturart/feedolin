var redirection_counter = -1;
var debug = false;
var page = 0;
var pos_focus = 0
var article_array;
var window_status = "article-list";
var content_arr = [];
var source_array = [];
var link_target;
var k = 0;
var panels = ["all"];
var current_panel = 0;
var log_data = [];
var log = true;
var activity = false;
var volume_status = false
var rss_title = "";



$(document).ready(function() {


    //check if activity or not
    setTimeout(() => {

        if (activity === false) {
            //get update time; cache || download
            let a = localStorage.getItem('interval');
            if (a == null) {
                a = 0
            }
            //download
            if (cache.getTime(a)) {
                finder()
                toaster("download", 5000)

                //cache
            } else {
                content_arr = cache.loadCache();
                build();
                toaster("load from cache", 5000)
            }
        }

    }, 3000);




    /////////////////////////
    function finder() {

        var finder = new Applait.Finder({ type: "sdcard", debugMode: false });


        finder.on("empty", function(needle) {
            toaster("no sdcard found");
            return;
        });

        finder.search("rss-reader.json");

        finder.on("searchComplete", function(needle, filematchcount) {
            if (filematchcount == 0) {
                $('#download').html("😴<br>No json file founded")
            }
        });



        finder.on("fileFound", function(file, fileinfo, storageName) {

            var reader = new FileReader()


            reader.onerror = function(event) {
                toaster('shit happens')
                reader.abort();
            };

            reader.onloadend = function(event) {

                var data;
                //check if json valid
                try {
                    data = JSON.parse(event.target.result);
                } catch (e) {
                    $('#download').html("😴<br>Your json file is not valid")
                    return false;
                }

                $.each(data, function(i, item) {
                    if (!item.categorie) {
                        item.categorie = 0;
                    }
                    source_array.push([item.url, item.limit, item.channel, item.categorie]);
                });

                //check if internet connection 
                if (navigator.onLine) {
                    //start download loop
                    rss_fetcher(source_array[0][0], source_array[0][1], source_array[0][2], source_array[0][3])
                } else {
                    $('#download').html("😴<br>Your device is offline, please connect it to the internet ")
                }

            };
            reader.readAsText(file)
        });

    }




    navigator.mozSetMessageHandler('activity', function(activityRequest) {
        var option = activityRequest.source;
        activity = true;

        if (option.name == 'view') {
            while (source_array.length > 0) {
                source_array.pop();
            }
            source_array.push([option.data.url, 4, "", "all"]);
            rss_fetcher(source_array[0][0], source_array[0][1], source_array[0][2], source_array[0][3])
            bottom_bar("add", "select", "")
        }

    })




    //////////////////////////////
    //download content////
    //////////////////////////////

    function rss_fetcher(param_url, param_limit, param_channel, param_categorie) {



        var xhttp = new XMLHttpRequest({ mozSystem: true });

        xhttp.open('GET', param_url, true)
        xhttp.withCredentials = true;
        xhttp.timeout = 2000;
        xhttp.setRequestHeader("Cache-control", "public, max-age=31536000")


        xhttp.responseType = 'document';
        xhttp.overrideMimeType('text/xml');

        xhttp.send(null);


        $("div#message-box").css('display', 'block')

        xhttp.addEventListener("load", transferComplete);
        xhttp.addEventListener("error", transferFailed);
        xhttp.addEventListener("loadend", loadEnd);


        function transferComplete() {

        }

        function transferFailed() {
            toaster("failed" + param_channel, 1000)

        }





        xhttp.onload = function() {

            log_data.push(["", xhttp.staus, param_channel, "\n"])


            if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {

                var data = xhttp.response;
                rss_type = "";
                //rss atom items
                rss_title = $(data).find('title:first').text()

                let count = k + " / " + source_array.length

                $('#download').html("downloading<br><br>" + rss_title)
                $('div#count').text(count)

                $(data).find('entry').each(function(index) {
                    rss_type = "atom"

                    if (index < param_limit) {

                        var item_title = $(this).find('title').text();
                        var item_summary = $(this).find('summary').text();

                        //youtube
                        var item_image = "";
                        var item_id = "";
                        if (item_summary == "") {
                            item_summary = $(this).find('media\\:description').text()
                            item_image = $(this).find('media\\:thumbnail').attr('url');
                            item_id = $(this).find('yt\\:videoId').text();
                        }

                        if (item_summary == "") {
                            item_summary = $(this).find('content').text();
                        }


                        var item_link = $(this).find('link').attr("href");
                        var item_download = $(this).find('enclosure').attr('url')
                        var item_date_unix = Date.parse($(this).find('updated').text());
                        item_date = new Date(item_date_unix)
                        item_date = item_date.toGMTString();
                        var item_type = $(this).find('enclosure').attr('type')

                        content_arr.push([item_title, item_summary, item_link, item_date, item_date_unix, param_channel, param_categorie, item_download, item_type, item_image, item_id])

                    }

                })



                //rss 2.0 items
                $(data).find('item').each(function(index) {
                    rss_type = "rss"
                    if (index < param_limit) {
                        var item_title = $(this).find('title').text();
                        var item_summary = $(this).find('description').text();
                        var item_link = $(this).find('link').text();
                        var item_date_unix = Date.parse($(this).find('pubDate').text());
                        item_date = new Date(item_date_unix)
                        item_date = item_date.toGMTString()
                        var item_download = $(this).find('enclosure').attr('url');
                        var item_type = $(this).find('enclosure').attr('type')


                        content_arr.push([item_title, item_summary, item_link, item_date, item_date_unix, param_channel, param_categorie, item_download, item_type])
                    }

                });




            }

            if (xhttp.status === 404) {
                toaster(param_channel + " url not found", 3000);
                log_data.push(["url not found", xhttp.staus, param_channel, "\n"]);

            }

            if (xhttp.status === 408) {
                toaster(param_channel + "Time out", 3000);
                log_data.push(["timeout", xhttp.staus, param_channel, "\n"]);

            }

            if (xhttp.status === 409) {
                toaster(param_channel + "Conflict", 3000);
            }

            ////Redirection
            if (xhttp.status === 301) {
                toaster(param_channel + " redirection", 3000);
                rss_fetcher(xhttp.getResponseHeader('Location'), param_limit, param_channel)


            }

            xhttp.ontimeout = function(e) {
                toaster(param_channel + "Time out", 3000);
                log_data.push(["timeout", param_channel, "\n"]);

            };


            if (xhttp.status === 0) {
                toaster(param_channel + " status: " + xhttp.status + xhttp.getAllResponseHeaders(), 3000);
            }

            if (xhttp.status !== 200) {
                log_data.push([xhttp.getResponseHeader('Location'), xhttp.staus, param_channel, "\n"]);
            }


        };


        function loadEnd(e) {

            if (rss_type == "" && activity === true) {

                $('#download').html("The content is <br>not a valid rss feed <div style='font-size:2rem;margin:8px 0 0 0;color:white!Important;'>¯&#92;_(ツ)_/¯</div><br>")
                return false;
            }


            //after download build html objects
            if (k == source_array.length - 1) {
                setTimeout(() => {

                    content_arr = content_arr.sort(function(a, b) {
                        return b[4] - a[4];
                    });

                    build()
                    cache.saveCache(content_arr)


                }, 1500);




            }
            if (k < source_array.length - 1) {
                k++;
                rss_fetcher(source_array[k][0], source_array[k][1], source_array[k][2], source_array[k][3])
            }
        }

    }




    //sort content by date
    //build   
    //write html

    function build() {
        $("div#navigation div").text(panels[0]);


        $.each(content_arr, function(i, item) {
            var item_title = content_arr[i][0];
            var item_summary = content_arr[i][1];
            var item_link = content_arr[i][2];
            var item_date = content_arr[i][3];
            var item_date_unix = content_arr[i][4];
            var param_channel = content_arr[i][5];
            var item_categorie = content_arr[i][6]
            var item_download = content_arr[i][7]
            var item_type = content_arr[i][8];
            var item_image = content_arr[i][9];
            var item_id = content_arr[i][10];


            var media = " rss";

            if (panels.includes(item_categorie) === false) {
                if (item_categorie != 0) {
                    panels.push(item_categorie);
                }
            }

            if (item_type == "audio/mpeg" ||
                item_type == "audio/aac"
            ) {
                media = " podcast";
            }

            if (item_link.includes("https://www.youtube.com") === true) {
                media = " youtube";
                item_link = "https://www.youtube.com/embed/" + item_id + "?enablejsapi=1&autoplay=1"
            }

            /*
            if (item_link.includes("https://www.reddit.com") === true) {
                media = " reddit";
                item_link = "https://www.youtube.com/embed/" + item_id + "?enablejsapi=1&autoplay=1"
            }*/



            var article = '<article class="' + item_categorie + media + ' all" data-order = "' + item_date_unix + '" data-link = "' + item_link + '" data-youtube-id= "' + item_id + '" data-download="' + item_download + '"data-audio-type="' + item_type + '">' +
                '<div class="flex grid-col-10"><div class="podcast-icon"><img src="assets/image/podcast.png"></div>' +
                '<div class="youtube-icon"><img src="assets/image/youtube.png"></div></div>' +
                '<div class="channel">' + param_channel + '</div>' +
                '<time>' + item_date + '</time>' +
                '<h1 class="title">' + item_title + '</h1>' +
                '<div class="summary">' + item_summary +
                '<img class="lazyload" data-src="' + item_image + '" src=""></div>' +
                '</article>'
            $('div#news-feed-list').append(article);
            $("div#news-feed-list article:first").focus()
            article_array = $('div#news-feed-list article')



        });


        set_tabindex()
        lazyload.ll()
        document.getElementById("message-box").style.display = "none"


    }


    function set_tabindex() {
        $('article').removeAttr("tabindex")
        $('article').filter(':visible').each(function(index) {
            $(this).prop("tabindex", index);

        })
        article_array = $('article').filter(':visible')
        $('body').find('article[tabindex = 0]').focus()
        $('article:last').css("margin", "0 0 30px 0")
    }



    function panels_list(panel) {

        $("article").css("display", "none");
        $("article." + panel).css("display", "block")
        $('div#app-panels article').find([tabindex = "0"]).focus()

    }



    ////////////////////////
    //NAVIGATION
    /////////////////////////



    function nav_panels(left_right) {
        if (left_right == "left") {
            current_panel--;
        }

        if (left_right == "right") {
            current_panel++;
        }

        current_panel = current_panel % panels.length;
        if (current_panel < 0) {
            current_panel += panels.length;
        }


        $("div#navigation div").text(panels[current_panel]);
        panels_list(panels[current_panel]);
        set_tabindex();
        pos_focus = 0;
    }




    function nav(move) {

        var settings_array = $("div#settings [tabIndex]")

        if (window_status == "settings") {
            if (move == "+1" && pos_focus < settings_array.length - 1) {
                pos_focus++
                var targetElement = settings_array[pos_focus];
                targetElement.focus();

                var focusedElement = $(':focus')[0].offsetTop + 20;


                window.scrollTo({
                    top: focusedElement,
                    left: 100,
                    behavior: 'smooth'
                });

            }

            if (move == "-1" && pos_focus > 0) {
                pos_focus--
                var targetElement = settings_array[pos_focus];
                targetElement.focus();

                var focusedElement = $(':focus')[0].offsetTop - 20;
                window.scrollTo({
                    top: focusedElement,
                    left: 100,
                    behavior: 'smooth'
                });

            }


        }
        if (window_status == "article-list") {
            var $focused = $(':focus')[0];



            if (move == "+1" && pos_focus < article_array.length - 1) {
                pos_focus++

                if (pos_focus <= article_array.length) {

                    var focusedElement = $(':focus')[0].offsetTop + 20;


                    window.scrollTo({
                        top: focusedElement,
                        left: 100,
                        behavior: 'smooth'
                    });


                    var targetElement = article_array[pos_focus];
                    targetElement.focus();


                }
            }

            if (move == "-1" && pos_focus > 0) {
                pos_focus--
                if (pos_focus >= 0) {
                    var targetElement = article_array[pos_focus];
                    targetElement.focus();
                    var focusedElement = $(':focus')[0].offsetTop;
                    window.scrollTo({ top: focusedElement + 20, behavior: 'smooth' });

                }
            }
        }


    }



    bottom_bar("settings", "select", "")



    //download media

    function downloadFile(url, filetitle) {
        var xhttp = new XMLHttpRequest({ mozSystem: true });

        xhttp.open('GET', url, true)
        xhttp.withCredentials = true;
        xhttp.responseType = 'blob';
        toaster("download started", 3000);


        xhttp.onload = function() {
            if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {

                var blob = xhttp.response;

                var sdcard = navigator.getDeviceStorage("music");
                var file = new Blob([blob], { type: "audio/mpeg" });
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





    function save_settings() {

        var setting_interval = $("div#input-wrapper #time").val();

        if (setting_interval != "") {
            localStorage.setItem('interval', setting_interval);
            toaster("saved", 3000)
        } else {
            toaster("please fill in all fields", 3000)
        }
    }


    function show_article() {
        navigator.spatialNavigationEnabled = false;

        $("div#navigation").css("display", "none");
        $("div#news-feed").css("padding", "5px 5px 30px 5px")

        var targetElement = article_array[pos_focus];
        link_target = $(targetElement).data('download');
        link_type = $(targetElement).data('audio-type');

        if ($(":focus").hasClass("podcast")) {

            if ($(":focus").hasClass("audio-playing")) {
                bottom_bar("pause", "", "download")

            } else {
                bottom_bar("play", "", "download")
            }


        }

        if ($(":focus").hasClass("rss") || $(":focus").hasClass("youtube")) {
            bottom_bar("", "", "visit source")
        }

        window.scrollTo(0, 0);

        var $focused = $(':focus');
        $('article').css('display', 'none')
        $focused.css('display', 'block')
        $('div.summary').css('display', 'block')
        $('div#bottom-bar').css('display', 'block')
        $('div#settings').css('display', 'none')
        window_status = "single-article";
    }



    function show_settings() {
        $("div#navigation").css("display", "none");
        $("div#news-feed").css("padding", "5px 5px 30px 5px")
        pos_focus = 0;
        $('article').css('display', 'none')
        $('div#settings').css('display', 'block')
        bottom_bar("save", "", "back")
        $("div#bottom-bar").css("display", "block")
        $("div#input-wrapper input#time").focus();
        if (localStorage.getItem('interval') != null) {
            document.getElementById("time").value = localStorage.getItem('interval')
        }


        window_status = "settings";

    }



    function show_article_list() {
        navigator.spatialNavigationEnabled = false;
        $("div#source-page div#iframe-wrapper").removeClass("video-view");


        $("div#navigation").css("display", "block");
        $("div#news-feed").css("padding", "35px 5px 30px 5px")

        $('article').css('display', 'block')
        $('div.summary').css('display', 'none')
        $('div#bottom-bar').css('display', 'block')
        $('div#settings').css('display', 'none')

        panels_list(panels[current_panel]);
        set_tabindex();

        var targetElement = article_array[pos_focus];
        targetElement.focus();
        window.scrollTo(0, $(targetElement).offset().top);

        $("div#source-page").css("display", "none")
        $("div#source-page iframe").attr("src", "")


        if (!activity) {
            bottom_bar("settings", "select", "")
        } else {
            bottom_bar("add", "select", "")
        }

        window_status = "article-list";
    }




    function open_url() {
        var targetElement = article_array[pos_focus];
        var link_target = $(targetElement).data('link');
        var link_download = $(targetElement).data('download');
        var title = $(targetElement).find("h1.title").text();
        title = title.replace(/\s/g, "-");



        if ($(":focus").hasClass("rss")) {
            $('div.summary').css('display', 'none')
            $("div#source-page").css("display", "block")
            $("div#source-page iframe").attr("src", link_target)
            $('div#bottom-bar').css('display', 'none')
            $("div#source-page div#iframe-wrapper").css("height", "1000vh")
            $("div#source-page iframe").css("height", "1000vh")
            navigator.spatialNavigationEnabled = true;

            window_status = "source-page";
            return;

        }


        if ($(":focus").hasClass("youtube")) {
            $('div.summary').css('display', 'none')
            $("div#source-page").css("display", "block")
            $("div#source-page iframe").attr("src", link_target)
            $('div#bottom-bar').css('display', 'none')
            $("div#source-page div#iframe-wrapper").css("height", "100vh")
            $("div#source-page iframe").css("height", "100vh")
            $("div#source-page div#iframe-wrapper").addClass("video-view");
            navigator.spatialNavigationEnabled = true;
            window_status = "source-page";
            player.src = "";
            return;



        }



        if ($(":focus").hasClass("podcast")) {
            var finder = new Applait.Finder({ type: "music", debugMode: false });

            finder.on("empty", function(needle) {
                toaster("no sdcard found");
                return;
            });

            finder.search(title);

            finder.on("fileFound", function(file, fileinfo, storageName) {

                toaster("The file is already available", 3000);
                return false;
            });

            finder.on("searchComplete", function(needle, filematchcount) {
                if (filematchcount == 0) {
                    downloadFile(link_download, title);
                }
            });

            return;
        }




    }





    //////////////////////////
    ////KEYPAD TRIGGER////////////
    /////////////////////////



    function handleKeyDown(evt) {

        switch (evt.key) {


            case 'Enter':
                if (window_status == "article-list") { show_article(); }


                if (window_status == "settings" && $('input[type=checkbox]').is(":focus")) {
                    if ($('input[type=checkbox]').is(':checked')) {
                        $('input[type=checkbox]').prop('checked', false);
                        setting_status = "false";
                        removeAlarms();

                    } else {
                        $('input[type=checkbox]').prop('checked', true);
                        setting_status = "true";
                    }

                    save_settings();

                }
                break;

            case 'ArrowLeft':
                if (window_status == "article-list") {
                    nav_panels("left")
                }

                if (window_status == "single-article") {
                    seeking("backward")

                }


                break;

            case 'ArrowRight':
                if (window_status == "article-list") {
                    nav_panels("right")
                }

                if (window_status == "single-article") {
                    seeking("forward")

                }
                break;

            case 'ArrowDown':
                nav("+1");
                if (volume_status === true) {
                    volume_control("down")
                }
                break;


            case 'ArrowUp':
                nav("-1");
                if (volume_status === true) {
                    volume_control("up")
                }


                break;

            case '#':
                volume.requestShow();
                volume_status = true;
                navigator.spatialNavigationEnabled = false;
                break;


            case 'SoftLeft':
                if (window_status == "article-list") {


                    if (!activity) {
                        show_settings()
                    } else {
                        toaster(source_array[0][0], 3000)
                        add_source(source_array[0][0], 5, "all", rss_title)
                    }
                    return;

                }

                if (window_status == "single-article" && $(":focus").hasClass("podcast")) {
                    play_podcast();
                    return;

                }

                if (window_status == "settings") {
                    save_settings()
                    return;

                }

                break;

            case 'SoftRight':
                if (window_status == "single-article") {
                    open_url();
                    return
                }
                if (window_status == "settings") {
                    show_article_list();
                    return;
                }
                break;


            case 'Backspace':
                evt.preventDefault();
                if (window_status == "article-list") {
                    window.close();
                    break;;
                }

                if (window_status == "settings") {
                    show_article_list();
                    break;
                }

                if (window_status == "single-article") {
                    show_article_list();
                    break;
                }

                if (window_status == "source-page") {
                    show_article_list();
                    break;
                }

                break;

        }

    };



    document.addEventListener('keydown', handleKeyDown);



    //////////////////////////
    ////BUG OUTPUT////////////
    /////////////////////////
    if (debug) {

        $(window).on("error", function(evt) {

            console.log("jQuery error event:", evt);
            var e = evt.originalEvent; // get the javascript event
            console.log("original event:", e);
            if (e.message) {
                alert("Error:\n\t" + e.message + "\nLine:\n\t" + e.lineno + "\nFile:\n\t" + e.filename);
            } else {
                alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
            }
        });
    }



});