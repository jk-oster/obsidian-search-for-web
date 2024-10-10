import browser from "webextension-polyfill";
import {config} from './config.js';
import {addExtensionMessageListener, } from "./service.js";
import {Actions, Colors, StatusColorMapping } from "./config.js";
import {Color, State, BadgeActionData} from "./types.js";
import { saveToExtStorage } from "./store.js";

let show = true;

async function getCurrTabId(matches = null) {
    return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        const currTab = tabs[0];
        // @ts-ignore
        if (currTab && (!matches || matches.test(currTab.url))) {
            return currTab.id;
        }
        return undefined;
    })
}

// Open Settings Page on installation
browser.runtime.onInstalled.addListener(async () => {
    browser.storage.sync.set(config);
    browser.action.setBadgeText({text: " "});
    browser.action.setBadgeBackgroundColor({color: Colors.gray}).catch(console.log);
    let url = browser.runtime.getURL("src/options/options.html");
    await browser.tabs.create({url});

    // addExtensionMessageListener(Actions.openUrl, async (data) => {
    //     data = data as OpenUrlActionData;
    //     let url = browser.runtime.getURL(data.url);
    //     await browser.tabs.create({url});
    // });
});

addExtensionMessageListener(Actions.badge, (data) => {
    data = data as BadgeActionData;
    if(data.status) {
        setBadgeStatus(data.status.toString());
        saveToExtStorage('status', data.status);
    }
    if(data.text) {
        setBadgeText(data.text.toString());
        saveToExtStorage('results', data.text);
    }
    if(data.statusText) {
        saveToExtStorage('statusText', data.statusText);
    }
});

// listen to event for changes from saved data in storage
browser.storage.onChanged.addListener(async (data, namespace) => {
    // console.log('data changed', data);
    if (data.results) {
        let text = data.results.newValue;
        if (typeof text != "string") text = text.toString();
        if (!text) text = " ";

        setBadgeText(text);
    }

    if (data.status) {
        setBadgeStatus(data.status.newValue);
    }
});

browser.action.onClicked.addListener((tab) => {
    // console.log('clicked');
    browser.storage.sync.set({show: !show});
    show = !show;
});

async function setBadgeText(text: string) {
    const tabId = await getCurrTabId();
    browser.action.setBadgeText({text, tabId});
}

async function setBadgeColor(color: Color) {
    const tabId = await getCurrTabId();
    if (!tabId) return;
    browser.action.setBadgeBackgroundColor({color, tabId});
}

async function setBadgeStatus(status: State) {
    const colorName: Color = StatusColorMapping[status];
    if (!colorName) return;
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

