import {getBadgeService} from "./background-services/BadgeService";
import {useStore} from "./store.js";
import {Status} from "./config.js";
import {onMounted, ref} from "vue";
import {useThrottleFn} from "@vueuse/core";
import type {SearchProvider, State} from "./types.js";

const badgeService = getBadgeService();
const connectionStatus = ref<string>('');
const connectionInfo = ref<string>('🔄️ Checking your local Obsidian connection');

export function useObsidianConnection(delay: number = 0) {
    const store = useStore();

    async function checkApiStatus(url: string, apiKey: string | null, provider: SearchProvider) {
        const options = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + apiKey
            },
        };

        let statusText = '';
        let status: State;
        let text = ' ';

        try {
            if (provider === 'omni-search') {
                const resp = await fetch(url + "/search");
                if (resp.ok) {
                    statusText = "✅ Successfully connected to Obsidian OmniSearch";
                    status = Status.search;
                } else {
                    statusText = '❗ Could not reach Obsidian OmniSearch - Make sure Obsidian is running and check your Protocol / Port settings!';
                    status = Status.error
                }
            } else if (provider === 'local-rest') {
                const resp = await fetch(url + "/", options);
                const data = await resp.json();
                if (resp.ok && data.status == 'OK' && data.authenticated) {
                    statusText = "✅ Successfully connected to Obsidian REST API";
                    status = Status.search;
                } else {
                    statusText = '🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings';
                    text = '🔑';
                    status = Status.noauth;
                }
            } else {
                statusText = '💡 Select a Search Provider';
                status = Status.error;
                text = '❓';
            }
        } catch (e: any) {

            text = ' ';
            status = Status.offline;

            if (provider === 'omni-search') {
                statusText = '❗ Could not reach Obsidian OmniSearch - Make sure Obsidian Omnisearch HTTP Server is running and check your Protocol / Port settings!';
            } else if (provider === 'local-rest') {
                statusText = '❗ Could not reach Obsidian REST API - Make sure Obsidian REST API is running and check your Protocol / Port settings!';
            } else {
                statusText = '💡 Select a Search Provider';
                status = Status.error;
                text = '❓';
            }
        }

        if (status !== connectionStatus.value) {
            badgeService.setBadgeStatus(status).then();
            badgeService.setBadgeText(text).then();
        }

        return {
            status, statusText, text, provider
        };
    }

    const detectConnection = async () => {
        connectionInfo.value = store.provider === 'omni-search' ? '🔄️ Checking your Obsidian Omnisearch connection' : '🔄️ Checking your Obsidian REST API connection';
        const url = store.protocol + store.obsidianRestUrl + ':' + store.port;

        const {status, statusText, provider} = await checkApiStatus(url, store.apiKey, store.provider);

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