import browser from "webextension-polyfill";
import {config, Colors, MIGRATION, Status} from './config.js';
import {useExtensionStorage} from "./storage.js";
import {registerBadgeService} from "./background-services/BadgeService.js";
import {registerNoteService} from "./background-services/NoteService.js";
import {registerTabService} from "./background-services/TabService";
import {registerConnectionService} from "./background-services/ConnectionService";

const {migrate, extensionStorage} = useExtensionStorage();

registerBadgeService();
registerTabService();
registerNoteService();
registerConnectionService();

// Runs every time  the browser is opened / restarted
browser.runtime.onInstalled.addListener(async () => {
    browser.action.setBadgeText({text: ' '}).then();
    browser.action.setBadgeBackgroundColor({color: Colors.gray}).catch(console.log);

browser.runtime.setUninstallURL('https://docs.google.com/forms/d/e/1FAIpQLSdKiffrH7BhdbpTx8PU0E8bCoDkIBu1tI70TYT852tdF5KQFQ/viewform?usp=dialog');

    const runMigration = () => {
        browser.storage.local.set({version: MIGRATION});

        migrate(config, (oldConf) => {
            return {
                version: MIGRATION,
                restApiPort: 27123,
                restApiProtocol: oldConf?.protocol ?? "http://",
                show: false,
                showSidebarWhenNoResults: true,
                liveSearch: true,
                showInPageIcon: true,
                showInPageIconWhenNoResults: true,
                sidePanelOpen: false,
                minChars: 2,
                contextLength: 50,
                matchCount: 3,
                noteNumber: 6,
                highlight: true,
                embeddedResults: true,
                highlighting: true,
                nativeResults: true,
                preferSidebarEmbeddings: true,
                theme: 'auto',
            };
        }).then()
    };

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
browser.action.onClicked.addListener(async (tab) => {
    const show = await extensionStorage.getItem('show');
    browser.storage.sync.set({show: !show}).then();
});
