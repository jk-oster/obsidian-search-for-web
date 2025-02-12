import {getBadgeService} from "./background-services/BadgeService.js";
import {getConnectionService} from "./background-services/ConnectionService.js";
import {useStore} from "./store.js";
import {Status} from "./config.js";
import {onMounted, ref} from "vue";
import {useThrottleFn} from "@vueuse/core";

const badgeService = getBadgeService();
const connectionService = getConnectionService();
const connectionStatus = ref<string>('');
const connectionInfo = ref<string>('🔄️ Checking your local Obsidian connection');
const restApiStatus = ref<string>('');

export function useObsidianConnection(delay: number = 0) {
    const store = useStore();

    const detectConnection = async () => {
        connectionInfo.value = store.provider === 'omni-search' ? '🔄️ Checking your Obsidian Omnisearch connection' : '🔄️ Checking your Obsidian REST API connection';
        const url = store.protocol + (store.provider === 'omni-search' ? 'localhost' : '127.0.0.1') + ':' + (store.provider === 'omni-search' ? store.port : store.restApiPort);

        const {status, statusText, text, provider} = await connectionService.checkApiStatus(url, store.apiKey, store.provider);

        if (status !== connectionStatus.value) {
            badgeService.setBadgeStatus(status).then();
            badgeService.setBadgeText(text).then();
        }

        if(provider === store.provider) {
            connectionStatus.value = status ?? Status.unknown;
            connectionInfo.value = statusText;
        }
    }

    const detectRestApiConnection = async () => {
        const url = store.restApiProtocol + '127.0.0.1:' + store.restApiPort;
        const {status, statusText} = await connectionService.checkApiStatus(url, store.apiKey, 'local-rest');
        restApiStatus.value = status ?? Status.unknown;
        connectionInfo.value = statusText;
    }

    const throttledRestApiConnectionCheck = useThrottleFn(async () => {
        detectRestApiConnection().then();
    }, 100);

    const throttledConnectionCheck = useThrottleFn(async () => {
        detectConnection().then();
    }, 100);

    onMounted(() => {
        setTimeout(async () => {
            await throttledRestApiConnectionCheck().then();
            await throttledConnectionCheck().then();
        }, delay);
    });

    return {
        throttledConnectionCheck,
        throttledRestApiConnectionCheck,
        detectConnection,
        restApiStatus,
        connectionStatus,
        connectionInfo,
    }
}