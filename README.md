![logo](/images/logo.svg)

# Feedolin

![badge-release](https://img.shields.io/github/v/release/strukturart/feedolin?include_prereleases&style=plastic)
[![badge-bhackers](https://img.shields.io/badge/bHackers-bHackerStore-orange)](https://store.bananahackers.net/#feedolin)
![badge-downloads](https://img.shields.io/github/downloads/strukturart/feedolin/total)

Feedolin is an RSS / Atom reader and podcast player. It is intended for users who already use an rss reader client and want to read their feeds on a kaios device. the list of subscribed websites / podcasts is managed locally or online in an opml.

**NEW**  

Now it is also possible to load mastodon content, in the settings of the app you will find a login button with which you can log in with your mastodon account.

## RSS/Atom/Mastodon reader and Podcastplayer for KaiOS

- read you favorit rss/atom feeds
- stream your podcasts
- show youtube/soundcloud channels
- read mastodon publice & home timeline
- listen spotify->rss podcasts
- read reddit.com ->rss
- open rss feedlink
- offline use (caching)

![feedolin_mockup](/images/feedolin_mockup.png)

## Installation

You have to save the list of urls in a .opml file as in the example.
In the settings you can set where the app should get this file from.
It can be stored locally or online on a server.

if you want to show mastodon public timelines you have to set the type="mastodon" in the link list
For example:
`<outline type="mastodon" text="mastodon.social" title="mastodon.social" xmlUrl="https://mastodon.social/api/v1/timelines/public" htmlUrl=""/>`

https://raw.githubusercontent.com/strukturart/rss-reader/master/example.opml

## How to install

- KaiOs Store
- Sideloading <a href="https://www.martinkaptein.com/blog/sideloading-and-deploying-apps-to-kai-os/">step-by-step article</a> by martinkaptein

You can download the latest version from the Releases page.
The app is not auto-updating. To update it, you have to follow the same steps you took when installing it.

## Mastodon

Originally I only wanted to write an rss reader for KaiOS, now I have decided to connect the fediverse as well. a mastodon login enables you to display the mastodon home timeline. in mastodon you have the option of subscribing to other sources/instances of fediverse, which will then also find their way to your feature phone.

## How to use

- Enter to show full news
- Backspace to go back
- #-key volume
- streaming audio seeking: cursor left/right
- Volume

## Tips

RSS-Feed from public Youtube/Soundcloud/Instagram/Twitter.....

- https://danielmiessler.com/blog/rss-feed-youtube-channel/
- http://tips.slaw.ca/2019/technology/rss-feed-for-a-youtube-channel-or-playlist/
- https://rss.app/rss-feed/create-instagram-rss-feed

## Credits

- bananahackers community 💘

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
            <div>Bitcoincash</div>
            <img src="/images/bitcoincash_rcv.png" width="120px">
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
