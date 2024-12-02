import browser from "webextension-polyfill";
import {sendToRuntime} from "./service.js";
import { Status, Actions } from "./config.js";
import { BadgeActionData, State} from "./types.js";
import { getFromExtStorage } from "./store.js";

export function escapeRegex(string: string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

async function getCurrTabId(matches: RegExp | null) {
    return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        const currTab = tabs[0];
        if (currTab && (!matches || matches?.test(currTab.url ?? ''))) {
            return currTab.id;
        }
        return undefined;
    })
}

export async function checkApiKey(url: string, apiKey: string, provider: string) {
    // console.log(url, apiKey);
    const options = {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + apiKey
        }
    };

    let statusText = '';
    let newConfig: BadgeActionData = {
        status: Status.unknown,
        text: ' '
    };

    try {
        // console.log('fetched data', provider);
        if (provider === 'omni-search') {
            const resp = await fetch(url + "/search");
            if (resp.ok) {
                statusText = "✅ Succcessfully connected to Obsidian OmniSearch";
                newConfig = {status: Status.search, text: ' ', statusText};
            } else {
                throw new Error('Could reach Obsidian OmniSearch');
            }
        }
        
        if (provider === 'local-rest') {
            const resp = await fetch(url + "/", options);
            const data = await resp.json();
            if (resp.ok && data.status == 'OK' && data.authenticated) {
                statusText = "✅ Succcessfully connected to Obsidian REST API";
                newConfig = {status: Status.search, text: ' ', statusText};
            } else {
                statusText = '🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings';
                newConfig = {status: Status.noauth, text: '🔑', statusText};
            }
        }
    } catch (e) {
        console.log('error reason', e);
        statusText = '❗ Make sure Obsidian is running and set your Protocol / Port settings to connect to your Obsidian Search Provider!';
        newConfig = {status: Status.offline, text: 'off', statusText};
    }

    sendToRuntime({action: Actions.badge, data: newConfig}, true);

    return newConfig;
}