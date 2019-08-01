
$(document).ready(function() 
 {


	//Global Vars
	var windowOpen = false;
	var i = -1;
	var finderNav_tabindex = -1;
	var app_list_filter_arr = [];
	var app_shortcut_arr = [];
	var list_all = false;
	var debug = true;
	var page = 0;
	var pos_focus = 0




	var items = "";


	var pages_arr = [];



	$("div#window-status").text(windowOpen);


//execute weather function once 
	var once_exec = (function() {
	    var executed = false;
	    return function() {
	        if (!executed) {
	            executed = true;
	            weather()
	        }
	    };
	})();





	/////////////////////////
	function finder()
	{


	var finder = new Applait.Finder({ type: "sdcard", debugMode: true });


		finder.on("empty", function (needle) 
		{
			alert("no sdcard found, no openweathermap api-key found");
			return;
		});

		finder.search("news-reader.json");



		finder.on("fileFound", function (file, fileinfo, storageName) 
		{

			var reader = new FileReader()


			reader.onerror = function(event) 
					{
						alert('shit happens')
						reader.abort();
					};

					reader.onloadend = function (event) 
					{

							search_result = event.target.result
							
							//check if json valid
							var printError = function(error, explicit) {
							console.log("[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}");
							}

							try {
							   
							} catch (e) {
							    if (e instanceof SyntaxError) {
							        alert("Json file is not valid");
							        return;
							    } else {
							        
							    }

							}
									var app_list_filter = JSON.parse(search_result);
									

									$.each(app_list_filter, function(i, item) {

									//alert(item.url,item.limit);
									rss_fetcher(item.url,item.limit)

									
								
									});



					};
					reader.readAsText(file)
				});


	}	


finder()








//////////////////////////////
//rss-fetch////
//////////////////////////////

function rss_fetcher(param_url,param_limit)
{

	



	var xhttp = new XMLHttpRequest({ mozSystem: true });

	xhttp.open('GET',param_url,true)
	xhttp.withCredentials = true;
	xhttp.responseType = 'document';
	xhttp.overrideMimeType('text/xml');

	$("div#message-box").css('display','block')
	$("div#message-box").text("Please wait checking "+param_url)
	


	xhttp.onload = function () {
		if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) 
		{
		
			var data = xhttp.response;


		//alert(data)
		$(data).find('entry').each(function(){
			i++
		  var item_title = $(this).find('title').text();
		  var item_summary = $(this).find('summary').text();
		  //alert(item_title)
		  var article = $('<article tabindex="'+i+'"><h1>'+item_title+'</h1><div>'+item_summary+'</div></article>')
		  $('div#news-feed-list').append(article)


    });

					

					

		}
	};

	$("div#message-box").css('display','none')


	xhttp.onerror = function () {
	alert("error");
	};

	xhttp.send(null)



}







////////////////////////
//NAVIGATION
/////////////////////////



	function nav (move) {
			console.log(pages_arr.length)
		
		if(move == "+1" &&  pos_focus < finderNav_tabindex)
		{
			pos_focus++

			if( pos_focus <= finderNav_tabindex)
			{
				var targetElement = items[pos_focus];
				targetElement.focus();

			}
		}

		if(move == "-1" &&   pos_focus > 0)
		{
			pos_focus--
			if( pos_focus >= 0)
			{
				var targetElement = items[ pos_focus];
				targetElement.focus();

			}
		}


		if(move == "slide_right")
		{

			if(page < pages_arr.length-1)
			{
				page++

				$("div.page").css("display","none");
				$("div#"+pages_arr[page]).css("display","block");



				if(pages_arr[page] == "weather-wrapper")
				{
					//execute weather() only once
					once_exec()
				}
				

				if(pages_arr[page] == "quick-settings")
				{
					items = document.querySelectorAll('div#quick-settings > div.items');
					$('div#quick-settings').find('div.items[tabindex=0]').focus();
					pos_focus = 0;
				}

				if(pages_arr[page] == "finder")
				{
					items = document.querySelectorAll('div#app-list > div.items');
					$('div#app-list').find('div.items[tabindex=0]').focus();
					pos_focus = 0;

				}

				
			}		
		}


		if(move == "slide_left")
		{
			if(page > 0)
			{
				page--

					$("div.page").css("display","none");
					$("div#"+pages_arr[page]).css("display","block");

				if(pages_arr[page] == "quick-settings")
				{
					items = document.querySelectorAll('div#quick-settings > div.items');
					$('div#quick-settings').find('div.items[tabindex=0]').focus();
					pos_focus = 0;
				}


				if(pages_arr[page] == "finder")
				{
					items = document.querySelectorAll('div#app-list > div.items');
					$('div#app-list').find('div.items[tabindex=0]').focus();
					pos_focus = 0;
				}

			
			}
		}




		

	}






	//////////////////////////
	////KEYPAD TRIGGER////////////
	/////////////////////////



	function handleKeyDown(evt) {


			switch (evt.key) {


	        case 'Enter':
	      
	        break;


			case 'ArrowDown':
				nav("+1")
			break; 


			case 'ArrowUp':
				nav("-1")
			break; 

			case 'ArrowRight':
				nav("slide_right")
			break; 

			case 'ArrowLeft':
				nav("slide_left")
			break; 




		}

	};



	document.addEventListener('keydown', handleKeyDown);


	//////////////////////////
	////BUG OUTPUT////////////
	/////////////////////////

if(debug == true)
{
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






