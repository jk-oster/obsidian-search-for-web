import { useMagicKeys, watchOnce } from "@vueuse/core";
import { storeInitialized } from "./store.js";
import { watch, computed, WatchHandle, ComputedRef } from "vue";

const keys = useMagicKeys();

export function useHotkeys(keyConfig: string|ComputedRef<string>, onHotKeyPressed: () => void, onHotKeyReleased: () => void = () => {}) {

    let hotkeyWatcher: WatchHandle|null = null;
    const hotKeyConfig =  computed(() => {
        return (typeof keyConfig === 'string' ? keyConfig : keyConfig.value).trim().replaceAll(' ', '');
    });

    const createKeyWatcher = () => {
        if (!storeInitialized.value) return;
        
        if (hotkeyWatcher) hotkeyWatcher();
        if(hotKeyConfig.value) {
            const hotkey = keys[hotKeyConfig.value];
            hotkeyWatcher = watch(hotkey, (v) => {
                if(v) onHotKeyPressed();
                else onHotKeyReleased();
            });
        }
    }

    watch(hotKeyConfig, createKeyWatcher);

    watchOnce(storeInitialized, createKeyWatcher);
    createKeyWatcher();

    return {
        hotKeyConfig,
        keys,
    };
}