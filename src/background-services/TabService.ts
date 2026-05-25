import {defineProxyService} from '@webext-core/proxy-service';
import browser from "webextension-polyfill";

const browserAction = browser?.action || browser?.browserAction;

class TabService {

    async getCurrTabId(matches: RegExp | null = null) {
        return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            const currTab = tabs[0];
            // @ts-ignore
            if (currTab && (!matches || matches.test(currTab.url))) {
                return currTab.id;
            }
            return undefined;
        })
    }

    async openUrl(url: string) {
        return await browser.tabs.create({url});
    }

    getExtensionUrl(extensionFilePath: string): string {
        return browser.runtime.getURL(extensionFilePath);
    }

    async openExtensionUrl(extensionFilePath: string) {
        const url = this.getExtensionUrl(extensionFilePath);
        return await this.openUrl(url);
    }

    async openOptionsPage() {
        await browser.runtime.openOptionsPage();
    }

    async openPopup() {
        await browserAction?.openPopup();
    }

    async openChromeSidePanel() {
        const window = await chrome.windows.getCurrent();
        if (window.id !== undefined) {
            await chrome.sidePanel.open({windowId: window.id});
        }
    }

    async getExtensionId() {
        return browser.runtime.id;
    }

    async openFirefoxSideBar() {
        await browser.sidebarAction?.open();
    }

    getManifest() {
        return browser.runtime.getManifest();
    }
}

export const [registerTabService, getTabService] = defineProxyService(
    'TabService',
    () => new TabService(),
);
