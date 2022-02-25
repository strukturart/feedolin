export let getTime = function (cache_buffer) {
  let timestamp = Math.floor(new Date().getTime() / 60000);
  cache_buffer = Number(cache_buffer);
  let lastupdate = Number(localStorage.getItem("last_update"));

  let update_time = cache_buffer + lastupdate;
  //alert(timestamp + "/" + lastupdate + "/" + cache_buffer)
  //document.getElementById("nextdownload").innerText = moment(update_time * 60000).format("DD.MM.YYYY,hh:mm");

  if (lastupdate == null || timestamp > update_time) {
    localStorage.setItem("last_update", timestamp.toString());
    //download
    return true;
  } else {
    //cache
    return false;
  }
};

export let loadCache = function () {
  if (
    localStorage.getItem("data") == "" ||
    localStorage.getItem("data") == undefined
  ) {
    return false;
  } else {
    return JSON.parse(localStorage.getItem("data"));
  }
};

export let saveCache = function (data) {
  localStorage.setItem("data", JSON.stringify(data));
};
