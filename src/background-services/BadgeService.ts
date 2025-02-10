import {defineProxyService} from '@webext-core/proxy-service';
import browser from "webextension-polyfill";
import type {Color, SearchProvider, State} from "../types.js";
import {Status, StatusColorMapping} from "../config.js";

class BadgeService {
    async getCurrTabId(matches = null) {
        return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
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
        browser.action.setBadgeText({text, tabId}).then();
    }

    async setBadgeColor(color: Color) {
        const tabId = await this.getCurrTabId();
        if (!tabId) return;
        browser.action.setBadgeBackgroundColor({color, tabId}).then();
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

    async checkApiStatus(url: string, apiKey: string | null, provider: SearchProvider) {
        const options = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + apiKey
            },
        };

        let statusText = '';
        let status: State;
        let text = ' ';

        try {
            if (provider === 'omni-search') {
                const resp = await fetch(url + "/search");
                if (resp.ok) {
                    statusText = "✅ Successfully connected to Obsidian OmniSearch";
                    status = Status.search;
                } else {
                    statusText = '❗ Could not reach Obsidian OmniSearch - Make sure Obsidian is running and check your Protocol / Port settings!';
                    status = Status.error
                }
            } else if (provider === 'local-rest') {
                const resp = await fetch(url + "/", options);
                const data = await resp.json();
                if (resp.ok && data.status == 'OK' && data.authenticated) {
                    statusText = "✅ Successfully connected to Obsidian REST API";
                    status = Status.search;
                } else {
                    statusText = '🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings';
                    text = '🔑';
                    status = Status.noauth;
                }
            } else {
                statusText = '💡 Select a Search Provider';
                status = Status.error;
                text = '❓';
            }
        } catch (e: any) {

            text = ' ';
            status = Status.offline;

            if (provider === 'omni-search') {
                statusText = '❗ Could not reach Obsidian OmniSearch - Make sure Obsidian Omnisearch HTTP Server is running and check your Protocol / Port settings!';
            } else if (provider === 'local-rest') {
                statusText = '❗ Could not reach Obsidian REST API - Make sure Obsidian REST API is running and check your Protocol / Port settings!';
            } else {
                statusText = '💡 Select a Search Provider';
                status = Status.error;
                text = '❓';
            }
        }

        this.setBadgeStatus(status).then();
        this.setBadgeText(text).then();

        return {
            status, statusText, text, provider
        };
    }

}

export const [registerBadgeService, getBadgeService] = defineProxyService(
    'BadgeService',
    () => new BadgeService(),
);