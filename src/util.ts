import browser from "webextension-polyfill";
import {sendToRuntime} from "./service";
import {Status, Message, MessageAction} from "./types";

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

export async function checkApiKey(url: string, apiKey: string) {
    console.log(url, apiKey);
    const options = {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + apiKey
        }
    };

    let statusText = '';
    let newConfig = {};

    try {
        const resp = await fetch(url + "/", options);
        const data = await resp.json();
        console.log('fetched data', data);

        if (data.status == 'OK' && data.authenticated) {
            statusText = "✅ Succcessfully connected to Obsidian";
            newConfig = {status: Status.search, statusText};
        } else {
            statusText = '🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings';
            newConfig = {status: Status.noauth, results: 'x', statusText};
        }
        ;
    } catch (e) {
        console.log('error reason', e);
        statusText = '❗ Make sure Obsidian is running and set your Protocol / Port settings to connect to your Obsidian REST Api!';
        newConfig = {status: Status.offline, results: 'off', statusText};
    }

    // browser.storage.sync.set(newConfig);
    // console.log('stored', newConfig);

    sendToRuntime({action: MessageAction.BADGE, data: newConfig}, true);

    return statusText;
}