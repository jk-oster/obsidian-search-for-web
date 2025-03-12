import {store} from "./store.js";
import {Status, SearchModes, pageOptions, inputSelector} from "./config.js";
import type {NoteMatch} from "./types.js";
import {ref, computed} from 'vue';
import {useDebounceFn, watchImmediate} from "@vueuse/core";
import {getNoteService} from "./background-services/NoteService.js";
import {getBadgeService} from "./background-services/BadgeService.js";
import {useObsidianConnection} from "./connection";
import { proxyToPlainObject } from "./firefox-util.js";

const noteService = getNoteService();
const badgeService = getBadgeService();

export function useSearch(isLoadingInitial: boolean = false) {
    const config = store;

    const {connectionStatus, connectionInfo, restApiStatus, isConnected, isRestApiConnected} = useObsidianConnection();

    const searchUrls = computed(() => config.searchUrls.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0));

    const searchSrc = ref<string>('');
    const searchString = ref<string>('');
    const searchResults = ref<NoteMatch[]>([]);
    const initialized = ref<boolean>(false);
    const isLoading = ref<boolean>(isLoadingInitial);
    const searchMode = ref<string>('');
    const searchInputElement = ref<Element | null>(null);
    const displayNotesNumber = ref<number>(store.noteNumber);
    const paginatedResults = computed(() => searchResults.value?.slice(0, displayNotesNumber.value));
    const totalMatches = computed(() => searchResults.value.length ?? 0);

    const debouncedFetchNotes = useDebounceFn(async () => await fetchNotes(searchString.value));

    const detectSearchMode = () => {
        const currentUrl = window.location.href;
        if (
            pageOptions.some(page => page.regex?.test(currentUrl)) ||
            searchUrls.value.some((url: string) => currentUrl.includes(url)) || 
            searchUrls.value.some(url => (new RegExp(url)).test(currentUrl))
        ) {
            searchMode.value = SearchModes.search;
        } else {
            searchMode.value = SearchModes.urlMatch;
        }
        return searchMode.value;
    }

    const detectInputElement = () => {
        const input = document.querySelector(inputSelector);
        if (input && input !== searchInputElement.value) {
            searchInputElement.value = input;

            if(store.liveSearch) {
                input.addEventListener('keyup', (event) => {
                    // @ts-ignore
                    if (!event?.ctrlKey && !event?.metaKey && !event?.altKey) {
                        // console.log('Input event', event);
                        searchSrc.value = 'search input field';
                        searchString.value = (input as HTMLInputElement).value;
                        debouncedFetchNotes().then();
                    }
                });
            }

        }
        return searchInputElement.value;
    }

    const detectSearchString = async () => {
        if (detectSearchMode() === SearchModes.search) {
            await detectInputSearchString();

            if (searchResults.value.length === 0 && store.useLiveSearchFallback) {
                await detectUrlSearchString();
            }
        } else {
            await detectUrlSearchString();
        }
    }

    const detectUrlSearchString = async () => {
        searchSrc.value = 'page url';
        searchString.value = window.location.href;
        await fetchNotes(searchString.value);

        const clearSearchStringRegex = /[\|•‣⁃○—-:]|(::)/g;

        if (store.useUrlMatchFallback && searchResults.value.length === 0) {
            searchSrc.value = 'document title';
            searchString.value = document.title.trim().replaceAll(clearSearchStringRegex, ' ') ?? '';
            await fetchNotes(searchString.value);
        }

        if (store.useUrlMatchHeadingFallback && searchResults.value.length === 0) {
            searchSrc.value = 'document heading';
            searchString.value = document.querySelector('h1')?.textContent?.trim().replaceAll(clearSearchStringRegex, ' ') ?? '';
            await fetchNotes(searchString.value);
        }
    }

    const detectInputSearchString = async () => {
        const searchInput = detectInputElement() as HTMLInputElement|null;
        let params = new URLSearchParams(window.location.href.split('?')[1] ?? '');
        const urlParam = params.get('q') ?? params.get('query') ?? params.get('search');
        searchString.value = urlParam ?? searchInput?.value ?? '';
        searchSrc.value = urlParam ? 'url query parameter' : 'search input field';
        await fetchNotes(searchString.value);
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
                notes = await noteService.fetchLocalRest(query, proxyToPlainObject(config));
            } else if (store.provider === 'omni-search') {
                notes = await noteService.fetchOmniSearch(query, proxyToPlainObject(config));
            }

            if (store.excludes && store.excludes.split(',')[0] != '') {
                notes = notes?.filter((note: NoteMatch) => {
                    return store.excludes.split(',').every((exclude: string) => !note.filename.includes(exclude) && (new RegExp(exclude)).test(note.filename) === false);
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
        searchSrc: searchSrc,
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
