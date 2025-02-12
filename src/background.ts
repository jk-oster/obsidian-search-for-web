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

// Open Settings Page on FIRST installation
browser.runtime.onInstalled.addListener(async () => {
    browser.action.setBadgeText({text: ' '}).then();
    browser.action.setBadgeBackgroundColor({color: Colors.gray}).catch(console.log);

    const runMigration = () => migrate(config, (oldConf) => {
        return {
            version: MIGRATION,
            restApiPort: oldConf?.provider === 'local-rest' ? (oldConf?.port ?? 27124) : 27124,
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
            searchUrls: 'google.com,duckduckgo.com,bing.com,startpage.com,ecosia.org,search.brave.com,kagi.com,yandex.com,qwant.com,search.yahoo.com,baidu.com',
            highlight: true,
            embeddedResults: true,
            highlighting: true,
            nativeResults: true,
            theme: 'auto',
        };
    }).then();

    // Set default config on first launch & install
    const provider = await extensionStorage.getItem('provider');
    const version = await extensionStorage.getItem('version');
    if (!provider || version !== MIGRATION) {
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
