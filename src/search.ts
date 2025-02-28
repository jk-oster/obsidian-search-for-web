import {store} from "./store.js";
import {Status, SearchModes, pageOptions} from "./config.js";
import type {NoteMatch} from "./types.js";
import {ref, computed} from 'vue';
import {useDebounceFn, watchImmediate} from "@vueuse/core";
import {getNoteService} from "./background-services/NoteService.js";
import {getBadgeService} from "./background-services/BadgeService.js";
import {useObsidianConnection} from "./connection";

const noteService = getNoteService();
const badgeService = getBadgeService();

export function useSearch(isLoadingInitial: boolean = false) {
    const config = store;

    const {connectionStatus, connectionInfo, restApiStatus, isConnected, isRestApiConnected} = useObsidianConnection();

    const searchUrls = computed(() => config.searchUrls.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0));

    const searchString = ref<string>('');
    const searchResults = ref<NoteMatch[]>([]);
    const initialized = ref<boolean>(false);
    const isLoading = ref<boolean>(isLoadingInitial);
    const searchMode = ref<string>('');
    const searchInputElement = ref<Element | null>(null);
    const displayNotesNumber = ref<number>(store.noteNumber);
    const paginatedResults = computed(() => searchResults.value?.slice(0, displayNotesNumber.value));
    const totalMatches = computed(() => searchResults.value.length ?? 0);

    const debouncedFetchNotes = useDebounceFn(() => {
        fetchNotes(searchString.value).then();
    });

    const detectSearchMode = () => {
        const currentUrl = window.location.href;
        if (searchUrls.value.some((url: string) => currentUrl.includes(url)) || pageOptions.some(page => page.regex?.test(currentUrl))) {
            searchMode.value = SearchModes.search;
        } else {
            searchMode.value = SearchModes.urlMatch;
        }
        return searchMode.value;
    }

    const detectInputElement = () => {
        const input = document.querySelector("input[placeholder='Search the web'],input[aria-label=Suche], input[aria-label=Search], input[name=q], input[data-testid='search-input'], input[type=search], input.s_ipt, input[name=wd], textarea[name=q], textarea[type=search], textarea[aria-label=Suche], textarea[aria-label=Search], textarea.mini-suggest__input, input.mini-suggest__input");
        if (input && input !== searchInputElement.value) {
            searchInputElement.value = input;

            if(store.liveSearch) {
                input.addEventListener('keyup', (event) => {
                    // @ts-ignore
                    if (!event?.ctrlKey) {
                        searchString.value = (input as HTMLInputElement).value;
                        debouncedFetchNotes().then();
                    }
                });
            }

        }
        return searchInputElement.value;
    }

    const detectSearchString = () => {
        if (detectSearchMode() === SearchModes.urlMatch) {
            searchString.value = window.location.href;
            debouncedFetchNotes().then();
            return;
        }

        const searchInput = detectInputElement() as HTMLInputElement|null;
        let params = new URLSearchParams(window.location.href.split('?')[1] ?? '');
        searchString.value = params.get('q') ?? params.get('query') ?? params.get('search') ?? searchInput?.value ?? '';
        debouncedFetchNotes().then();

        // console.log(searchString.value);
    }

    const fetchNotes = async (query: string) => {
        isLoading.value = true;

        if (!query || query.length < store.minChars) {
            searchResults.value = [];
            isLoading.value = false;
            badgeService.setBadgeText(' ').then();
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
            console.warn(error);

            badgeService.setBadgeStatus(Status.offline).then();
            badgeService.setBadgeText('off').then();

            searchResults.value = [];
        } finally {
            isLoading.value = false;
        }
    }

    watchImmediate(isConnected, () => {
        // console.log('Is connected');
        if(!initialized.value && isConnected.value) {
            // console.log('Search initialized');
            addEventListener('hashchange', detectSearchString);
            addEventListener('popstate', detectSearchString);
            detectSearchString();
            initialized.value = true;
        }
    });

    return {
        searchString: searchString,
        searchResults: searchResults,
        paginatedResults: paginatedResults,
        searchMode: searchMode,
        searchInputElement: searchInputElement,
        isLoading: isLoading,
        totalMatches: totalMatches,
        fetchNotes,
        detectSearchString,
        debouncedFetchNotes,
        displayNotesNumber,
        isConnected,
        connectionInfo,
        connectionStatus,
        isRestApiConnected,
        restApiStatus,
    }
}
