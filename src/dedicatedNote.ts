import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from './store.js';
import { useDebounceFn } from '@vueuse/core';
import { getNoteService } from './background-services/NoteService.js';
import { Note } from './types.js';

const noteService = getNoteService();

export function useDedicatedNote() {
    const dedicatedNote = ref<Note|null>(null);
    const config = useStore();
    const searchString = ref<string>('');
    const error = ref<string>('');
    const searchResults = ref<any[]>([]);
    const isLoading = ref<boolean>(true);
    const cache = new Map<string, Note>();

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

        let note: Note|null = cache.get(query) ?? null;
        if (note) {
            dedicatedNote.value = note;
            searchResults.value = [note];
            isLoading.value = false;
            return note;
        }

        try {
            const dedicatedNotes = await noteService.fetchJsonQuery(jsonQuery, config);
            searchResults.value = dedicatedNotes;

            if (dedicatedNotes?.length === 0) {
                dedicatedNote.value = null;
                searchResults.value = [];
            } else {
                const fileName = searchResults.value[0].filename;
                // @ts-ignore
                const noteResp = await noteService.fetchNote(fileName, config, 'application/vnd.olrapi.note+json');
                note = JSON.parse(noteResp);

                console.log(note);

                if(note && note.frontmatter) {
                    cache.set(query, note);
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
        debouncedFetchDedicatedNotes,
        searchForDedicatedNotes,
    };
}
