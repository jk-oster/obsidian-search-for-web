import { config } from '@/config.js';

import browserPolyfill from "webextension-polyfill";
const browser = browserPolyfill ?? chrome;

console.log('browser polyfill', browser);

const color = {
  blue: "#236dc9",
  red: "#d53032",
  yellow: "#ffe834",
  green: "#8fce00",
  gray: "#444444",
};

const statusColorMapping = {
  noauth: "red",
  search: "green",
  url: "yellow",
  offline: "gray",
};


let show = true;

async function getCurrTabId(matches = null) {
  return browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    var currTab = tabs[0];
    if (currTab && (!matches || matches.test(currTab.url))) {
      return currTab.id;
    }
    return undefined;
  })
}

export async function addExtensionMessageListener(action = 'update', callbackFn = (data) => {
}) {
  try {
    // Add a listener for the runtime message from the background service
    browser.runtime.onMessage.addListener(async (message, sender) => {
      if ('action' in message && message['action'] === action) {
        console.log('received runtime message from browser: ' + action, message);
        callbackFn(message?.data ?? message);
      }
    });

  } catch (e) {
    console.log(e)
  }
}

// Open Settings Page on installation
browser.runtime.onInstalled.addListener(async () => {
  browser.storage.sync.set(config);
  browser.action.setBadgeText({ text: " " });
  browser.action.setBadgeBackgroundColor({ color: color.gray }).catch(console.log);
  let url = browser.runtime.getURL("options/options.html");
  await browser.tabs.create({ url });

  addExtensionMessageListener('badge', (data) => {
    setBadgeStatus(data.status);
    setBadgeText(data.results);
  });

});

// listen to event for changes from saved data in storage
browser.storage.onChanged.addListener(async (data, namespace) => {

  console.log('data changed', data);
  if (data.results) {
    let text = data.results.newValue;
    if (typeof text != "string") text = JSON.stringify(text);
    if (!text) text = " ";

    setBadgeText(text);
  }

  if (data.show) {
    show = data.show.newValue;
  }

  if (data.status) {
    setBadgeStatus(data.status.newValue);
  }
});



browser.action.onClicked.addListener((tab) => {
  console.log('clicked');
  browser.storage.sync.set({ show: !show });
  // Open Obsidian Vault on extension menu button click
  // browser.storage.sync.get(['vault', 'status']).then(data => {
  //   if (data.status == "offline") fetch('obsidian://open?vault=' + data.vault);
  // })
});

async function setBadgeText(text) {
  const tabId = await getCurrTabId();
  browser.action.setBadgeText({ text, tabId });
}

async function setBadgeColor(colorName) {
  const tabId = await getCurrTabId();
  if (!tabId) return;
  const col = color[colorName];
  browser.action.setBadgeBackgroundColor({ color: col, tabId });
}

async function setBadgeStatus(status) {
  const colorName = statusColorMapping[status];
  setBadgeColor(colorName);
}