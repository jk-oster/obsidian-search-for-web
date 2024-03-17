import browser from "webextension-polyfill";
import {Message, MessageAction} from "./types";

//----------------------------------------------------------------
// Extension Messaging Service
//----------------------------------------------------------------



// Send a message to the current content script
export async function sendToCurrentContentScript(message: Message) {
    try {
        browser.tabs.query({active: true, currentWindow: true}).then(async (tabs) => {
            if (tabs.length > 0 && /^https?:\/\//.test(tabs[0].url ?? '')) {
                console.log('sending to current tab though browser', tabs, message);
                return await browser.tabs.sendMessage(tabs[0].id ?? 0, message);
            }
            console.log('no valid tab found');
        });
    } catch (e) {
        console.log(e)
    }
}

// Send a message to the background service
export async function sendToRuntime(message: Message, windowEvent = false) {
    try {
        console.log('sending to runtime from browser:', message.action, message.data);

        // Also dispatch the message as a custom event to the window
        if (windowEvent) {
            dispatchWindowMessage(message.action, message.data);
        }

        return await browser.runtime.sendMessage(message);
    } catch (e) {
        console.log(e)
    }
}

// Send a message to all content scripts
export async function sendToAllContentScripts(message: Message, responseCallback = (result: any) => {
}) {
    try {
        await browser.tabs.query({}).then(async (tabs) => {
            console.log('sending to all content scripts though browser', tabs);
            for (const tab of tabs) {
                console.log('sending to tab though browser', tab);
                await browser.tabs.sendMessage(tab.id ?? 0, message).then(responseCallback);
            }
        });
    } catch (e) {
        console.log(e)
    }
}

// Add a listener for messages from the extension runtime
export async function addExtensionMessageListener(action: MessageAction, callbackFn = (data: any) => {
}) {
    try {
        // Add a listener for the runtime message from the background service
        browser.runtime.onMessage.addListener(async (message: Message, sender) => {
            if (message?.action === action) {
                console.log('received runtime message from browser: ' + action, message);
                callbackFn(message?.data ?? message);
            }
        });

        if (typeof window !== "undefined") {
            // Also add a listener for the custom event from the window
            addEventListener(action, (data) => {
                console.log('received event message from window: ' + action, data);
                callbackFn(data);
            });
        }
    } catch (e) {
        console.log(e)
    }
}

// Dispatch a custom event to the window
export function dispatchWindowMessage(action: MessageAction, data = {}) {
    if (!window) return;
    const event = new CustomEvent(action, data);
    window.dispatchEvent(event);
}
