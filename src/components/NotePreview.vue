<template>
  <div ref="popover" popover style="font-size: 16px;" :class="isFullscreen ? 'fullscreen' : ''"
       class="obsidian-browser-search-popover mt-4 p-4 min-h-48 w-xl max-w-xl lg:max-w-2xl bg-white rounded-[.5em] border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">

    <div class="absolute flex justify-between items-center top-0 right-0 left-0 border-b px-4 py-2 border-gray-200 bg-gray-50 dark:bg-gray-800">

      <div class="text-xs text-gray-700 dark:text-gray-100">{{ name }}</div>

      <div class="inline-flex rounded-md shadow-xs" role="group">
        <button @click="mode = 'preview'; setPreviewMode(); save();" :aria-pressed="mode === 'preview'" type="button" title="Preview" class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:text-purple-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:text-white">
          <OpenEye class="w-4 h-4"></OpenEye>
        </button>
        <button @click="mode = 'edit'; refreshEditor(); setEditorMode(); " :aria-pressed="mode === 'edit'" type="button" title="Edit" class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:text-purple-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:text-white">
          <EditIcon class="w-4 h-4"></EditIcon>
        </button>
        <button @click="mode = 'append'" :aria-pressed="mode === 'append'" type="button" title="Append"                               class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:text-purple-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:text-white">
          <AddCommentIcon class="w-4 h-4"></AddCommentIcon>
        </button>
      </div>

      <div class="inline-flex">
        <a :href="url"
           title="Open Note in Obsidian"
           class="p-1 mr-2 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-[.5em] border border-gray-200 hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <OpenLink class="h-6 w-6"></OpenLink>
        </a>

        <button @click="toggleFullScreen()" title="Toggle Fullscreen"
                class=" p-1 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-[.5em] border border-gray-200 hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <ExitFullscreenIcon v-if="isFullscreen" class="h-6 w-6"></ExitFullscreenIcon>
          <FullscreenIcon v-else class="h-6 w-6"></FullscreenIcon>
        </button>

        <button @click="closeNotePreview()" title="Close Preview"
                class=" p-1 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-[.5em] border border-gray-200 hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <Close class="h-6 w-6"></Close>
        </button>
      </div>

    </div>

    <div class="w-full mt-[1.6em] max-w-[720px] mx-auto">
      <div class="w-full flex justify-center">
        <LoadingSpinner v-if="isLoading && !previewNote"></LoadingSpinner>
      </div>

      <div  v-if="mode === 'append'">
        <form class="w-full mt-3">
            <label for="content" class="sr-only">Content to append</label>
            <textarea v-model="appendContent" id="content" rows="6" style="border: none; outline: none;" class="w-full px-0 text-gray-900 bg-transparent border-0 border-transparent placeholder-gray-400 dark:text-white dark:placeholder-gray-500" placeholder="Type here..." required ></textarea>
            <div class="flex items-center justify-start py-2 border-t dark:border-gray-600 border-gray-200">
              <button @click.prevent="append(true)" type="submit"  class="mr-2 inline-flex items-center py-2.5 px-4 focus:outline-hidden text-white text-xs bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Append & Close
              </button>
              <button @click.prevent="append()" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
                Append
              </button>
            </div>
        </form>
      </div>

      <div v-show="mode === 'edit'" class="text-gray-700 dark:text-gray-100 relative">
        <textarea ref="editor"></textarea>

        <div v-if="unsavedChanges" class="absolute -bottom-1 left-0">
          <button @click.prevent="save(true)" class="inline-flex items-center mr-2 py-2.5 px-4 focus:outline-hidden text-white text-xs bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            Save & Close
          </button>
          <button @click.prevent="save()"  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            Save
          </button>
        </div>

      </div>

      <div class="max-h-[85vh] overflow-y-auto">
        <!-- @vue-ignore -->
        <div v-if="mode === 'preview'" style="max-width: 100%" class="mt-2 prose prose-slate dark:prose-invert obsidian-browser-search-preview-container" v-html="highlight(marked.parse(previewNote ?? ''), searchString)"></div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {marked} from "marked";
import OpenLink from "./icons/OpenLink.vue";
import Close from "./icons/Close.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import {onUnmounted, ref, watch} from "vue";
import {usePreview} from "../preview.js";
import {useHighlight} from "../highlighter.js";
import EasyMDE from "easymde";
import EditIcon from "./icons/EditIcon.vue";
import AddCommentIcon from "./icons/AddCommentIcon.vue";
import OpenEye from "./icons/OpenEye.vue";
import { PreviewOpenMode, PreviewType } from "../types.js";
import FullscreenIcon from "./icons/FullscreenIcon.vue";
import ExitFullscreenIcon from "./icons/ExitFullscreenIcon.vue";

const props = defineProps<{
  filename: string,
  url: string,
  searchString: string,
  name: string,
  mode?: PreviewOpenMode,
  type?: PreviewType,
}>();

const show = defineModel<boolean>();

// @ts-ignore
const popover = ref<HTMLElement|null>(null);
const editor = ref<HTMLElement|null>(null);
const appendContent = ref<string>('');
const mode = ref<PreviewOpenMode>(props.mode ?? 'preview');
const isFullscreen = ref<boolean>(false);
const unsavedChanges = ref<boolean>(false);
let easyMDE: any;
const {
  previewNote, 
  isLoading,
  fetchPreview, 
  fetchPeriodic, 
  saveNote, 
  appendNote,
  savePeriodicNote,
  appendPeriodicNote,
} = usePreview();

const {highlight} = useHighlight();

watch(show,() => {
  if(show.value) {
    openNotePreview();
  } else {
    closeNotePreview();
  }
});

watch(previewNote, () => {
  easyMDE?.value(previewNote.value ?? '');
  refreshEditor();
});

async function openNotePreview(openMode: PreviewOpenMode | null = null) {
  show.value = true;

  if(openMode) {
    mode.value = openMode;
  }

  if(!easyMDE) {
    easyMDE = new EasyMDE({
      element: editor?.value ?? undefined,
      autoDownloadFontAwesome: false,
      autofocus: false,
      toolbar: false,
      // toolbar: ["bold", "italic", "heading", "|", "quote", "code", "unordered-list", "ordered-list", "|", "link", "|", "preview", "guide", "|", "undo", "redo"],
      placeholder: "Type here...",
      lineWrapping: true,
      spellChecker: false,
      maxHeight: '77vh',
      status: ["lines", "words"],
      sideBySideFullscreen: false,
      syncSideBySidePreviewScroll: false,
    });

    setInterval(() => {
      if(previewNote.value != easyMDE?.value()) {
        unsavedChanges.value = true;
      } else {
        unsavedChanges.value = false;
      }
    }, 1000);
  }

  if (props.type === 'periodic') {
    await fetchPeriodic();
  } else {
    await fetchPreview(props.filename ?? '');
  }

  popover.value?.showPopover();
}

onUnmounted(() => {
  easyMDE?.toTextArea();
  easyMDE = null;
});

function toggleViewMode() {
  EasyMDE.togglePreview(easyMDE);
}

function setPreviewMode() {
  if(!easyMDE.isPreviewActive()) {
    toggleViewMode();
  }
}

function setEditorMode() {
  if(easyMDE.isPreviewActive()) {
    toggleViewMode();
  }
}

function closeNotePreview() {
  show.value = false;
  popover.value?.hidePopover();
  // Save note on close
  if(previewNote.value != easyMDE?.value()) {
    save();
    // console.log('autosaved on close');
  }
}

function save(close: boolean = false) {
  if(previewNote.value != easyMDE?.value()) {

    if(props.type === 'periodic') {
      savePeriodicNote(easyMDE.value() ?? '');
    } else {
      saveNote(props.filename ?? '', easyMDE.value() ?? '');
    }

    // console.log('saved note');
  }

  if(close) {
    closeNotePreview();
  }
}

function append(close: boolean = false) {
  if(appendContent.value) {

    if(props.type === 'periodic') {
      appendPeriodicNote(appendContent.value ?? '');
    } else {
      appendNote(props.filename ?? '', appendContent.value ?? '');
    }

    easyMDE.value(previewNote.value ?? '');
    refreshEditor();
    appendContent.value = '';

    // console.log('appended note');
  }

  if(close) {
    closeNotePreview();
  }
}

function refreshEditor() {
  setTimeout(() => {
    easyMDE?.codemirror?.refresh();
  }, 1);
}

function toggleFullScreen() {
  if(!popover.value) return;
  isFullscreen.value = !isFullscreen.value;
}

defineExpose({
  openNotePreview,
  closeNotePreview,
});

</script>

<style>
@import "../../node_modules/easymde/dist/easymde.min.css";

.obsidian-browser-search-preview-container,
.obsidian-browser-search-preview-container > span {
  max-width: 100%;
  width: 100%;
}

.obsidian-browser-search-preview-container:has(> hr:first-child + h2) > hr:first-child,
.obsidian-browser-search-preview-container:has(> hr:first-child + h2) > h2:first-of-type,
.obsidian-browser-search-preview-container > span:has(> hr:first-child + h2) > hr:first-child,
.obsidian-browser-search-preview-container > span:has(> hr:first-child + h2) > h2:first-of-type {
  display: none;
}

.CodeMirror.cm-s-easymde {
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-top-color: rgb(179, 179, 179);
}

.CodeMirror.cm-s-easymde .CodeMirror-line:first-child:has(> span .cm-hr) ~ .CodeMirror-line:has(> span .cm-header-2):has(+ .CodeMirror-line .cm-formatting-header-2.cm-header-2) .cm-header-2,
.CodeMirror.cm-s-easymde .CodeMirror-line:first-child:has(> span .cm-hr) ~ .CodeMirror-line:has(> span .cm-header-2):has(+ .CodeMirror-line .cm-formatting-header-2.cm-header-2) + .CodeMirror-line .cm-formatting-header-2.cm-header-2 {
  font-size: 1em !important;
  font-weight: normal !important;
}

</style>

<style scoped>
@import "../style/main.css";

[popover] {
  min-width: min(28rem, 100vw);
}

[popover].fullscreen {
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
}

[popover] button[aria-pressed='true'] {
  background: rgb(228, 228, 228);
}
.dark [popover] button[aria-pressed='true'] {
  background: #646464;
}

/* Hide scrollbar by default */
::-webkit-scrollbar {
  width: 8px; /* Adjust width as needed */
  height: 4px;
  border-radius: 3px;
  background: transparent;
}

/* Handle (thumb) */
::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
  transition: background 0.3s ease-in-out;
}

* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
* :hover {
  scrollbar-color: #666 transparent;
}

</style>