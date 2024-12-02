import browser from "webextension-polyfill";
import {config} from './config.js';
import {addExtensionMessageListener, } from "./service.js";
import {Actions, Colors, StatusColorMapping } from "./config.js";
import {Color, State, BadgeActionData, OpenUrlActionData, FetchActionData} from "./types.js";
import { getFromExtStorage, saveToExtStorage } from "./store.js";


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

addExtensionMessageListener<BadgeActionData>(Actions.badge, (data) => {
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

addExtensionMessageListener<OpenUrlActionData>(Actions.openUrl, (data) => {
    data = data as OpenUrlActionData;
    browser.tabs.create({url: data.url});
});

addExtensionMessageListener(Actions.openOptionsPage, () => {
    browser.runtime.openOptionsPage();
});

addExtensionMessageListener<FetchActionData>(Actions.fetch, async (data) => {
    data = data as FetchActionData;
    const response = await fetch(data.url, data.options);
    return await response.text();
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

browser.action.onClicked.addListener(async (tab) => {
    // console.log('clicked');
    const show = await getFromExtStorage('show');
    browser.storage.sync.set({show: !show});
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
