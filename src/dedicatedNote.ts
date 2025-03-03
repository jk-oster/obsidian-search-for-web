import { ref, onMounted, onUnmounted } from 'vue';
import { store, storeInitialized } from './store.js';
import { useDebounceFn } from '@vueuse/core';
import { getNoteService } from './background-services/NoteService.js';
import { Note } from './types.js';
import { useObsidianConnection } from './connection.js';
import { proxyToPlainObject } from './firefox-util.js';

const noteService = getNoteService();

export function useDedicatedNote() {

    const {restApiStatus, isRestApiConnected} = useObsidianConnection();

    const dedicatedNote = ref<Note|null>(null);
    const config = store;
    const searchString = ref<string>('');
    const error = ref<string>('');
    const searchResults = ref<any[]>([]);
    const isLoading = ref<boolean>(true);
    const cache = new Map<string, { note: Note|null, searchResults: any[]}>();

    const searchForDedicatedNotes = async (query: string): Promise<Note|null> => {
        isLoading.value = true;
        error.value = '';

        if (query.length <= 0) {
            searchResults.value = [];
            isLoading.value = false;
            return null;
        }

        const jsonQuery = {
            or: [
                {
                "===": [
                        {
                            var: "frontmatter.url"
                        },
                        query
                    ]
                },
                {
                "===": [
                        {
                            var: "frontmatter.link"
                        },
                        query
                    ]
                },
                {
                glob: [
                        {
                            var: "frontmatter.url-glob"
                        },
                        query
                    ]
                },
                {
                glob: [
                        {
                            var: "frontmatter.url"
                        },
                        query
                    ]
                },
                {
                glob: [
                        {
                            var: "frontmatter.link"
                        },
                        query
                    ]
                },
                {
                glob: [
                        {
                            var: "frontmatter.url-alias"
                        },
                        query
                    ]
                },
                {
                glob: [
                        {
                            var: "frontmatter.link-alias"
                        },
                        query
                    ]
                }
            ]
        };

        let note: Note|null = null;
        const data = cache.get(query) ?? null;
        if (data?.note) {
            dedicatedNote.value = data.note;
            searchResults.value = data.searchResults;
            isLoading.value = false;
            return data?.note;
        }

        try {
            const dedicatedNotes = await noteService.fetchJsonQuery(jsonQuery, proxyToPlainObject(config));
            searchResults.value = dedicatedNotes;

            // console.log(dedicatedNotes);

            if (dedicatedNotes?.length === 0) {
                dedicatedNote.value = null;

                const mentionedNotes = await noteService.fetchLocalRest(query, proxyToPlainObject(config));

                if (mentionedNotes?.length > 0) {
                    searchResults.value = mentionedNotes;
                } else {
                    searchResults.value = [];
                }
            } else {
                const fileName = searchResults.value[0].filename;
                // @ts-ignore
                const noteResp = await noteService.fetchNote(fileName, proxyToPlainObject(config), 'application/vnd.olrapi.note+json');
                note = JSON.parse(noteResp);

                // console.log(note);

                if(note && note.frontmatter) {
                    cache.set(query, { note: note, searchResults: searchResults.value });
                    dedicatedNote.value = note as Note;
                }
            }

        } catch (err: any) {
            console.warn(err);

            error.value = err.message ?? 'An error occurred while searching for the note.';
            dedicatedNote.value = null;
            searchResults.value = [];
        } finally {
            isLoading.value = false;
        }

        return note;
    }

    const debouncedFetchDedicatedNotes = useDebounceFn(() => {
        searchForDedicatedNotes(searchString.value).then();
    });

    return { 
        searchString, 
        dedicatedNote,
        searchResults,
        restApiStatus,
        isRestApiConnected,
        debouncedFetchDedicatedNotes,
        searchForDedicatedNotes,
    };
}
