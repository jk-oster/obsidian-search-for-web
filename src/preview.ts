import {store} from "./store.js";
import {ref} from 'vue';
import {getNoteService} from "./background-services/NoteService.js";
import {useObsidianConnection} from "./connection";
import { Period } from "./types.js";

const noteService = getNoteService();

export function usePreview() {

    const {restApiStatus} = useObsidianConnection();

    const config = store;

    const previewNote = ref<string | null>(null);
    const activeNote = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    const fetchPeriodic = async (period: Period = store.period) => {
        if (restApiStatus.value === 'search') {
            isLoading.value = true;
            try {
                const noteContent = await noteService.fetchPeriodic(config, period);

                try {
                    const json = JSON.parse(noteContent);
                    // Periodic note does not exist for the specified period
                    if (json?.errorCode === 40461) {
                        previewNote.value = 'No note found for the specified period. Creating one now...';
                        savePeriodicNote('', period);
                        isLoading.value = false;
                        return;
                    }
                } catch (e) {
                    // ignore
                }

                if (noteContent !== previewNote.value) {
                    previewNote.value = noteContent;
                }
            } catch (e) {
                previewNote.value = '### Oouups! An Error occurred when trying to fetch the active note :/ \n\n > Try refreshing the page or check your extension settings.'
            }
            isLoading.value = false;
        }
    }

    const fetchPreview = async (fileName: string) => {
        if (restApiStatus.value === 'search') {
            isLoading.value = true;
            try {
                const noteContent = await noteService.fetchNote(fileName, config);
                if (noteContent !== previewNote.value) {
                    previewNote.value = noteContent;
                }
            } catch (e) {
                previewNote.value = '### Oouups! An Error occurred when trying to fetch the note preview :/ \n\n > Try refreshing the page or check your extension settings.'
            }
            isLoading.value = false;
        }
    }

    const fetchActive = async () => {
        if (restApiStatus.value === 'search') {
            isLoading.value = true;
            try {
                activeNote.value = await noteService.fetchActiveNote(config);
            } catch (e) {
                activeNote.value = '### Oouups! An Error occurred when trying to fetch the active note :/ \n\n > Try refreshing the page or check your extension settings.'
            }
            isLoading.value = false;

        }
    }

    const saveNote = async (fileName: string, content: string) => {
        await noteService.writeNote(fileName, content, config);
        previewNote.value = content;
    }

    const savePeriodicNote = async (content: string, period: Period =  store.period) => {
        await noteService.writePeriodicNote(content, config, period);
        previewNote.value = content;
    }

    const appendNote = async (fileName: string, content: string) => {
        await noteService.appendNote(fileName, content, config);
        previewNote.value += '\n' + content;
    }

    const appendPeriodicNote = async (content: string, period: Period =  store.period) => {
        await noteService.appendPeriodicNote(content, config, period);
        previewNote.value += '\n' + content;
    }

    return {
        previewNote,
        activeNote,
        isLoading,
        fetchPeriodic,
        fetchPreview,
        fetchActive,
        saveNote,
        appendNote,
        savePeriodicNote,
        appendPeriodicNote
    }
}