
// import browserPolyfill from "webextension-polyfill";
// const browser = browserPolyfill ?? chrome;
import browser from "webextension-polyfill";


//----------------------------------------------------------------
// Extension Messaging Service
//----------------------------------------------------------------

// Send a message to the current content script
export async function sendToCurrentContentScript(message = { action: '', data: null }) {
    try {
        browser.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
            if (tabs.length > 0 && /^https?:\/\//.test(tabs[0].url)) {
                console.log('sending to current tab though browser', tabs, message);
                return await browser.tabs.sendMessage(tabs[0].id, message);
            }
            console.log('no valid tab found');
        });
    } catch (e) {
        console.log(e)
    }
}

// Send a message to the background service
export async function sendToRuntime({ action = '', data = null }, windowEvent = false) {
    try {
        console.log('sending to runtime from browser:', action, data);

        // Also dispatch the message as a custom event to the window
        if (windowEvent) {
            dispatchWindowMessage(action, data);
        }

        return await browser.runtime.sendMessage({ action, data });
    } catch (e) {
        console.log(e)
    }
}

// Send a message to all content scripts
export async function sendToAllContentScripts({ action = '', data = null }, responseCallback = (result) => {
}) {
    try {
        await browser.tabs.query({}).then(async (tabs) => {
            console.log('sending to all content scripts though browser', tabs);
            for (const tab of tabs) {
                console.log('sending to tab though browser', tab);
                await browser.tabs.sendMessage(tab.id, { action, data }).then(responseCallback);
            }
        });
    } catch (e) {
        console.log(e)
    }
}

// Add a listener for messages from the extension runtime
export async function addExtensionMessageListener(action = 'update', callbackFn = (data) => {
}) {
    try {
        if (browser) {
            // Add a listener for the runtime message from the background service
            browser.runtime.onMessage.addListener(async (message, sender) => {
                if ('action' in message && message['action'] === action) {
                    console.log('received runtime message from browser: ' + action, message);
                    callbackFn(message?.data ?? message);
                }
            });
        } else {
            chrome.runtime.onMessage.addListener(async (message, sender) => {
                if ('action' in message && message['action'] === action) {
                    console.log('received runtime message from browser: ' + action, message);
                    callbackFn(message?.data ?? message);
                }
            });
        }

        if (window) {
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
export function dispatchWindowMessage(action = '', data = {}) {
    if (!window) return;
    const event = new CustomEvent(action, data);
    window.dispatchEvent(event);
}