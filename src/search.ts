import { getFromExtStorage } from "./store.js";
import { Actions, Status, SearchModes } from "./config.js";
import { LocalRestNoteMatch, NoteMatch, OmniSearchNoteMatch } from "./types";
import { sendToRuntime } from "./service.js";
import { ref, readonly, computed } from 'vue';
import {checkApiKey} from './util.js';
import { useDebounce, useDebounceFn } from "@vueuse/core";

export async function useSearch() {
    const searchUrls = (await getFromExtStorage('searchUrls')).split(',').map((url: string) => url.trim());
    const apiKey = await getFromExtStorage('apiKey');
    const protocol = await getFromExtStorage('protocol');
    const port = await getFromExtStorage('port');
    const obsidianRestUrl = await getFromExtStorage('obsidianRestUrl');
    const contextLength = await getFromExtStorage('contextLength');
    const matchCount = await getFromExtStorage('matchCount');
    const provider = await getFromExtStorage('provider');
    const excludes = await getFromExtStorage('excludes');
    const noteNumber = await getFromExtStorage('noteNumber');
    const vault = await getFromExtStorage('vault');
    
    const minChars = ref<number>(await getFromExtStorage('minChars'));
    const searchString = ref<string>('');
    const searchResults = ref<NoteMatch[]>([]);
    const isLoading = ref<boolean>(false);
    const searchMode = ref<string>('');
    const searchInputElement = ref<Element | null>(null);
    const connectionStatus = ref<string>('');
    const displayNotesNumber = ref<number>(noteNumber);
    const paginatedResults = computed(() => searchResults.value?.slice(0, displayNotesNumber.value));
    
    const debouncedFetchNotes = useDebounceFn(() => {
        fetchNotes(searchString.value);
    });

    const detectConnection = async() => {
        
        const url = protocol + obsidianRestUrl + ':' + port;
        const {status} = await checkApiKey(url, apiKey, provider);
        connectionStatus.value = status ?? Status.unknown;

        return connectionStatus.value;
    }

    const detectSearchMode = () => {
        if(searchUrls.length === 0) {
            searchMode.value = SearchModes.urlMatch;
            return;
        }

        const currentUrl = window.location.href;
        if(searchUrls.some((url: string) => currentUrl.includes(url))) {
            searchMode.value = SearchModes.search;
        } else {
            searchMode.value = SearchModes.urlMatch;
        }

        return searchMode.value;
    }

    const detectInputElement = () => {
        const input = document.querySelector("input[aria-label=Suche], input[aria-label=Search], input[name=q], input[data-testid='search-input'], input[type=search], textarea[name=q], textarea[type=search], textarea[aria-label=Suche], textarea[aria-label=Search]");
        if (input && input !== searchInputElement.value) {
            searchInputElement.value = input;

            input.addEventListener('keyup', () => {
                searchString.value = (input as HTMLInputElement).value;
                debouncedFetchNotes();
            });
        }
        return searchInputElement.value;
    }

    const detectSearchString = () => {
        if(detectSearchMode() === SearchModes.urlMatch) {
            searchString.value = window.location.href;
            debouncedFetchNotes();
            return;
        }

        let params = new URLSearchParams(window.location.href.split('?')[1] ?? '');
        searchString.value = params.get('q') ?? params.get('query') ?? params.get('search') ?? '';
        debouncedFetchNotes();
        detectInputElement();
    }

    const fetchNotes = async (query: string) => {
        isLoading.value = true;

        // console.log('query: ', query);

        if (!query || query.length < minChars.value) {
            searchResults.value = [];
            isLoading.value = false;
            return;
        }

        try {

            let data = [];
            if (provider === 'local-rest') {
                data = await fetchLocalRest(query);
                // console.log('data', data);
                const match = query?.toLowerCase();
                data?.sort((a: any, b: any) => {
                    const aIndexMatch = a.filename.toLowerCase().indexOf(match);
                    const bIndexMatch = b.filename.toLowerCase().indexOf(match);
                    if (aIndexMatch > bIndexMatch) return -1;
                    if (aIndexMatch < bIndexMatch) return 1;
                    return 0;
                });
                data = data.map(mapLocalRestToNoteMatch);
            } else if (provider === 'omni-search') {
                data = await fetchOmniSearch(query);
                // console.log('data', data);
                data = data.map(mapOmniSearchToNoteMatch);
            }

            // console.log('data', data);
    
            if (excludes && excludes.split(',')[0] != '') {
                data = data?.filter((note: NoteMatch) => {
                    return excludes.split(',').every((exclude: string) => !note.filename.includes(exclude))
                }) ?? [];
            }
    
            sendToRuntime({action: Actions.badge, data: {text: data ? data?.length.toString() : '0'}});
    
            searchResults.value = data;
        } catch (error) {
            console.log(error);
            sendToRuntime({action: Actions.badge, data: {text: 'off', status: Status.offline}});
            
            searchResults.value = [];
        }
        isLoading.value = false;
    }

    const fetchLocalRest = async(query: string) => {
        const options = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + apiKey,
            }
        };

        const url = protocol + obsidianRestUrl + ':' + port + "/search/simple/?query=" + query + "&contextLength=" + contextLength;

        const resp = await fetch(url, options);
        const data = await resp.json();
        return data
    }

    const fetchOmniSearch = async(query: string) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };

        const url = protocol + obsidianRestUrl + ':' + port + "/search?q=" + query;
        const resp = await fetch(url, options);
        const data = await resp.json();
        return data
    }

    function mapOmniSearchToNoteMatch(data: OmniSearchNoteMatch) {
        return {
            filename: data.path + '/' + data.basename,
            path: data.path,
            basename: data.basename,
            score: data.score,
            matchesCount: data.matches.length,
            excerpt: matchCount == 0 ? '' : data.excerpt.replaceAll(/<br.?\/?>/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(data.basename ?? '')
        }
    }

    function mapLocalRestToNoteMatch(data: LocalRestNoteMatch) {
        const baseName = data.filename?.split('/')[data.filename?.split('/').length - 1] ?? '';
        return {
            filename: data.filename,
            path: data.filename?.replace(baseName,''),
            basename: baseName,
            score: data.score,
            matchesCount: data.matchesCount,
            excerpt: data.matches.map((match: any) => match.context).slice(0, matchCount).join(' ... ').replaceAll(/<br.?\/?>/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(baseName ?? '')
        }
    }

    const initSearch = async() => {
        if(await detectConnection() === Status.search) {
            detectSearchString();
            addEventListener('hashchange', detectSearchString);
            addEventListener('popstate', detectSearchString);
        } else {
            setTimeout(initSearch, 5000);
        }
    }

    return {
        searchString: searchString,
        searchResults: searchResults,
        paginatedResults: paginatedResults,
        searchMode: searchMode,
        searchInputElement: searchInputElement,
        connectionStatus: connectionStatus,
        isLoading: isLoading,
        fetchNotes,
        debouncedFetchNotes,
        detectSearchString,
        initSearch,
        detectConnection,
        displayNotesNumber
    }
}
