import localforage from "localforage";

localforage.config({
  name: "feedolin", // Optional, you can provide a unique name for your app's data store
  version: 1.0, // Optional, you can provide a version number for your data store
  storeName: "cache", // Optional, you can specify a different store name for the data
});

export let getTime = function (cache_buffer) {
  let timestamp = Math.floor(new Date().getTime() / 60000);
  cache_buffer = Number(cache_buffer);
  let lastupdate = Number(localStorage.getItem("last_update"));

  let update_time = cache_buffer + lastupdate;

  if (lastupdate == null || timestamp > update_time) {
    localStorage.setItem("last_update", timestamp.toString());
    //download
    return true;
  } else {
    //load cache
    return false;
  }
};
/*
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
*/

export let loadCache = async function () {
  try {
    const data = await localforage.getItem("data");
    if (data === null || data === undefined) {
      return false;
    } else {
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.error("Error loading cache:", error);
    return false;
  }
};

export let saveCache = async function (data) {
  try {
    await localforage.setItem("data", data);
    const savedData = await localforage.getItem("data");
    console.log("saved:", savedData);
  } catch (error) {
    console.error("Error saving cache:", error);
  }
};
