import {getFromExtStorage, store} from "./store.js";
import {Status, SearchModes} from "./config.js";
import {NoteMatch} from "./types.js";
import {ref, computed, watch} from 'vue';
import {useDebounceFn} from "@vueuse/core";
import {getNoteService} from "./background-services/NoteService.js";
import {getBadgeService} from "./background-services/BadgeService.js";

const noteService = getNoteService();
const badgeService = getBadgeService();

export function useSearch(isLoadingInitial: boolean = false) {

    const config = store;
    const searchUrls = computed(() => config.searchUrls.split(',').map((url: string) => url.trim()));

    const searchString = ref<string>('');
    const searchResults = ref<NoteMatch[]>([]);
    const isLoading = ref<boolean>(isLoadingInitial);
    const searchMode = ref<string>('');
    const searchInputElement = ref<Element | null>(null);
    const connectionStatus = ref<string>('');
    const displayNotesNumber = ref<number>(store.noteNumber);
    const paginatedResults = computed(() => searchResults.value?.slice(0, displayNotesNumber.value));
    const totalMatches = computed(() => searchResults.value.length ?? 0);

    const debouncedFetchNotes = useDebounceFn(() => {
        fetchNotes(searchString.value);
    });

    const detectConnection = async () => {
        const url = store.protocol + store.obsidianRestUrl + ':' + store.port;
        const {status} = await badgeService.checkApiStatus(url, store.apiKey, store.provider);
        connectionStatus.value = status ?? Status.unknown;
        return connectionStatus.value;
    }

    const detectSearchMode = () => {
        if (searchUrls.value.length === 0) {
            searchMode.value = SearchModes.urlMatch;
            return;
        }

        const currentUrl = window.location.href;
        if (searchUrls.value.some((url: string) => currentUrl.includes(url))) {
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

            input.addEventListener('keyup', (event) => {
                // @ts-ignore
                if (!event?.ctrlKey) {
                    searchString.value = (input as HTMLInputElement).value;
                    debouncedFetchNotes();
                }
            });
        }
        return searchInputElement.value;
    }

    const detectSearchString = () => {
        if (detectSearchMode() === SearchModes.urlMatch) {
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

        console.log('query: ', query);

        if (!query || query.length < store.minChars) {
            searchResults.value = [];
            isLoading.value = false;
            return;
        }

        try {

            let notes: NoteMatch[] = [];
            if (store.provider === 'local-rest') {
                notes = await noteService.fetchLocalRest(query, config);
            } else if (store.provider === 'omni-search') {
                notes = await noteService.fetchOmniSearch(query, config);
            }

            if (store.excludes && store.excludes.split(',')[0] != '') {
                notes = notes?.filter((note: NoteMatch) => {
                    return store.excludes.split(',').every((exclude: string) => !note.filename.includes(exclude))
                }) ?? [];
            }

            badgeService.setBadgeStatus(Status.search).then();
            badgeService.setBadgeText(notes ? notes?.length.toString() : '0').then();

            searchResults.value = notes;
        } catch (error) {
            console.log(error);

            badgeService.setBadgeStatus(Status.offline).then();
            badgeService.setBadgeText('off').then();

            searchResults.value = [];
        } finally {
            isLoading.value = false;
        }

        console.log(searchResults.value);
    }

    const initSearch = async () => {
        if (await detectConnection() === Status.search) {
            detectSearchString();
            addEventListener('hashchange', detectSearchString);
            addEventListener('popstate', detectSearchString);
        } else {
            setTimeout(initSearch, 100);
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
        totalMatches: totalMatches,
        fetchNotes,
        detectSearchString,
        initSearch,
        detectConnection,
        displayNotesNumber
    }
}
