import {defineExtensionStorage} from '@webext-core/storage';
import browser from 'webextension-polyfill';
import {ExtensionConfig} from "./types.js";
// import {config} from "./config.js";

export const extensionStorage = defineExtensionStorage<ExtensionConfig>(browser.storage.sync);

// export const getCurrentExtensionConfig = async () => await browser.storage.sync.get(config) as ExtensionConfig;

// export const watchShow = (fn: (show: boolean) => void) => browser.storage.sync.onChanged.addListener(changes => {
//     if('show' in changes) {
//         fn(!!changes.show.newValue);
//     }
// });
//
// export const watchStatus = (fn: (status: State) => void) => browser.storage.sync.onChanged.addListener(changes => {
//     if('status' in changes) {
//         fn(changes.status.newValue as State);
//     }
// });
