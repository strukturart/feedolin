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



   $(document).ready(function() {

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

                   $.each(data, function(i, item) {
                       //rss_fetcher(item.url, item.limit, item.channel, item.categorie)
                       if (!item.categorie) {
                           item.categorie = 0;
                       }
                       source_array.push([item.url, item.limit, item.channel, item.categorie]);
                   });
                   //start download loop
                   rss_fetcher(source_array[0][0], source_array[0][1], source_array[0][2], source_array[0][3])
               };
               reader.readAsText(file)
           });



       }


       finder();



       //////////////////////////////
       //rss-fetch////
       //////////////////////////////

       function rss_fetcher(param_url, param_limit, param_channel, param_categorie) {


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
                   $(data).find('entry').each(function(index) {
                       if (index < param_limit) {

                           var item_title = $(this).find('title').text();
                           var item_summary = $(this).find('summary').text();
                           var item_link = $(this).find('link').attr("href");
                           var item_download = $(this).find('enclosure').attr('url')
                           var item_date_unix = Date.parse($(this).find('updated').text());
                           item_date = new Date(item_date_unix)
                           item_date = item_date.toGMTString();
                           var item_type = $(this).find('enclosure').attr('type')

                           content_arr.push([item_title, item_summary, item_link, item_date, item_date_unix, param_channel, param_categorie, item_download, item_type])

                       }

                   })



                   //rss 2.0 items
                   $(data).find('item').each(function(index) {
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
               }

               ////Redirection
               if (xhttp.status === 301) {
                   toaster(param_channel + " redirection", 3000);
                   rss_fetcher(xhttp.getResponseHeader('Location'), param_limit, param_channel)


               }

               if (xhttp.status === 0) {
                   toaster(param_channel + " status: " + xhttp.status + xhttp.getAllResponseHeaders(), 3000);
               }

               //download content from source
               k++;
               if (k < source_array.length) {
                   rss_fetcher(source_array[k][0], source_array[k][1], source_array[k][2], source_array[k][3])
               }
               //after download build html objects
               if (k == source_array.length) {
                   build()
               }

           };



           xhttp.onerror = function() {
               toaster(param_channel + " status: " + xhttp.status + xhttp.getAllResponseHeaders(), 3000);


           };

           xhttp.send(null)
       }






       //sort content by date
       //build   


       function build() {
           $("div#navigation div").text(panels[0]);


           $.each(content_arr, function(i, item) {


               var item_date_unix = content_arr[i][4];
               var item_link = content_arr[i][2];
               var param_channel = content_arr[i][5];
               var item_date = content_arr[i][3];
               var item_title = content_arr[i][0];
               var item_summary = content_arr[i][1];
               var item_categorie = content_arr[i][6]
               var item_download = content_arr[i][7]
               var item_type = content_arr[i][8];

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




               //search feature
               //alarm === true mean tha app start in background
               //and the html object must be not build
               if (get_setting_status == "true" && alarm === true) {
                   var lc_get_search = get_search.toLowerCase();
                   var lc_item_title = item_title.toLowerCase();

                   var n = lc_item_title.search(lc_get_search);
                   if (n != -1) {
                       notify("Rss-Reader", "The word/phrase you are looking for was found in one of the articles.", false, false);
                       window.close();
                   }
               }



               if (alarm === false) {
                   var article = '<article class="' + item_categorie + media + ' all" data-order = "' + item_date_unix + '" data-link = "' + item_link + '" data-download="' + item_download + '"data-audio-type="' + item_type + '">' +
                       '<div class="podcast-icon"><img src="assets/image/podcast.png"></div>' +
                       '<div class="channel">' + param_channel + '</div>' +
                       '<time>' + item_date + '</time>' +
                       '<h1>' + item_title + '</h1>' +
                       '<div class="summary">' + item_summary + '</div>' +
                       '</article>'
                   $('div#news-feed-list').append(article);
                   $("div#news-feed-list article:first").focus()
                   article_array = $('div#news-feed-list article')

               }

           });


           sort_data();


           $("div#message-box").css('display', 'none');


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


       function sort_data() {

           var $wrapper = $('div#news-feed-list');

           $wrapper.find('article').sort(function(a, b) {
                   return +b.dataset.order - +a.dataset.order;
               })
               .appendTo($wrapper);

           article_array = $('div#news-feed-list article')
           set_tabindex()
       }




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
           $("div#navigation").css("display", "none");
           var targetElement = article_array[pos_focus];
           link_target = $(targetElement).data('download');
           link_type = $(targetElement).data('audio-type');

           if ($(":focus").hasClass("podcast")) {

               if ($(":focus").hasClass("audio-playing")) {
                   bottom_bar("pause", "", "download")

               } else {
                   bottom_bar("play", "", "download")
               }


           } else {
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

           pos_focus = 0;
           $('article').css('display', 'none')
           $('div#settings').css('display', 'block')
           bottom_bar("save", "", "back")
           $("div#bottom-bar").css("display", "block")
           $("div#input-wrapper input#search").focus();
           window_status = "settings";

       }



       function show_article_list() {
           $("div#navigation").css("display", "block");

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
           var link_download = $(targetElement).data('download');


           if ($(":focus").hasClass("podcast")) {
               window.location.assign(link_download);
               /*
               $('a#download-button').attr("href", link_download);

               $('a#download-button').css("background", "yellow");
               $('a#download-button').focus();
               $('a#download-button').click();

               alert($('a#download-button').attr("href"))
                */




           } else {
               $("div#source-page").css("display", "block")
               $("div#source-page iframe").attr("src", link_target)
               $('div#bottom-bar').css('display', 'none')
               window_status = "source-page";
           }

       }








       ///ALARM

       //alarm listener
       var alarm = false;
       navigator.mozSetMessageHandler("alarm", function(mozAlarm) {
           alarm = true;
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
                   console.log('date: ' + alarm.date);
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

                   break;

               case 'ArrowRight':
                   if (window_status == "article-list") {
                       nav_panels("right")
                   }
                   break;

               case 'ArrowDown':
                   nav("+1");
                   if (window_status == "source-page") {
                       auto_scroll(30, "off");
                   }
                   if (volume_status == "true") {
                       volume_control("down")
                   }
                   break;


               case 'ArrowUp':
                   nav("-1");
                   if (window_status == "source-page") {
                       auto_scroll(30, "off");
                   }
                   if (volume_status == "true") {
                       volume_control("up")
                   }


                   break;

               case '#':
                   volume.requestShow();

                   volume_status = "true";
                   break;


               case 'SoftLeft':
                   if (window_status == "article-list") {
                       show_settings()
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