import {store} from "./store.js";
import {ref} from 'vue';
import {getNoteService} from "./background-services/NoteService.js";

const noteService = getNoteService();

export function usePreview() {

    const config = store;

    const previewNote = ref<string | null>(null);
    const activeNote = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    const fetchPreview = async (fileName: string) => {
        if (store.provider === 'local-rest') {
            isLoading.value = true;
            try {
                previewNote.value = await noteService.fetchNote(fileName, config);
            } catch (e) {
                previewNote.value = 'Oouups! An Error occurred when trying to fetch the note preview :/'
            }
            isLoading.value = false;
        }
    }

    const fetchActive = async () => {
        if (store.provider === 'local-rest') {
            isLoading.value = true;
            try {
                activeNote.value = await noteService.fetchActiveNote(config);
            } catch (e) {
                activeNote.value = 'Oouups! An Error occurred when trying to fetch the active note :/'
            }
            isLoading.value = false;
        }
    }

    return {
        previewNote,
        activeNote,
        isLoading,
        fetchPreview,
        fetchActive,
    }
}