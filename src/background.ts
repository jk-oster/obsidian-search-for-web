import browser from "webextension-polyfill";
import {config} from './config.js';
import {Colors} from "./config.js";
import {getFromExtStorage} from "./store.js";
import {extensionStorage} from "./storage.js";
import {registerBadgeService} from "./background-services/BadgeService.js";
import {registerNoteService} from "./background-services/NoteService.js";
import {registerTabService} from "./background-services/TabService";

registerBadgeService();
registerTabService();
registerNoteService();

// Open Settings Page on FIRST installation
browser.runtime.onInstalled.addListener(async () => {
    browser.action.setBadgeText({text: ' '}).then();
    browser.action.setBadgeBackgroundColor({color: Colors.gray}).catch(console.log);

    // Set default config
    const provider = await extensionStorage.getItem('provider');
    if (!provider) {
        browser.storage.sync.set(config).then();
        browser.runtime.openOptionsPage().then();
    }
});

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

browser.action.onClicked.addListener(async (tab) => {
    // console.log('clicked');
    const show = await getFromExtStorage('show');
    browser.storage.sync.set({show: !show}).then();
});
