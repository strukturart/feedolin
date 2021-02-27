var redirection_counter = -1;
var page = 0;
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
var item_cid = "";

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
    let load_local_file = function() {

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
        if (bytes == 0) return false;
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

    let rss_fetcher = function(param_url, param_limit, param_channel, param_category) {

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
                rss_title = data.querySelector("title").innerHTML
                let count = k + " / " + source_array.length

                document.getElementById("download").innerText = rss_title
                bottom_bar("", count, "")
                let test = data.querySelectorAll("entry")
                /*
                test.forEach(function(el, index) {
                    item_media = "rss";
                    item_type = "";


                    if (index < param_limit) {

                        //rss
                        item_title = el.querySelector("title").innerHTML
                        item_cid = hashCode(item_title)
                        item_summary = el.querySelector("summary").innerHTML;
                        item_link = el.querySelector("link").getAttribute("href");

                        console.log("hey")


                        //check valid date
                        if (el.querySelector("updated").innerHTML == "") {
                            item_date_unix = new Date().valueOf();
                        } else {
                            item_date_unix = Date.parse(el.querySelector("updated").innerHTML);
                        }


                       
                                                item_date = new Date(item_date_unix)
                                                item_date = item_date.toDateString();

                                                item_download = el.querySelector("enclosure").getAttribute("url");
                                                item_type = el.querySelector("enclosure").getAttribute("type")

                                                if (item_type == "audio/mpeg" || item_type == "audio/aac" || item_type == "audio/x-mpeg") {
                                                    item_media = "podcast";
                                                }

                                                if ($(this).find('itunes:\\duration') != undefined) {
                                                    item_duration = $(this).find('itunes\\:duration').text()
                                                    if (item_duration.includes(":") == false) item_duration = "";
                                                }

                                                if (el.querySelector('enclosure').getAttribute('length') != undefined && el.querySelector('enclosure').getAttribute('length') != "") {
                                                    item_filesize = el.querySelector('enclosure').getAttribute('length');
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
                            filesize: item_filesize,
                            cid: item_cid

                        })

                    }

                });

*/



                ////////////
                //RSS
                ///////////

                test = data.querySelectorAll("item")
                test.forEach(function(el, index) {
                    item_media = "rss";
                    item_type = "";



                    if (index < param_limit) {


                        //rss
                        item_title = el.querySelector("title").innerHTML
                        item_cid = hashCode(item_title)
                        item_summary = el.querySelector("description").innerHTML;
                        item_link = el.querySelector("link").getAttribute("href");

                        //check valid date
                        if (el.querySelector("pubDate").innerHTML == "") {
                            item_date_unix = new Date().valueOf();
                        } else {
                            item_date_unix = Date.parse(el.querySelector("pubDate").innerHTML);
                        }

                        item_date = new Date(item_date_unix)
                        item_date = item_date.toDateString();

                        item_download = el.querySelector("enclosure").getAttribute("url");
                        item_type = el.querySelector("enclosure").getAttribute("type")

                        if (item_type == "audio/mpeg" || item_type == "audio/aac" || item_type == "audio/x-mpeg") {
                            item_media = "podcast";
                        }

                        if ($(this).find('itunes:\\duration') != undefined) {
                            item_duration = $(this).find('itunes\\:duration').text()
                            if (item_duration.includes(":") == false) item_duration = "";
                        }

                        if (el.querySelector('enclosure').getAttribute('length') != undefined && el.querySelector('enclosure').getAttribute('length') != "") {
                            item_filesize = el.querySelector('enclosure').getAttribute('length');
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
                            filesize: item_filesize,
                            cid: item_cid

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
    let listened_elements = "";


    if (localStorage["listened"]) {
        listened_elements = JSON.parse(localStorage["listened"])

    } else {
        listened_elements = [];
    }



    function build() {
        //$("div#navigation div").text(panels[0]);
        bottom_bar("settings", "select", "share")
        top_bar("", panels[0], "")



        if (activity == true) bottom_bar("add", "select", "")

        $.each(content_arr, function(i) {
            console.log(content_arr[i].category)

            //set icon if the article has already been listened to
            let icon = "";
            let ti = content_arr[i].cid
            ti.toString()
            for (let k = 0; k < listened_elements.length; k++) {
                if (listened_elements[k] == ti) {
                    icon = "  &#127812;"
                }

            }



            //set panel category
            if (panels.includes(content_arr[i].category) === false && content_arr[i].category != 0) {
                panels.push(content_arr[i].category);
            }

            let article = '<article class="all" tabindex="' + i + '" data-media="' + content_arr[i].media + '" data-order = "' + content_arr[i].dateunix + '" data-category = "' + content_arr[i].category + ' all" data-id="' + content_arr[i].cid + '" data-link = "' + content_arr[i].link + '" data-youtube-id= "' + content_arr[i].id + '" data-download="' + content_arr[i].download + '"data-audio-type="' + content_arr[i].type + '">' +
                '<div class="flex grid-col-10"><div class="podcast-icon"><img src="assets/image/podcast.png"></div>' +
                '<div class="youtube-icon"><img src="assets/image/youtube.png"></div></div>' +
                '<div class="channel">' + content_arr[i].channel + '<span>' + icon + '</span></div>' +
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

        //set_tabindex()
        lazyload.ll()
        document.getElementById("message-box").style.display = "none"
        window_status = "article-list";
        top_bar("", "all", "")

        let p = document.querySelectorAll('article')
        p[0].focus()


    }

    /*
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

               */
    let set_tabindex = function() {
        let divs = document.querySelectorAll('article')
        let t = -1;
        for (let i = 0; i < divs.length + 1; ++i) {
            divs[i].removeAttribute("tabindex");
            if (divs[i].style.display === "block") {
                t++
                divs[i].tabIndex = t
                document.querySelector('article[tabIndex="0"]').focus()
            }
        }
    }



    function panels_list(panel) {

        let elem = document.querySelectorAll("article");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "none";
        }

        elem = document.querySelectorAll("[data-category~=" + panel + "]");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "block";
        }

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
        tab_index = 0;


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










    let save_settings = function() {

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


    let show_article = function() {
        window_status = "single-article";
        navigator.spatialNavigationEnabled = false;

        document.querySelector("div#news-feed").style.background = "silver";
        link_target = document.activeElement.getAttribute('data-download');
        link_type = document.activeElement.getAttribute('data-audio-type');


        let elem = document.querySelectorAll("article");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "none";
        }

        elem = document.querySelectorAll("div.summary");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "block";
        }


        document.activeElement.style.display = "block"
        document.getElementById("top-bar").style.display = "none"
        document.getElementById("settings").style.display = "none"

        if (document.activeElement.getAttribute("data-media") == "podcast") {

            if (document.activeElement.classList.contains("audio-playing")) {
                bottom_bar("pause", "", "download")

            } else {
                bottom_bar("play", "", "download")
            }


        }

        if (document.activeElement.getAttribute("data-media") == "rss") {
            bottom_bar("", "", "visit")
        }

        if (document.activeElement.getAttribute("data-media") == "youtube") {
            bottom_bar("", "", "open")
        }

        document.activeElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    let show_article_list = function() {

        document.querySelector("div#news-feed").style.background = "white";
        navigator.spatialNavigationEnabled = false;
        document.querySelector("div#source-page div#iframe-wrapper").classList.remove("video-view");
        document.getElementById("top-bar").style.display = "block"

        let elem = document.querySelectorAll("article");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "block";
        }

        elem = document.querySelectorAll("div.summary");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "none";
        }

        document.querySelector('div#settings').style.display = "none"
        panels_list(panels[current_panel]);

        article_array[tab_index];
        document.querySelector("div#source-page").style.display = "none"
        document.querySelector("div#source-page iframe").setAttribute("src", "")


        if (!activity) {
            bottom_bar("settings", "select", "share")
        } else {
            bottom_bar("add", "select", "")
        }

        window_status = "article-list";

        document.activeElement.focus();
        document.activeElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });

        set_tabindex();

        tabIndex = document.activeElement.getAttribute("tabIndex")


    }



    let show_settings = function() {
        window_status = "settings";
        tab_index = 0;
        document.getElementById("top-bar").style.display = "none"

        $("div#news-feed").css("padding", "0px 0px 30px 0px")

        let elem = document.querySelectorAll("article");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "none";
        }
        document.getElementById("settings").style.display = "block"

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



    function open_url() {
        let link_target = document.activeElement.getAttribute("data-link")
        let link_download = document.activeElement.getAttribute("data-download")
        let title = document.activeElement.querySelector("h1.title").textContent;
        title = title.replace(/\s/g, "-");
        bottom_bar("", "", "")


        let elem = document.querySelectorAll("div.summary");
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.display = "none";
        }
        document.querySelector("div#source-page").style.display = "block"
        document.querySelector("div#source-page div#iframe-wrapper").style.height = "100vh"




        if (document.activeElement.getAttribute("data-media") == "rss") {
            document.querySelector("div#source-page iframe").setAttribute("src", link_target)
            document.querySelector('div#bottom-bar').style.display = "none"
            document.querySelector("div#source-page div#iframe-wrapper").style.height = "1000vh"
            document.querySelector("div#source-page iframe").style.height = "1000vh"
            navigator.spatialNavigationEnabled = true;
            window_status = "source-page";
            return;

        }


        if (document.activeElement.getAttribute("data-media") == "youtube") {
            document.querySelector("div#source-page iframe").setAttribute("src", link_target)
            document.querySelector("div#source-page div#iframe-wrapper").classList.add("video-view");
            navigator.spatialNavigationEnabled = true;
            window_status = "source-page";
            player.src = "";
            return;
        }



        if (document.activeElement.getAttribute("data-media") == "podcast") {
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
                    audio_player.volume_control("down")
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
                    audio_player.volume_control("up")
                    break;
                }
                break;


            case '#':
                navigator.volumeManager.requestShow();
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

                if (window_status == "single-article" && document.activeElement.getAttribute("data-media") == "podcast") {
                    audio_player.play_podcast();
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
                    bottom_bar("", "", "")
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









});