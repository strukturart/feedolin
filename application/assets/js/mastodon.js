export let load_context = async (url, id, mode) => {
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

export let reblog = (url, id) => {
  let a = JSON.parse(localStorage.getItem("oauth_auth"));
  let accessToken = a.access_token;

  let w = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return new Promise((resolve, reject) => {
    fetch(url + "/api/v1/statuses/" + id + "/reblog", {
      method: "POST",
      headers: w,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not OK");
          reject(new Error("Network response was not OK"));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export let favourite = (url, id) => {
  let a = JSON.parse(localStorage.getItem("oauth_auth"));
  let accessToken = a.access_token;

  let w = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return new Promise((resolve, reject) => {
    fetch(url + "/api/v1/statuses/" + id + "/favourite", {
      method: "POST",
      headers: w,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Network response was not OK");
          reject(new Error("Network response was not OK"));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export let mastodon_account_info = async (url, accessToken) => {
  const response = await fetch(url + "/api/v1/accounts/verify_credentials", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log("Network response was not OK");
    return "Login not OK";
  }
  const data = await response.json();
  return data;
};
