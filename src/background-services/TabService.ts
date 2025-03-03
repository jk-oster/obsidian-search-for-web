import {defineProxyService} from '@webext-core/proxy-service';
import browser from "webextension-polyfill";

// Firefox Manifest v2 does not support action.setBadgeText
const browserAction = browser?.action || browser?.browserAction;

class TabService {

    async getCurrTabId(matches = null) {
        return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            const currTab = tabs[0];
            // @ts-ignore
            if (currTab && (!matches || matches.test(currTab.url))) {
                return currTab.id;
            }
            return -1;
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
        const tabId = await this.getCurrTabId() ?? 0;
        await chrome.sidePanel.open({windowId: tabId})
    }

    async getExtensionId() {
        return browser.runtime.id;
    }

    async openFirefoxSideBar() {
        await browser.sidebarAction?.open();
    }

    async getManifest() {
        return await browser.runtime.getManifest();
    }
}

export const [registerTabService, getTabService] = defineProxyService(
    'TabService',
    () => new TabService(),
);