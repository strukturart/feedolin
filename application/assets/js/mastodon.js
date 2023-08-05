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
