import { config } from '@/config.js';

var browser = require("webextension-polyfill");


console.log(browser);

const color = {
  blue: "#236dc9",
  red: "#d53032",
  yellow: "#ffe834",
  green: "#8fce00",
  gray: "#444444",
};

let show = true;

browser.storage.sync.get().then((data) => {
  if (!data.apiKey) browser.storage.sync.set(config);
});
browser.action.setBadgeText({ text: " " });
browser.action.setBadgeBackgroundColor({ color: color.gray }).catch(console.log);

// Open Settings Page on installation
browser.runtime.onInstalled.addListener(async () => {
  let url = browser.runtime.getURL("options/options.html");
  await browser.tabs.create({ url });
});

// listen to event for changes from saved data in storage
browser.storage.onChanged.addListener((data, namespace) => {

  console.log(data);
  if (data.results) {
    let newText = data.results.newValue;
    if (typeof newText != "string") newText = JSON.stringify(newText);
    browser.action.setBadgeText({ text: newText ?? "" });
  }

  if (data.show) {
    show = data.show.newValue;
  }

  if (data.status) {
    let newColor;
    if (data.status.newValue == "noauth") newColor = color.red;
    else if (data.status.newValue == "search") newColor = color.green;
    else if (data.status.newValue == "url") newColor = color.yellow;
    else if (data.status.newValue == "offline") newColor = color.gray;
    browser.action.setBadgeBackgroundColor({ color: newColor });
  }
});

browser.action.onClicked.addListener((tab) => {
  browser.storage.sync.set({ show: !show });
});
