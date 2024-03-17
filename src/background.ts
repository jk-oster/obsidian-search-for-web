import browser from "webextension-polyfill";
// @ts-ignore
import { config } from './config.js';

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
    const currTab = tabs[0];
    // @ts-ignore
    if (currTab && (!matches || matches.test(currTab.url))) {
      return currTab.id;
    }
    return undefined;
  })
}

export async function addExtensionMessageListener(action = 'update', callbackFn = (data: any) => {
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

async function setBadgeText(text: string) {
  const tabId = await getCurrTabId();
  browser.action.setBadgeText({ text, tabId });
}

async function setBadgeColor(colorName: string) {
  const tabId = await getCurrTabId();
  if (!tabId) return;
  // @ts-ignore
  const col = color[colorName];
  browser.action.setBadgeBackgroundColor({ color: col, tabId });
}

async function setBadgeStatus(status: string) {

  // @ts-ignore
  const colorName = statusColorMapping[status];
  setBadgeColor(colorName);
}

// -------------------------------------------------------
// Side Panel
// -------------------------------------------------------

// const GOOGLE_ORIGIN = 'https://www.google.com';

// browser.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) return;
//   const url = new URL(tab.url);
//   // Enables the side panel on google.com
//   if (url.origin === GOOGLE_ORIGIN) {
//     await browser.sidePanel.setOptions({
//       tabId,
//       path: 'side-panel/side-panel.html',
//       enabled: true
//     });
//   } else {
//     // Disables the side panel on all other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });

// browser.runtime.onInstalled.addListener(() => {
//   browser.contextMenus.create({
//     id: 'openSidePanel',
//     title: 'Open side panel',
//     contexts: ['all']
//   });
// });

// browser.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === 'openSidePanel') {
//     // This will open the panel in all the pages on the current window.
//     browser.sidePanel.open({ windowId: tab.windowId });
//   }
// });

// const welcomePage = 'sidepanels/welcome-sp.html';
// const mainPage = 'sidepanels/main-sp.html';

// browser.runtime.onInstalled.addListener(() => {
//   browser.sidePanel.setOptions({ path: welcomePage });
// });

// browser.tabs.onActivated.addListener(async ({ tabId }) => {
//   const { path } = await browser.sidePanel.getOptions({ tabId });
//   if (path === welcomePage) {
//     browser.sidePanel.setOptions({ path: mainPage });
//   }
// });

