import {getBadgeService} from "./background-services/BadgeService.js";
import {getConnectionService} from "./background-services/ConnectionService.js";
import {storeInitialized, store} from "./store.js";
import {Status} from "./config.js";
import type {SearchProvider} from "./types.js";
import {computed, ref} from "vue";
import {useThrottleFn, watchImmediate} from "@vueuse/core";

const badgeService = getBadgeService();
const connectionService = getConnectionService();
const connectionStatus = ref<string>('');
const connectionInfo = ref<string>('🔄️ Checking your local Obsidian connection');
const restApiStatus = ref<string>('');

export function useObsidianConnection(delay: number = 0) {

    const detectConnection = async (provider: SearchProvider = store.provider) => {
        const isOmni = provider === 'omni-search';
        const url = (isOmni ? store.protocol + 'localhost' : store.restApiProtocol + '127.0.0.1')
            + ':' + (isOmni ? store.port : store.restApiPort);

        connectionInfo.value = isOmni
            ? '🔄️ Checking Obsidian Omnisearch connection'
            : '🔄️ Checking Obsidian REST API connection';

        try {
            const {status, statusText, text} = await connectionService.checkApiStatus(url, store.apiKey, provider);

            connectionInfo.value = statusText;

            if (provider === 'local-rest') {
                restApiStatus.value = status ?? Status.unknown;
            }

            if (provider === store.provider) {
                connectionStatus.value = status ?? Status.unknown;
                badgeService.setBadgeStatus(status).catch(console.warn);
                badgeService.setBadgeText(text).catch(console.warn);
            }
        } catch (e) {
            console.warn('Connection check failed:', e);
        }
    };

    const throttledConnectionCheck = useThrottleFn(() => detectConnection(), 100);
    const throttledRestApiConnectionCheck = useThrottleFn(() => detectConnection('local-rest'), 100);

    watchImmediate(storeInitialized, async () => {
        if (storeInitialized.value) {
            if (restApiStatus.value !== Status.search) {
                await throttledRestApiConnectionCheck();
            }
            if (connectionStatus.value !== Status.search) {
                await throttledConnectionCheck();
            }
        }
    });

    const isConnected = computed(() => connectionStatus.value === Status.search);
    const isRestApiConnected = computed(() => restApiStatus.value === Status.search);

    return {
        throttledConnectionCheck,
        throttledRestApiConnectionCheck,
        detectConnection,
        restApiStatus,
        isConnected,
        isRestApiConnected,
        connectionStatus,
        connectionInfo,
    };
}
