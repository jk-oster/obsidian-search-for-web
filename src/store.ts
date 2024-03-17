import {reactive, watch} from "vue";
import {config} from "./config.js";
import browser from "webextension-polyfill";
import {UnwrapNestedRefs} from "vue";
import {ExtensionConfig} from "./types";

/**
 * Store for all data that needs to be shared across components & synced with extension storage
 */
export const store: UnwrapNestedRefs<ExtensionConfig> = reactive(config);

//----------------------------------------------------------------
// Extension Storage Sync Service Functions
//----------------------------------------------------------------

// Two-Way-Sync extension storage with store variable (ext<->store)
export async function syncStoreWithExtStorage(store: ExtensionConfig) {
    await loadAllFromExtStorageTo(store);
    initStorageListeners(store);
    await initReactiveStoreListeners(store);
}

// Load all extension storage values to store variable to sync them initially
export async function loadAllFromExtStorageTo(store: ExtensionConfig) {
    return browser.storage.sync.get().then((data) => {
        store.protocol = data.protocol;
        store.port = Number(data.port);
        store.apiKey = data.apiKey;
        store.obsidianRestUrl = data.obsidianRestUrl;
        store.searchUrls = data.searchUrls;
        store.excludes = data.excludes;
        store.noteNumber = Number(data.noteNumber);
        store.minChars = Number(data.minChars);
        store.show = Boolean(data.show);
        store.searchString = data?.searchString ?? '';
        store.contextLength = Number(data.contextLength);
        store.liveSearch = Boolean(data.liveSearch);
        store.showInPageIcon = Boolean(data?.showInPageIcon);
        store.vault = data.vault;
        store.matchCount = Number(data.matchCount);

        store.status = data.status;
        store.statusText = data.statusText;
        store.results = data.results;
        store.color = data.color;
    });
}

// Save all store values to extension storage to persist them across sessions, pages & devices
export async function saveToExtStorageFrom(store: ExtensionConfig) {
    browser.storage.sync.set({
        protocol: store.protocol,
        port: Number(store.port),
        apiKey: store.apiKey,
        obsidianRestUrl: store.obsidianRestUrl,
        searchUrls: store.searchUrls,
        excludes: store.excludes,
        noteNumber: Number(store.noteNumber),
        minChars: Number(store.minChars),
        show: Boolean(store.show),
        searchString: store.searchString,
        contextLength: Number(store.contextLength),
        liveSearch: Boolean(store.liveSearch),
        showInPageIcon: Boolean(store.showInPageIcon),
        vault: store.vault,
        matchCount: Number(store.matchCount),

        status: store.status,
        statusText: store.statusText,
        results: store.results,
        color: store.color,
    });
}

// Save a single value to extension storage to persist it across sessions, pages & devices
export function saveToExtStorage(name: string, value: any) {
    console.log('saveToExtStorage', name, value);
    browser.storage.sync.set({
        [name]: value,
    });
}

// Save a single value to extension storage and additional store object to persist it across sessions, pages & devices
export function saveToExtStorageAnd(store: ExtensionConfig, name: string, value: any) {
    // @ts-ignore
    store[name] = value;
    saveToExtStorage(name, value);
    return store;
}

// Load a single value from extension storage
export async function loadFromExtStorage(propName: string) {
    return browser.storage.sync.get(propName).then((result) => {
        return result[propName];
    });
}

// Initialize extension storage listeners to sync extension storage changes to reactive store (ext->store)
export function initStorageListeners(store: ExtensionConfig) {
    // @ts-ignore
    setStorageListeners([saveExtStorageChangesTo(store)], [saveExtStorageChangesTo(store)]);
}

// Initializes watcher to sync reactive store changes to the extension storage (store->ext)
export async function initReactiveStoreListeners(store: ExtensionConfig) {
    console.log('initReactiveStoreListeners', store);
    watch(
        () => store, // Getter function to access the reactive object
        async (newVal, oldVal) => {
            console.log('newVal', newVal, 'oldVal', oldVal);
            browser.storage.sync.set(newVal);
        },
        {deep: true} // Set deep to true if you want to watch nested properties
    );
}

// Save all changes from extension storage event to store variable
export const saveExtStorageChangesTo = (store: ExtensionConfig) => (changes: any) => {
    for (const key in changes) {
        // @ts-ignore
        if (store[key] === changes[key].newValue) continue
        // @ts-ignore
        store[key] = changes[key].newValue;
    }
}

// Set listeners for extension storage changes
export function setStorageListeners(syncFunctions = [], localFunctions = []) {
    browser.storage.onChanged.addListener((changes, areaName) => {
        console.log('changes', changes, 'areaName', areaName);

        if (areaName === "sync") {
            for (const func of syncFunctions) {
                // @ts-ignore
                func(changes);
            }
        } else if (areaName === "local") {
            for (const func of localFunctions) {
                // @ts-ignore
                func(changes);
            }
        }
    });
}