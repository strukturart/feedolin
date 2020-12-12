![logo](/images/logo.png) 

## KaiOs - rss-reader and podcast downloader

- read you favorit rss/atom feeds 
- download or stream your podcasts
- show youtube/soundcloud channels
- listen spotify->rss podcasts
- read reddit.com ->rss
- open rss feedlink
- offline use (caching)

![image-1](/images/image-1.png)
![image-2](/images/image-2.png)
![image-3](/images/image-3.png)

## Installation

Put on your sd card a file with the name rss-reader.json with the following structure:


```
[
	
		
		{
			"categorie":"news",
			"url":"https://rss-source-url/",
			"limit":"10",
			"channel":"channel name"
		},

		{
			"categorie":"podcast",
			"url":"https://rss-source-url/",
			"limit":"20",
			"channel":"channel name"
		}

	
	
]



```
+ url = url of source
+ limit = How many articles should be downloaded
+ channel = Name of channel
+ categorie = to use panel navigation


## How to use

+ Enter to show full news
+ Backspace to go back
+ visit source page: press key 2 to activate the auto scroll
Streaming Podcast
+ #-key volume
+ seeking: cursor left/right 

## Tips

RSS-Feed from public Youtube/Soundcloud/Instagram/Twitter.....
+ https://danielmiessler.com/blog/rss-feed-youtube-channel/
+ http://tips.slaw.ca/2019/technology/rss-feed-for-a-youtube-channel-or-playlist/
+ https://rss.app/rss-feed/create-instagram-rss-feed



## to do

+ youtube api
+ mustache.js


## Donation
If you use the app often, please donate an amount to me.
<br>
<table class="border-0"> 
  <tr class="border-0" >
    <td valign="top" class="border-0">
        <div>
            <a href="https://paypal.me/strukturart?locale.x=de_DE" target="_blank">
                <img src="/images/paypal.png" width="120px">
            </a>
        </div>
    </td>
    <td valign="top" class="border-0">
        <div>
            <div>Bitcoin</div>
            <img src="/images/bitcoin_rcv.png" width="120px">
        </div>
    </td>
  </tr>
 </table>

