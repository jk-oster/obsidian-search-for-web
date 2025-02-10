import {getBadgeService} from "./background-services/BadgeService";
import {useStore} from "./store";
import {Status} from "./config.js";
import {onMounted, ref} from "vue";
import {useThrottleFn} from "@vueuse/core";

const badgeService = getBadgeService();
const connectionStatus = ref<string>('');
const connectionInfo = ref<string>('🔄️ Checking your local Obsidian connection');

export function useObsidianConnection(delay: number = 0) {
    const store = useStore();

    const detectConnection = async () => {
        connectionInfo.value = store.provider === 'omni-search' ? '🔄️ Checking your Obsidian Omnisearch connection' : '🔄️ Checking your Obsidian REST API connection';
        const url = store.protocol + store.obsidianRestUrl + ':' + store.port;

        const {status, statusText, provider} = await badgeService.checkApiStatus(url, store.apiKey, store.provider);

        if(provider === store.provider) {
            connectionStatus.value = status ?? Status.unknown;
            connectionInfo.value = statusText;
        }
    }

    const throttledConnectionCheck = useThrottleFn(async () => {
        detectConnection().then();
    }, 100);

    onMounted(() => {
        if(delay > 0) {
            setTimeout(throttledConnectionCheck, delay);
        } else {
            throttledConnectionCheck().then();
        }
    });

    return {
        throttledConnectionCheck,
        detectConnection,
        connectionStatus,
        connectionInfo,
    }
}