"use strict";

import localforage from "localforage";
import { uid } from "uid";
import { google_cred } from "./application/cred.js";
localforage.setDriver(localforage.INDEXEDDB);

let authorizationCode = "";

let get_token = function () {
  var urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  //urlencoded.append("code", b[0]);
  urlencoded.append("code", authorizationCode);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append(
    "redirect_uri",
    "https://greg.strukturart.com/redirect.html"
  );
  urlencoded.append("client_id", google_cred.clientId);
  urlencoded.append("client_secret", google_cred.clientSecret);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch("https://oauth2.googleapis.com/token", requestOptions).then(
    (response) => response.json()
  );
};

get_token().then((result) => {
  //localStorage.setItem("oauth_auth", JSON.stringify(result));
  let accounts = [];
  localStorage.setItem("oauth_back", "true");

  localforage
    .getItem("accounts")
    .then(function (value) {
      if (value == null) {
        accounts = [];
        //return false;
      } else {
        accounts = value;
      }

      accounts.push({
        server_url: "https://apidata.googleusercontent.com/caldav/v2/",
        tokens: result,
        authorizationCode: authorizationCode,
        name: "Google",
        id: uid(32),
        type: "oauth",
      });

      localforage
        .setItem("accounts", accounts)
        .then(function () {
          document.getElementById("success").innerText =
            "Account successfully added to greg";
          localStorage.setItem("oauth_callback", "true");
          setTimeout(function () {
            window.close();
          }, 3000);
        })
        .catch(function (err) {
          // This code runs if there were any errors
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});
