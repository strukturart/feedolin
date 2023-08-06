export let load_context = (url, id, mode) => {
  let a = JSON.parse(localStorage.getItem("oauth_auth"));
  let accessToken = a.access_token;

  let w = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  if (mode == "public") {
    w = {
      "Content-Type": "application/json",
    };
  }
  return fetch(url + "/api/v1/statuses/" + id + "/context", {
    headers: w,
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export let mastodon_account_info = () => {
  let a = JSON.parse(localStorage.getItem("oauth_auth"));
  let accessToken = a.access_token;

  let url = localStorage.getItem("mastodon_server");

  return fetch(url + "/api/v1/accounts/verify_credentials", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};
