
$(document).ready(function() 
 {


	//Global Vars
	var windowOpen = false;
	var i = -1;
	var debug = true;
	var page = 0;
	var pos_focus = 0


var article_array;



	var items = "";




	$("div#window-status").text(windowOpen);





	/////////////////////////
	function finder()
	{


	var finder = new Applait.Finder({ type: "sdcard", debugMode: true });


		finder.on("empty", function (needle) 
		{
			alert("no sdcard found");
			return;
		});

		finder.search("rss-reader.json");



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

		//rss atom items
		$(data).find('entry').each(function(){
			i++
		if(i < param_limit)
		{
			var item_title = $(this).find('title').text();
			var item_summary = $(this).find('summary').text();
			var item_date = $(this).find('updated').text();
			var article = $('<article tabindex="'+i+'"><time>'+item_date+'</time><h1>'+item_title+'</h1><div class="summary">'+item_summary+'</div></article>')
			$('div#news-feed-list').append(article);
			$("div#news-feed-list article:first").focus()

			article_array = $('div#news-feed-list article')
		}
	})


		//rss 
		$(data).find('item').each(function(){
			i++
		if(i < param_limit)
		{
			var item_title = $(this).find('title').text();
			var item_summary = $(this).find('description').text();
			var item_date = $(this).find('pubDate').text();
			var article = $('<article tabindex="'+i+'"><time>'+item_date+'</time><h1>'+item_title+'</h1><div class="summary">'+item_summary+'</div></article>')
			$('div#news-feed-list').append(article);
			$("div#news-feed-list article:first").focus()

			article_array = $('div#news-feed-list article')
		}




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
		var $focused = $(':focus');
		
		if(move == "+1" &&  pos_focus < article_array.length)
		{
			pos_focus++

			if( pos_focus <= article_array.length)
			{
				var targetElement = article_array[pos_focus];
				targetElement.focus();

			}
		}

		if(move == "-1" &&   pos_focus > 0)
		{
			pos_focus--
			if( pos_focus >= 0)
			{
				var targetElement = article_array[ pos_focus];
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




function show_article()
{
	var $focused = $(':focus');
	$('article').css('display','none')
	$focused.css('display','block')
	$('div.summary').css('display','block')



}


function show_article_list()
{
	var $focused = $(':focus');
	$('article').css('display','block')
	$('div.summary').css('display','none')

}




	//////////////////////////
	////KEYPAD TRIGGER////////////
	/////////////////////////



	function handleKeyDown(evt) {


			switch (evt.key) {


	        case 'Enter':
	      		show_article();
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

			case 'SoftLeft':
				show_article_list();
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






