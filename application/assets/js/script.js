var redirection_counter = -1;
var debug = false;
var page = 0;
var pos_focus = 0
var article_array;
var window_status = "intro";
var content_arr = [];
var source_array = [];
var link_target;
var k = 0;
var panels = ["all"];
var current_panel = 0;
var activity = false;
var volume_status = false


let tab_index = 0
//xml items
var rss_title = "";
var item_title = "";
var item_summary = "";
var item_link = "";
var item_date_unix = "";
var item_duration = "";
var item_type = "";
var item_filesize = "";
var item_date_unix = "";
var item_category = "";

//youtube
var item_image = "";
var item_id = "";



$(document).ready(function() {


    //check if activity or not
    setTimeout(() => {


        if (activity === false) {

            //check if source file is set
            if (localStorage['source_local'] == undefined && localStorage['source'] == undefined) {
                show_settings()
                document.getElementById("message-box").style.display = "none"
                return false;
            }
            //get update time; cache || download
            let a = localStorage.getItem('interval');
            if (a == null) {
                a = 0
            }
            //download


            if (cache.getTime(a) && navigator.onLine) {
                if (localStorage["source"] && localStorage["source"] != "" && localStorage["source"] != undefined) {
                    load_source()
                    document.getElementById("message-box").style.display = "none"

                } else {
                    load_local_file()
                }
                //load cache
            } else {
                content_arr = cache.loadCache();
                if (content_arr) {
                    build();
                } else {
                    show_settings()
                    document.getElementById("message-box").style.display = "none"
                    alert("no cached data available")

                }



            }
        }

    }, 2000);


    ///////////
    ///load source file from online source
    //////////
    let load_source = function() {
        let source_url = localStorage.getItem('source')


        var xhttp = new XMLHttpRequest({
            mozSystem: true
        });

        xhttp.open('GET', source_url, true)
        xhttp.timeout = 5000;



        xhttp.onload = function() {


            if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {

                let data = xhttp.response;

                //check if json valid
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    $('#download').html("😴<br>Your json file is not valid")
                    setTimeout(() => {

                        document.getElementById("message-box").style.display = "none"
                        show_settings()

                    }, 3000);

                    return false;
                }

                start_download_content(data)


            }
        }

        if (xhttp.status == 0) {

        }



        xhttp.onerror = function() {
            $('#download').html("😴<br>the source file cannot be loaded")

            setTimeout(() => {
                document.getElementById("message-box").style.display = "none"
                show_settings()
            }, 2000);
        };

        xhttp.send();

    }


    ///////////
    ///load source file from local file
    //////////

    /////////////////////////
    function load_local_file() {

        let a = localStorage.getItem('source_local');



        if (localStorage.getItem('source_local') == "" || localStorage.getItem('source_local') == null) {
            document.getElementById("message-box").style.display = "none"
            show_settings()
            return false
        }



        var finder = new Applait.Finder({
            type: "sdcard",
            debugMode: true
        });


        finder.search(a);




        finder.on("searchBegin", function(needle) {
            alert(needle)
        });


        finder.on("empty", function(needle) {
            toaster("no sdcard found");
            document.getElementById("message-box").style.display = "none"
            show_settings()
            return;
        });



        finder.on("searchCancelled", function(message) {});


        finder.on("searchComplete", function(needle, filematchcount) {
            if (filematchcount == 0) {

                $('#download').html("😴<br>No source file founded,<br> please create a json file or set a url in the settings.")
                setTimeout(() => {

                    document.getElementById("message-box").style.display = "none"
                    show_settings()
                }, 3000);

            }
        });

        finder.on("error", function(message, err) {});



        finder.on("fileFound", function(file, fileinfo, storageName) {

            var reader = new FileReader()
            reader.onerror = function(event) {
                toaster('shit happens')
                reader.abort();
            };

            reader.onloadend = function(event) {

                let data;
                //check if json valid
                try {
                    data = JSON.parse(event.target.result);
                } catch (e) {
                    $('#download').html("😴<br>Your json file is not valid")
                    setTimeout(() => {
                        document.getElementById("message-box").style.display = "none"
                        show_settings()

                    }, 3000);
                    return false;
                }

                start_download_content(data)

            };
            reader.readAsText(file)
        });



    }




    let start_download_content = function(source_data) {


        $.each(source_data, function(i, item) {
            if (!item.category || item.category == "") {
                item.category = 0;
            }
            source_array.push([item.url, item.limit, item.channel, item.category]);
        });

        //check if internet connection 
        if (navigator.onLine) {
            //start download loop
            rss_fetcher(source_array[0][0], source_array[0][1], source_array[0][2], source_array[0][3])
        } else {
            $('#download').html("😴<br>Your device is offline, please connect it to the internet ")
        }
    }



    if (navigator.mozSetMessageHandler) {
        navigator.mozSetMessageHandler('activity', function(activityRequest) {
            var option = activityRequest.source;
            activity = true;

            if (option.name == 'view') {
                while (source_array.length > 0) {
                    source_array.pop();
                }
                source_array.push([option.data.url, 4, "", "all"]);
                rss_fetcher(source_array[0][0], source_array[0][1], source_array[0][2], source_array[0][3])
            }

        })
    }


    function formatFileSize(bytes, decimalPoint) {
        if (bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }



    //qr scan listener
    const qr_listener = document.querySelector("input#source");
    let qrscan = false;
    qr_listener.addEventListener("focus", (event) => {
        bottom_bar("save", "qr", "");
        qrscan = true
        toaster("press enter to open the qr-code-scanner, it is helpfull for a long url", 3000)


    });

    qr_listener.addEventListener("blur", (event) => {
        bottom_bar("save", "", "");
        qrscan = false


    });





    //////////////////////////////
    //download content////
    //////////////////////////////

    function rss_fetcher(param_url, param_limit, param_channel, param_category) {



        var xhttp = new XMLHttpRequest({
            mozSystem: true
        });

        xhttp.open('GET', param_url, true)
        xhttp.timeout = 2000;


        xhttp.responseType = 'document';
        xhttp.overrideMimeType('text/xml');

        xhttp.send(null);


        document.getElementById("message-box").style.display = "block";

        xhttp.addEventListener("error", transferFailed);
        xhttp.addEventListener("loadend", loadEnd);



        function transferFailed() {
            toaster("failed" + param_channel, 1000)

        }

        xhttp.onload = function() {
            if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {

                var data = xhttp.response;
                //rss atom items
                rss_title = $(data).find('title:first').text()

                let count = k + " / " + source_array.length

                $('#download').html("downloading<br><br>" + rss_title)
                $('div#count').text(count)

                //
                //atom
                //


                $(data).find('entry').each(function(index) {
                    item_media = "rss"
                    item_type = "";


                    if (index < param_limit) {

                        item_title = $(this).find('title').text();
                        item_summary = $(this).find('summary').text();
                        item_link = $(this).find('link').attr("href");
                        item_type = $(this).find('enclosure').attr('type')


                        //youtube

                        if (item_type == "audio/mpeg" ||
                            item_type == "audio/aac"
                        ) {
                            item_media = "podcast";
                        }


                        if (item_summary == "") {
                            item_summary = $(this).find('media\\:description').text()
                            item_image = $(this).find('media\\:thumbnail').attr('url');
                            item_id = $(this).find('yt\\:videoId').text();
                        }

                        if (item_link.includes("https://www.youtube.com") === true) {
                            item_media = "youtube";
                            item_link = "https://www.youtube.com/embed/" + item_id + "?enablejsapi=1&autoplay=1"
                        }

                        if (item_summary == "") {
                            item_summary = $(this).find('content').text();
                        }


                        if ($(this).find('enclosure').attr('length') != undefined) {
                            item_filesize = $(this).find('enclosure').attr('length');
                            item_filesize = formatFileSize(item_filesize, 2)
                        }


                        item_download = $(this).find('enclosure').attr('url')
                        item_date_unix = Date.parse($(this).find('updated').text());
                        item_date = new Date(item_date_unix)
                        item_date = item_date.toDateString();



                        if ($(this).find('itunes:\\duration') != undefined) {
                            item_duration = $(this).find('itunes\\:duration').text()
                            if (item_duration.includes(":") == false) item_duration = "";
                        }


                        content_arr.push({
                            title: item_title,
                            summary: item_summary,
                            link: item_link,
                            date: item_date,
                            dateunix: item_date_unix,
                            channel: param_channel,
                            category: param_category,
                            download: item_download,
                            type: item_type,
                            image: item_image,
                            id: item_id,
                            duration: item_duration,
                            media: item_media,
                            filesize: item_filesize
                        })

                    }

                })


                //
                //rss 2.0 items
                //
                $(data).find('item').each(function(index) {
                    item_media = "rss";
                    item_type = "";

                    if (index < param_limit) {
                        item_title = $(this).find('title').text();
                        item_summary = $(this).find('description').text();
                        item_link = $(this).find('link').text();
                        item_date_unix = Date.parse($(this).find('pubDate').text());
                        item_date = new Date(item_date_unix)
                        item_date = item_date.toDateString()
                        item_download = $(this).find('enclosure').attr('url');
                        item_type = $(this).find('enclosure').attr('type')

                        if (item_type == "audio/mpeg" ||
                            item_type == "audio/aac"
                        ) {
                            item_media = "podcast";
                        }



                        if ($(this).find('itunes:\\duration') != undefined) {
                            item_duration = $(this).find('itunes\\:duration').text()
                            if (item_duration.includes(":") == false) item_duration = "";
                        }

                        if ($(this).find('enclosure').attr('length') != undefined) {
                            item_filesize = $(this).find('enclosure').attr('length');
                            item_filesize = formatFileSize(item_filesize, 2)
                        }



                        content_arr.push({
                            title: item_title,
                            summary: item_summary,
                            link: item_link,
                            date: item_date,
                            dateunix: item_date_unix,
                            channel: param_channel,
                            category: param_category,
                            download: item_download,
                            type: item_type,
                            image: item_image,
                            id: item_id,
                            duration: item_duration,
                            media: item_media,
                            filesize: item_filesize
                        })
                    }

                });

            }

            if (xhttp.status === 404) {
                toaster(param_channel + " url not found", 3000);

            }

            if (xhttp.status === 408) {
                toaster(param_channel + "Time out", 3000);

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

            };


            if (xhttp.status === 0) {
                toaster(param_channel + " status: " + xhttp.status + xhttp.getAllResponseHeaders(), 3000);
            }


        };


        function loadEnd(e) {

            if (activity === true) {

                $('#download').html("The content is <br>not a valid rss feed <div style='font-size:2rem;margin:8px 0 0 0;color:white!Important;'>¯&#92;_(ツ)_/¯</div><br><br>The app will be closed in 4sec")
                setTimeout(() => {
                    window.close()
                }, 4000);
                return false;
            }


            //after download build html objects
            if (k == source_array.length - 1) {
                setTimeout(() => {

                    content_arr.sort((a, b) => {
                        return b.dateunix - a.dateunix;
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

        bottom_bar("settings", "select", "share")
        if (activity == true) bottom_bar("add", "select", "")

        $.each(content_arr, function(i) {

            //set panel category
            if (panels.includes(content_arr[i].category) === false && content_arr[i].category != 0) {
                panels.push(content_arr[i].category);
            }

            var article = '<article class="all" data-media="' + content_arr[i].media + '" data-order = "' + content_arr[i].dateunix + '" data-category = "' + content_arr[i].category + ' all" data-link = "' + content_arr[i].link + '" data-youtube-id= "' + content_arr[i].id + '" data-download="' + content_arr[i].download + '"data-audio-type="' + content_arr[i].type + '">' +
                '<div class="flex grid-col-10"><div class="podcast-icon"><img src="assets/image/podcast.png"></div>' +
                '<div class="youtube-icon"><img src="assets/image/youtube.png"></div></div>' +
                '<div class="channel">' + content_arr[i].channel + '</div>' +
                '<time>' + content_arr[i].date + '</time>' +
                '<div class="flex duration-filesize">' +
                '<div class="duration">' + content_arr[i].duration + '</div>' +
                '<div class="filesize">' + content_arr[i].filesize + '</div>' +
                '</div>' +
                '<h1 class="title">' + content_arr[i].title + '</h1>' +
                '<div class="summary">' + content_arr[i].summary +
                '<img class="lazyload" data-src="' + content_arr[i].image + '" src=""></div>' +
                '</article>'
            $('div#news-feed-list').append(article);
            $("div#news-feed-list article:first").focus()
            article_array = $('div#news-feed-list article')

        });

        set_tabindex()
        lazyload.ll()
        document.getElementById("message-box").style.display = "none"
        window_status = "article-list";
        top_bar("", "all", "")


    }


    function set_tabindex() {
        $('article').removeAttr("tabindex")
        $('article').filter(':visible').each(function(index) {
            $(this).prop("tabindex", index);

        })
        article_array = $('article').filter(':visible')
        $('body').find('article[tabindex = 0]').focus()
        $('div#app-panels article').find([tabindex = "0"]).focus()

        $('article:last').css("margin", "0 0 30px 0")
    }



    function panels_list(panel) {

        $("article").css("display", "none");
        $("[data-category~=" + panel + "]").css("display", "block")

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

        top_bar("", panels[current_panel], "")
        //$("div#navigation div").text(panels[current_panel]);
        panels_list(panels[current_panel]);
        set_tabindex();
        pos_focus = 0;

        document.activeElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });

    }


    ////////////
    //TABINDEX NAVIGATION
    ///////////
    function nav(move) {


        let elem = document.activeElement;

        // Setup siblings array and get the first sibling
        var siblings = [];

        var sibling = elem.parentNode.firstChild;

        // Loop through each sibling and push to the array
        while (sibling) {


            if (sibling.tabIndex != null && sibling.tabIndex != undefined && sibling.tabIndex > -1) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }


        if (move == "+1" && tab_index < siblings.length - 1 && siblings.length > 1) {

            tab_index++
            siblings[tab_index].focus()

            document.activeElement.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });


        }
        if (move == "-1" && tab_index > 0) {

            tab_index--
            siblings[tab_index].focus()
            siblings[tab_index].scrollIntoView({
                block: "start"
            });;

        }
    }










    function save_settings() {

        var setting_interval = document.getElementById("time").value;
        var setting_source = document.getElementById("source").value;
        var setting_source_local = document.getElementById("source-local").value;

        if (setting_source == "" && setting_source_local == "") {
            toaster("please fill in the location of the source file", 3000)
            return false;
        }

        if (setting_source != "") {
            if (!validate(setting_source)) {
                alert("url not valid")
                return false
            }

        }


        localStorage.setItem('interval', setting_interval);
        localStorage.setItem('source', setting_source);
        localStorage.setItem('source_local', setting_source_local);


        toaster("saved, the app will now be closed, the settings will be active the next time it is started.", 8000)
        setTimeout(() => {
            window.close()
        }, 7000);
        return true
    }


    function show_article() {

        navigator.spatialNavigationEnabled = false;

        var targetElement = document.activeElement
        link_target = $(targetElement).data('download');
        link_type = $(targetElement).data('audio-type');

        $('div#settings').css('display', 'none')
        $('article').css('display', 'none')
        $(':focus').css('display', 'block')
        $('div.summary').css('display', 'block')
        document.getElementById("top-bar").style.display = "none"

        if (document.activeElement.getAttribute("data-media") == " podcast") {

            if ($(":focus").hasClass("audio-playing")) {
                bottom_bar("pause", "", "download")

            } else {
                bottom_bar("play", "", "download")
            }


        }

        if (document.activeElement.getAttribute("data-media") == " rss") {
            bottom_bar("", "", "visit")
        }

        if (document.activeElement.getAttribute("data-media") == " youtube") {
            bottom_bar("", "", "open")
        }

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        window_status = "single-article";
    }



    function show_settings() {
        window_status = "settings";
        tab_index = 0;
        document.getElementById("top-bar").style.display = "none"

        $("div#news-feed").css("padding", "0px 0px 30px 0px")
        pos_focus = 0;
        $('article').css('display', 'none')
        $('div#settings').css('display', 'block')
        bottom_bar("save", "", "")
        document.getElementById("time").focus();
        if (localStorage.getItem('interval') != null) {
            document.getElementById("time").value = localStorage.getItem('interval')
        }

        if (localStorage.getItem('source') != null) {
            document.getElementById("source").value = localStorage.getItem('source')
        }

        if (localStorage.getItem('source_local') != null) {
            document.getElementById("source-local").value = localStorage.getItem('source_local')
        }

    }



    function show_article_list() {
        navigator.spatialNavigationEnabled = false;
        $("div#source-page div#iframe-wrapper").removeClass("video-view");
        document.getElementById("top-bar").style.display = "block"

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
            bottom_bar("settings", "select", "share")
        } else {
            bottom_bar("add", "select", "")
        }

        window_status = "article-list";


        document.activeElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });
    }




    function open_url() {
        let link_target = document.activeElement.getAttribute("data-link")
        let link_download = document.activeElement.getAttribute("data-download")
        let title = document.activeElement.querySelector("h1.title").textContent;
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
            var finder = new Applait.Finder({
                type: "music",
                debugMode: false
            });

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
                    download.downloadFile(link_download, title);
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
                if (window_status == "article-list") {
                    show_article();
                    break;

                }

                if (window_status == "settings" && qrscan == true) {
                    window_status = "scan"

                    qr.start_scan(function(callback) {
                        let slug = callback
                        document.getElementById("source").value = slug
                    });

                    break;
                }

                break;


            case 'ArrowLeft':
                if (window_status == "article-list") {
                    nav_panels("left")
                    break;
                }

                if (window_status == "single-article") {
                    seeking("backward")
                    break;
                }
                break;

            case 'ArrowRight':
                if (window_status == "article-list") {
                    nav_panels("right")
                    break;

                }

                if (window_status == "single-article") {
                    seeking("forward")
                    break;


                }
                break;

            case 'ArrowDown':
                if (window_status == "settings") {
                    nav("+1");
                    break;
                }


                if (window_status == "article-list") {
                    nav("+1");
                    break
                }


                if (volume_status === true) {
                    volume_control("down")
                    break;
                }

                break;





            case 'ArrowUp':

                if (window_status == "settings") {
                    nav("-1");

                    break;

                }

                if (window_status == "article-list") {
                    nav("-1");
                    break
                }

                if (volume_status === true) {
                    volume_control("up")
                    break;
                }
                break;


            case '#':
                volume.requestShow();
                volume_status = true;
                navigator.spatialNavigationEnabled = false;
                break;


            case 'SoftLeft':
            case 'n':
                if (window_status == "article-list") {


                    if (!activity) {
                        show_settings()
                    } else {
                        toaster(source_array[0][0], 3000)
                        add_source(source_array[0][0], 5, "all", rss_title)
                    }
                    break

                }

                if (window_status == "single-article" && $(":focus").hasClass("podcast")) {
                    play_podcast();
                    break

                }

                if (window_status == "settings") {
                    save_settings()
                    break

                }

                break;

            case 'SoftRight':
            case 'm':
                if (window_status == "single-article") {
                    open_url();
                    break
                }
                if (window_status == "settings") {
                    //show_article_list();
                    break
                }

                if (window_status == "article-list") {

                    share(document.activeElement.getAttribute('data-link'));
                    break
                }
                break;


            case 'Backspace':
                evt.preventDefault();

                if (window_status == "intro") {
                    window.close();
                    break;;
                }

                if (window_status == "article-list") {
                    goodbye();
                    break;
                }

                if (window_status == "settings") {
                    window.close();
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

                if (window_status == "scan") {
                    qr.stop_scan()
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