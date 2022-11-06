import { config } from '@/config.js';

const browser = require("webextension-polyfill");

console.log(browser);

const color = {
  blue: "#236dc9",
  red: "#d53032",
  yellow: "#ffe834",
  green: "#8fce00",
  gray: "#444444",
};

let show = true;

async function getCurrTabId() {
  return browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    var currTab = tabs[0];
    if (currTab) {
      return currTab.id;
    }
    return undefined;
  })
}

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
browser.storage.onChanged.addListener(async (data, namespace) => {

  console.log(data);
  if (data.results) {
    let details = {};
    details.text = data.results.newValue;
    if (typeof details.text != "string") details.text = JSON.stringify(details.text);
    if (!details.text) details.text = " ";

    const currTabId = await getCurrTabId();
    if (currTabId) details.tabId = currTabId;

    browser.action.setBadgeText(details);
  }

  if (data.show) {
    show = data.show.newValue;
  }

  if (data.status) {
    let details = {};
    if (data.status.newValue == "noauth") details.color = color.red;
    else if (data.status.newValue == "search") details.color = color.green;
    else if (data.status.newValue == "url") details.color = color.yellow;
    else if (data.status.newValue == "offline") details.color = color.gray;

    console.log(details);

    const currTabId = await getCurrTabId();
    if (currTabId) details.tabId = currTabId;

    browser.action.setBadgeBackgroundColor(details);
  }
});

browser.action.onClicked.addListener((tab) => {
  console.log('clicked');
  browser.storage.sync.set({ show: !show });
});
