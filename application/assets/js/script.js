$(document).ready(function() {


    //Global Vars
    var redirection_counter = -1;
    var i = -1;
    var debug = false;
    var page = 0;
    var pos_focus = 0
    var article_array;
    var tabindex_i = -0;
    var window_status = "article-list";
    var redirections_arr = [];
    var source_list = [];

    check_iconnection();

    //get search feature settings
    var setting_status;
    var get_setting_status;
    var get_interval;
    var get_search;

    function get_settings() {
        get_search = localStorage.getItem('search');
        get_interval = localStorage.getItem('interval');
        get_setting_status = localStorage.getItem('status');

        $("div#input-wrapper #search").val(get_search)
        $("div#input-wrapper #time").val(get_interval)

        if (get_setting_status == "true") {
            $('input[type=checkbox]').prop('checked', true);
        } else {
            $('input[type=checkbox]').prop('checked', false);

        }

    }
    get_settings()


    /////////////////////////
    function finder() {

        var finder = new Applait.Finder({ type: "sdcard", debugMode: false });


        finder.on("empty", function(needle) {
            toaster("no sdcard found");
            return;
        });

        finder.search("rss-reader.json");



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
                    toaster("Json is not valid")
                    return false;
                }

                var app_list_filter = data
                $.each(app_list_filter, function(i, item) {
                    rss_fetcher(item.url, item.limit, item.channel, false)

                    source_list.push([item.url, item.limit, item.channel, false])

                });



            };
            reader.readAsText(file)
        });


    }


    finder();

    //////////////////////////////
    //rss-fetch////
    //////////////////////////////

    function rss_fetcher(param_url, param_limit, param_channel, param_redirect) {


        var xhttp = new XMLHttpRequest({ mozSystem: true });

        xhttp.open('GET', param_url, true)
        xhttp.withCredentials = true;
        xhttp.responseType = 'document';
        xhttp.overrideMimeType('text/xml');



        $("div#message-box").css('display', 'block')


        xhttp.onload = function() {

            if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {

                var data = xhttp.response;

                //rss atom items
                $(data).find('entry').each(function() {
                    i++
                    if (i < param_limit) {

                        var item_title = $(this).find('title').text();
                        var item_summary = $(this).find('summary').text();
                        var item_link = $(this).find('link').attr("href");
                        var item_date_unix = Date.parse($(this).find('updated').text());
                        item_date = new Date(item_date_unix)
                        item_date = item_date.toGMTString()

                        var article = $('<article data-order = "' + item_date_unix + '" data-link = "' + item_link + '"><div class="channel">' + param_channel + '</div><time>' + item_date + '</time><h1>' + item_title + '</h1><div class="summary">' + item_summary + '</div></article>')
                        $('div#news-feed-list').append(article);

                        article_array = $('div#news-feed-list article');
                        var item_title = $(this).find('title').text();

                        //search feature
                        if (get_setting_status == "true") {

                            var n = item_title.search(get_search);
                            if (n != -1) {
                                notify("Rss-Reader", "search term founded", false, false)
                            }
                        }


                    }

                })

                i = 0


                //rss 2.0 items
                $(data).find('item').each(function() {
                    i++
                    if (i < param_limit) {
                        var item_title = $(this).find('title').text();
                        var item_summary = $(this).find('description').text();
                        var item_link = $(this).find('link').text();
                        var item_date_unix = Date.parse($(this).find('pubDate').text());
                        item_date = new Date(item_date_unix)
                        item_date = item_date.toGMTString()


                        var article = $('<article data-order = "' + item_date_unix + '" data-link = "' + item_link + '"><div class="channel">' + param_channel + '</div><time>' + item_date + '</time><h1>' + item_title + '</h1><div class="summary">' + item_summary + '</div></article>')
                        $('div#news-feed-list').append(article);
                        $("div#news-feed-list article:first").focus()

                        article_array = $('div#news-feed-list article')
                    }

                });

                i = 0



            }

            if (xhttp.status === 404) {
                toaster(param_channel + "url not found");
            }

            ////Redirection
            if (xhttp.status === 301) {
                if (param_redirect !== true) {
                    redirection_counter++;
                    redirections_arr[redirection_counter] = [xhttp.getResponseHeader('Location'), param_limit, param_channel];
                }

                if (param_redirect === true) {
                    getAllResponseHeaders()
                    $("div#message-box div.text-center").text("");
                    $("div#message-box").css("display", "block");
                    $("div#message-box div#redirections").css("display", "block");
                    $("div#message-box div#redirections").append("<div>" + param_channel + "</div>")

                }
            }

            if (xhttp.status === 0) {
                toaster(param_channel + " status: " + xhttp.status + xhttp.getAllResponseHeaders());
            }



        };



        xhttp.onerror = function() {
            toaster(param_channel + " status: " + xhttp.status + xhttp.getAllResponseHeaders());


        };

        xhttp.send(null)
    }




    function set_tabindex() {

        $('div#news-feed-list article').each(function(index) {

            $(this).prop("tabindex", index);
            $('div#news-feed-list article:first').focus()


        })
    }


    function sort_data() {

        var $wrapper = $('div#news-feed-list');

        $wrapper.find('article').sort(function(a, b) {
                return +b.dataset.order - +a.dataset.order;
            })
            .appendTo($wrapper);

        article_array = $('div#news-feed-list article')
        set_tabindex()
    }


    //wait till downloads are done than try redirection
    setTimeout(function() {

        if (redirections_arr.length > 0) {

            //try redirections
            for (var i = 0; i < redirections_arr.length; i++) {
                rss_fetcher(redirections_arr[i][0], redirections_arr[i][1], redirections_arr[i][2], true);
            }

        }


        //sort content by date
        sort_data();

    }, 5000);



    //wait till downloads are done than try redirection
    setTimeout(function() {


        //sort content by date
        sort_data();
        $("div#message-box").css('display', 'none');

    }, 10000);






    var running_autoscroll = false;
    var interval = "";

    function auto_scroll(param1, param2) {

        if (window_status === "source-page" && running_autoscroll === false && param2 === "on")

        {
            running_autoscroll = true;
            lock_screen("lock");
            interval = setInterval(function() {
                window.scrollBy(0, 1);
            }, param1);
            toaster("autoscroll on");
            return;

        }

        if (running_autoscroll === true || param2 === "off") {
            clearInterval(interval);
            running_autoscroll = false;
            lock_screen("unlock");
        }



    }


    ////////////////////////
    //NAVIGATION
    /////////////////////////



    function nav(move) {

        var settings_array = $("div#settings [tabIndex]")

        if (window_status == "settings") {
            if (move == "+1" && pos_focus < settings_array.length - 1) {
                pos_focus++
                var $focused = $(':focus')[0];
                var targetElement = settings_array[pos_focus];
                targetElement.focus();

            }

            if (move == "-1" && pos_focus > 0) {
                pos_focus--
                var $focused = $(':focus')[0];
                var targetElement = settings_array[pos_focus];
                targetElement.focus();
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


    function bottom_bar(left, center, right) {
        $("div#bottom-bar div#button-left").text(left)
        $("div#bottom-bar div#button-center").text(center)
        $("div#bottom-bar div#button-right").text(right)
    }
    bottom_bar("settings", "select", "")





    function save_settings() {

        var search = $("div#input-wrapper #search").val();
        var setting_interval = $("div#input-wrapper #time").val();



        if (search != "" || setting_interval != "") {
            localStorage.setItem('search', search);
            localStorage.setItem('interval', setting_interval);
            localStorage.setItem('status', setting_status);
            toaster("saved", 3000)
            if (setting_interval != "") {
                setAlarm(setting_interval)

            }


        } else {
            toaster("please fill in all fields", 3000)
        }


    }



    function show_article() {
        var $focused = $(':focus');
        $('article').css('display', 'none')
        $focused.css('display', 'block')
        $('div.summary').css('display', 'block')
        $('div#bottom-bar').css('display', 'block')
        $('div#settings').css('display', 'none')
        bottom_bar("", "", "visit source")
        window_status = "single-article";
    }



    function show_settings() {
        pos_focus = 0;
        $('article').css('display', 'none')
        $('div#settings').css('display', 'block')
        bottom_bar("save", "", "back")
        $("div#bottom-bar").css("display", "block")
        $("div#input-wrapper input#search").focus();
        window_status = "settings";
    }



    function show_article_list() {
        pos_focus = 0;
        var $focused = $(':focus');
        $('article').css('display', 'block')
        $('div.summary').css('display', 'none')
        $('div#bottom-bar').css('display', 'block')
        $('div#settings').css('display', 'none')

        bottom_bar("settings", "select", "")

        var targetElement = article_array[pos_focus];
        targetElement.focus();

        window.scrollTo(0, $(targetElement).offset().top);

        $("div#source-page").css("display", "none")
        $("div#source-page iframe").attr("src", "")
        $('div#button-bar div#button-right').css('display', 'block');
        window_status = "article-list";
        auto_scroll(30, "off");




    }




    function open_url() {
        var targetElement = article_array[pos_focus];
        var link_target = $(targetElement).data('link');

        $("div#source-page").css("display", "block")
        $("div#source-page iframe").attr("src", link_target)
        $('div#bottom-bar').css('display', 'none')
        window_status = "source-page";



    }



    ///ALARM

    //alarm listener
    navigator.mozSetMessageHandler("alarm", function(mozAlarm) {
        removeAlarms();
        setAlarm(get_interval);
    });


    //remove alarms
    function removeAlarms() {
        var request = navigator.mozAlarms.getAll();

        request.onsuccess = function() {


            this.result.forEach(function(alarm) {

                navigator.mozAlarms.remove(alarm.id);


            });
            console.log('operation successful:' + this.result.length + 'alarms pending');
        };

        request.onerror = function() {
            console.log("An error occurred: " + this.error.name);
        };
    }


    //set alarm
    function setAlarm(durration) {

        durration = Number(durration);

        //alarm 3min later
        let alarmDate = moment().add(durration, 'm').format("MMMM D, YYYY HH:mm:ss");
        //This the date to schedule the alarm
        var myDate = new Date(alarmDate);

        // This is arbitrary data pass to the alarm
        var data = {
            foo: "bar"
        }

        // The "honorTimezone" string is what make the alarm honoring it
        var request = navigator.mozAlarms.add(alarmDate, 'honorTimezone');

        request.onsuccess = function() {
            toaster("The alarm has been scheduled", 10000);
            // alarmId = this.result;

        };

        request.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };

    }





    //get all alarms
    function getAlarm() {

        var request = navigator.mozAlarms.getAll();

        request.onsuccess = function() {
            alert(navigator.mozHasPendingMessage("alarm"))



            this.result.forEach(function(alarm) {
                console.log('Id: ' + alarm.id);
                alert('date: ' + alarm.date);
                console.log('respectTimezone: ' + alarm.respectTimezone);
                console.log('data: ' + JSON.stringify(alarm.data));
            });
        };

        request.onerror = function() {
            alert("An error occurred: " + this.error.name);
        };

    }





    //////////////////////////
    ////KEYPAD TRIGGER////////////
    /////////////////////////



    function handleKeyDown(evt) {

        switch (evt.key) {


            case 'Enter':
                if (window_status == "article-list") { show_article(); }


                if ($('input[type=checkbox]').is(":focus")) {
                    if ($('input[type=checkbox]').is(':checked')) {
                        $('input[type=checkbox]').prop('checked', false);
                        setting_status = "false";
                        removeAlarms();
                        save_settings();

                    } else {
                        $('input[type=checkbox]').prop('checked', true);
                        setting_status = "true";
                        save_settings();


                    }


                }
                break;


            case 'ArrowDown':
                nav("+1");
                auto_scroll(30, "off");
                break;


            case 'ArrowUp':
                nav("-1");
                auto_scroll(30, "off");
                break;


            case 'SoftLeft':
                if (window_status == "article-list") {
                    show_settings()
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


            case '1':
                setAlarm("5");
                break;


            case '2':
                getAlarm();
                break;

            case '3':
                removeAlarms();
                break;


            case 'Backspace':
                evt.preventDefault();
                if (window_status == "article-list") {
                    window.close();
                    return;
                }

                if (window_status == "settings") {
                    show_article_list();
                    return;
                }

                if (window_status == "single-article") {
                    show_article_list();
                    return;
                }

                if (window_status == "source-page") {
                    show_article_list();
                    auto_scroll(30, "off");
                    return;
                }

                break;

            case '2':
                auto_scroll(30, "on");
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