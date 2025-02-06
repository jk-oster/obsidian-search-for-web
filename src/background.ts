import browser from "webextension-polyfill";
import {config, Colors, MIGRATION} from './config.js';
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

    // Set default config on first launch & install
    const provider = await extensionStorage.getItem('provider');
    const version = await extensionStorage.getItem('version');
    if (!provider || version !== MIGRATION) {
        browser.storage.sync.set(config).then();
        browser.runtime.openOptionsPage().then();
    }
});

// Toggle Pinning Sidebar
browser.action.onClicked.addListener(async (tab) => {
    const show = await getFromExtStorage('show');
    browser.storage.sync.set({show: !show}).then();
});
