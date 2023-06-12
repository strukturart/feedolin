"use strict";

import { cred } from "./cred.js";
import "url-search-params-polyfill";
import { side_toaster } from "./assets/js/helper.js";

let get_token = function () {
  var qr = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach((p) => {
      qr[p.split("=")[0]] = p.split("=")[1];
    });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("code", qr.code);
  urlencoded.append("scope", "read");

  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("redirect_uri", cred.redirect);
  urlencoded.append("client_id", cred.clientId);
  urlencoded.append("client_secret", cred.clientSecret);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  mastodon_server_url = localStorage.getItem("mastodon_server");
  return fetch(mastodon_server_url + "/oauth/token", requestOptions).then(
    (response) => response.json()
  );
};

get_token().then((result) => {
  localStorage.setItem("oauth_auth", JSON.stringify(result));
  localStorage.setItem("oauth_back", "true");
  window.close();
});
