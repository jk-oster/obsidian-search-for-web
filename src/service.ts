import browser from "webextension-polyfill";
import {Message, Action} from "./types.js";

// Send a message to the background service
export async function sendToRuntime(message: Message<Action, any>, windowEvent = false) {
    try {
        // console.log('sending to runtime from browser:', message.action, message.data);
        // Also dispatch the message as a custom event to the window
        if (windowEvent) {
            dispatchWindowMessage(message.action, message.data);
        }

        return await browser.runtime.sendMessage(message);
    } catch (e) {
        console.log(e)
    }
}

// Dispatch a custom event to the window
export function dispatchWindowMessage(action: Action, data = {}) {
    if (!window) return;
    const event = new CustomEvent(action, data);
    window.dispatchEvent(event);
}
