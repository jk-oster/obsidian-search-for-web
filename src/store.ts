import { reactive, watch, UnwrapNestedRefs } from "vue";
import browser from "webextension-polyfill";
import {config} from "./config.js";
import {ExtensionConfig} from "./types.js";
import { useDebounceFn } from '@vueuse/core'

/**
 * Store for all data that needs to be shared across components & synced with extension storage
 */
const state: UnwrapNestedRefs<{ store: ExtensionConfig}> = reactive({
    store: config
});
export const store: UnwrapNestedRefs<ExtensionConfig> = state.store;

//----------------------------------------------------------------
// Extension Storage Sync Service Functions
//----------------------------------------------------------------

// Two-Way-Sync extension storage with store variable (ext<->store)
export async function syncStoreWithExtStorage() {
    await loadAllFromExtStorageToStore();
    setExtStorageListeners(saveExtStorageChangesToStore, saveExtStorageChangesToStore);
    await initDebouncedReactiveStoreListener();
}

// Load all extension storage values to store variable to sync them initially
export function loadAllFromExtStorageToStore() {

    return browser.storage.sync.get().then((data) => {
        store.protocol = data.protocol;
        store.port = Number(data.port);
        store.provider = data.provider;
        store.apiKey = data.apiKey;
        store.obsidianRestUrl = data.obsidianRestUrl;
        store.searchUrls = data.searchUrls;
        store.excludes = data.excludes;
        store.noteNumber = Number(data.noteNumber);
        store.minChars = Number(data.minChars);
        store.show = Boolean(data.show);
        store.searchString = data?.searchString ?? '';
        store.currentUrl = data?.currentUrl ?? '';
        store.contextLength = Number(data.contextLength);
        store.liveSearch = Boolean(data.liveSearch);
        store.showInPageIcon = Boolean(data?.showInPageIcon);
        store.sidePanelOpen = Boolean(data?.sidePanelOpen);
        store.vault = data.vault;
        store.matchCount = Number(data.matchCount);

        store.status = data.status;
        store.statusText = data.statusText;
        store.results = data.results;
        store.color = data.color;
    });
}

// Save a single value to extension storage to persist it across sessions, pages & devices
export async function saveToExtStorage(name: string, value: any) {
    // Check if value is different
    const current = await getFromExtStorage(name);
    if (current === value) return;
    
    return browser.storage.sync.set({
        [name]: value,
    });
}

// Load a single value from extension storage
export async function getFromExtStorage(propName: string) {
    return browser.storage.sync.get(propName).then((result) => {
        return result[propName];
    });
}

// Initializes watcher to sync reactive store changes to the extension storage (store->ext)
export async function initDebouncedReactiveStoreListener() {
    const setStorage = (newVal: any) => browser.storage.sync.set(newVal);
    const debouncedSet = useDebounceFn(setStorage, 250);

    watch(
        () => state.store, // Getter function to access the reactive object
        async (newVal: any, oldVal: any) => {
            // console.log('newVal', newVal, 'oldVal', oldVal);
            debouncedSet(newVal);
        },
        {deep: true} // Set deep to true if you want to watch nested properties
    );
}

// Save all changes from extension storage event to store variable
export const saveExtStorageChangesToStore  = (changes: any) => {
    for (const key in changes) {
        // @ts-ignore
        if (store[key] === changes[key].newValue) continue
        // @ts-ignore
        store[key] = changes[key].newValue;
    }
}

// Set listeners for extension storage changes
export function setExtStorageListeners(syncFunction: (changes: any) => void, localFunction:  (changes: any) => void|undefined) {
    browser.storage.onChanged.addListener((changes, areaName) => {
        // console.log('changes', changes, 'areaName', areaName);

        if (areaName === "sync" && syncFunction) {
            syncFunction(changes);
        } else if (areaName === "local" && localFunction) {
            localFunction(changes);
        }
    });
}
