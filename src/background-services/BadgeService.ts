import {defineProxyService} from '@webext-core/proxy-service';
import browser from "webextension-polyfill";
import type {Color, SearchProvider, State} from "../types.js";
import {Status, StatusColorMapping} from "../config.js";

// Firefox Manifest v2 does not support action.setBadgeText
const browserAction = browser?.action || browser?.browserAction;

class BadgeService {
    async getCurrTabId(matches = null) {
        return browser?.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            const currTab = tabs[0];
            // @ts-ignore
            if (currTab && (!matches || matches.test(currTab.url))) {
                return currTab.id;
            }
            return undefined;
        })
    }

    async setBadgeText(text: string) {
        if (!text || text === '') text = ' ';
        const tabId = await this.getCurrTabId();

        browserAction?.setBadgeText({text, tabId}).then();
    }

    async setBadgeColor(color: Color) {
        const tabId = await this.getCurrTabId();
        if (!tabId) return;

        browserAction?.setBadgeBackgroundColor({color, tabId}).then();
    }

    async setBadge({color, text, status}: { color: Color | null, text: string | null, status: State | null }) {
        if (color) {
            this.setBadgeColor(color).then();
        }
        if (text) {
            this.setBadgeText(text).then();
        }
        if (status) {
            this.setBadgeStatus(status).then();
        }
    }

    async setBadgeStatus(status: State) {
        const colorName: Color = StatusColorMapping[status];
        if (!colorName) return;
        this.setBadgeColor(colorName).then();
    }
}

export const [registerBadgeService, getBadgeService] = defineProxyService(
    'BadgeService',
    () => new BadgeService(),
);