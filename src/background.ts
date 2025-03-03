import browser from "webextension-polyfill";
import {config, Colors, MIGRATION, Status} from './config.js';
import {useExtensionStorage} from "./storage.js";
import {registerBadgeService} from "./background-services/BadgeService.js";
import {registerNoteService} from "./background-services/NoteService.js";
import {registerTabService} from "./background-services/TabService";
import {registerConnectionService} from "./background-services/ConnectionService";

const {migrate, extensionStorage} = useExtensionStorage();

// Firefox Manifest v2 does not support action.setBadgeText
const browserAction = browser?.action || browser?.browserAction;

registerBadgeService();
registerTabService();
registerNoteService();
registerConnectionService();

const runMigration = () => {
    browser.storage.local.set({version: MIGRATION});

    migrate(config, (oldConf) => {
        return {
            version: MIGRATION,
        };
    }).then()
};

// Runs every time  the browser is opened / restarted
browser.runtime.onInstalled.addListener(async () => {

    browserAction.setBadgeText({text: ' '}).then();
    browserAction.setBadgeBackgroundColor({color: Colors.gray}).catch(console.log);

    browser.runtime.setUninstallURL('https://docs.google.com/forms/d/e/1FAIpQLSdKiffrH7BhdbpTx8PU0E8bCoDkIBu1tI70TYT852tdF5KQFQ/viewform?usp=dialog');

    // Set default config on first launch & install
    // Open Settings Page on FIRST installation only
    const {version} = await browser.storage.local.get('version');
    if (version !== MIGRATION) {
        await runMigration();
        browser.runtime.openOptionsPage().then();
    } else {
        await runMigration();
    }
});

// Toggle Pinning Sidebar
browserAction?.onClicked?.addListener(async (tab) => {
    const {version} = await browser.storage.local.get('version');

    if (version !== MIGRATION) {
        await runMigration();
        browser.runtime.openOptionsPage().then();
    }

    const show = await extensionStorage.getItem('show');
    browser.storage.sync.set({show: !show}).then();
});
