import {defineProxyService} from '@webext-core/proxy-service';
import type {SearchProvider, State} from "../types.js";
import {Status} from "../config.js";

class ConnectionService {
    async  checkApiStatus(url: string, apiKey: string | null, provider: SearchProvider) {
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

        return {
            status, statusText, text, provider
        };
    }
}

export const [registerConnectionService, getConnectionService] = defineProxyService(
    'ConnectionService',
    () => new ConnectionService(),
);