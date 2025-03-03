import {reactive, watch, UnwrapNestedRefs, onMounted, ref} from "vue";
import {useDebounceFn} from '@vueuse/core';
import browser from "webextension-polyfill";
import {config} from "./config.js";
import type {ExtensionConfig} from "./types.js";
import { proxyToPlainObject } from "./firefox-util.js";

/**
 * Store for all data that needs to be shared across components & synced with extension storage
 */
const state: UnwrapNestedRefs<{ store: ExtensionConfig }> = reactive({
    store: config,
});
export const store: UnwrapNestedRefs<ExtensionConfig> = state.store;
export const storeInitialized = ref<boolean>(false);

function once(fn: Function|null, context: any = null) { 
    let result: any = undefined;
    let called = false;
    return function() { 
        if (fn && !called) {
            called = true;
            // @ts-ignore
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}

once(syncStoreWithExtStorage)();

/**
 * Two-Way-Sync extension storage with store variable (ext<->store)
 */
async function syncStoreWithExtStorage() {
    // console.log('store syncing');
    if (!storeInitialized.value) {
        await loadAllFromExtStorageToStore();
        setExtStorageListeners(saveExtStorageChangesToStore, saveExtStorageChangesToStore);
        await initDebouncedReactiveStoreListener();
        storeInitialized.value = true;
        // console.log('store initialized');
    }
}

// Load all extension storage values to store variable to sync them initially
async function loadAllFromExtStorageToStore() {
    store.show = false;
    store.showInPageIcon = false;
    store.showSidebarWhenNoResults = false;
    return await browser.storage.sync.get(config).then((data) => {
        store.restApiProtocol = data.restApiProtocol;
        store.protocol = data.protocol;
        store.restApiPort = Number(data.restApiPort);
        store.port = Number(data.port);
        store.provider = data.provider;
        store.apiKey = data.apiKey;
        store.searchUrls = data.searchUrls;
        store.excludes = data.excludes;
        store.noteNumber = Number(data.noteNumber);
        store.minChars = Number(data.minChars);
        store.show = Boolean(data.show);
        store.showSidebarWhenNoResults = Boolean(data.showSidebarWhenNoResults);
        store.searchString = data?.searchString ?? '';
        store.currentUrl = data?.currentUrl ?? '';
        store.contextLength = Number(data.contextLength);
        store.liveSearch = Boolean(data.liveSearch);
        store.showSidebarOnButtonHover = Boolean(data?.showSidebarOnButtonHover);
        store.allowDraggingButton = Boolean(data?.allowDraggingButton);
        store.showInPageIcon = Boolean(data?.showInPageIcon);
        store.showInPageIconWhenNoResults = Boolean(data?.showInPageIconWhenNoResults);
        store.sidePanelOpen = Boolean(data?.sidePanelOpen);
        store.vault = data.vault;
        store.matchCount = Number(data.matchCount);
        store.highlight = Boolean(data.highlight);
        store.highlighting = Boolean(data.highlighting);
        
        store.embeddedResults = Boolean(data.embeddedResults);
        store.nativeResults = Boolean(data.nativeResults);
        store.preferSidebarEmbeddings = Boolean(data.preferSidebarEmbeddings);
        
        store.theme = data.theme;
        store.period = data.period;
        
        store.dedicatedNoteNotifications = Boolean(data.dedicatedNoteNotifications);
        store.linkHoverDedicatedNoteBadge = Boolean(data.linkHoverDedicatedNoteBadge);
        store.linkHoverNoteMentions = Boolean(data.linkHoverNoteMentions);
        
        store.pinHotKeyConfig = data.pinHotKeyConfig;
        store.openPeriodicHotKeyConfig = data.openPeriodicHotKeyConfig;
        store.appendPeriodicHotKeyConfig = data.appendPeriodicHotKeyConfig;
        store.newNoteHotKeyConfig = data.newNoteHotKeyConfig;
        store.settingsHotKeyConfig = data.settingsHotKeyConfig;
        store.searchHotKeyConfig = data.searchHotKeyConfig;
    });
}

// Initializes watcher to sync reactive store changes to the extension storage (store->ext)
async function initDebouncedReactiveStoreListener() {
    const setStorage = (newVal: any) => browser.storage.sync.set(newVal);
    const debouncedSet = useDebounceFn(setStorage, 300);

    watch(
        () => state.store, // Getter function to access the reactive object
        async (newVal: any, oldVal: any) => {
            debouncedSet(proxyToPlainObject(newVal)).then();
        },
        {deep: true} // Set deep to true if you want to watch nested properties
    );
}

// Save all changes from extension storage event to store variable
const saveExtStorageChangesToStore = (changes: any) => {
    for (const key in changes) {
        // @ts-ignore
        if (store[key] === changes[key].newValue) continue
        // @ts-ignore
        store[key] = changes[key].newValue;
    }
}

// Set listeners for extension storage changes
function setExtStorageListeners(syncFunction: (changes: any) => void, localFunction: (changes: any) => void | undefined) {
    browser.storage.onChanged.addListener((changes, areaName) => {
        // console.log('changes', changes, 'areaName', areaName);

        if (areaName === "sync" && syncFunction) {
            syncFunction(changes);
        } else if (areaName === "local" && localFunction) {
            localFunction(changes);
        }
    });
}
