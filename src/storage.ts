import {defineExtensionStorage} from '@webext-core/storage';
import browser from 'webextension-polyfill';
import type {ExtensionConfig} from "./types.js";

export const extensionStorage = defineExtensionStorage<ExtensionConfig>(browser.storage.sync);

export function useExtensionStorage() {

    async function getAllFromExtStorage() {
        const currentData = await browser.storage.sync.get();
        return currentData as ExtensionConfig;
    }

    async function migrate(defaultExtensionConfig: ExtensionConfig, overrideExtensionConfig: Partial<ExtensionConfig>|((oldData: any) => Partial<ExtensionConfig>)) {
        const currentData = await browser.storage.sync.get();

        const override = typeof overrideExtensionConfig === 'object' ? overrideExtensionConfig : overrideExtensionConfig(currentData);
        const newData = {...defaultExtensionConfig, ...currentData, ...override};

        const currentKeys = Object.keys(currentData);
        const newKeys = Object.keys(defaultExtensionConfig);
        const keysToRemove = currentKeys.filter(key => !newKeys.includes(key));

        for (const key of keysToRemove) {
            await browser.storage.sync.remove(key);
        }

        const newStorageData = newKeys.reduce((obj: object, key: string) =>
            {
                // @ts-ignore
                obj[key] = newData[key];
                return obj;
            }, {}
        );

        await browser.storage.sync.set(newStorageData);
    }

    async function watchExtensionValue(key: keyof ExtensionConfig, callback: ((newValue: any, oldValue: any) => void)): Promise<void> {
        browser.storage.sync.onChanged.addListener(changes => {
            if(key in changes) {
                callback(changes[key].newValue, changes[key].oldValue);
            }
        });
    }

    return {
        getAllFromExtStorage,
        migrate,
        watchExtensionValue,
        extensionStorage
    }
}

// export const getCurrentExtensionConfig = async () => await browser.storage.sync.get(config) as ExtensionConfig;

// export const watchShow = (fn: (show: boolean) => void) =>
//
// export const watchStatus = (fn: (status: State) => void) => browser.storage.sync.onChanged.addListener(changes => {
//     if('status' in changes) {
//         fn(changes.status.newValue as State);
//     }
// });
