<template>
  <div ref="popover" popover style="font-size: 16px;"
       class="mt-4 py-7 px-6 min-h-48 max-w-xl lg:max-w-2xl max-h-[95vh] overflow-y-auto bg-white rounded-[.5em] border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

    <div class="absolute flex top-2 right-2">
      <a :href="url"
         title="Open Note in Obsidian"
         class="p-1 mb-2 mr-2 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-[.5em] border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        <OpenLink class="h-6 w-6"></OpenLink>
      </a>

      <button @click="closeNotePreview()" title="Close Preview"
              class=" p-1 mb-2 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-[.5em] border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        <Close class="h-6 w-6"></Close>
      </button>
    </div>

    <div class="pt-2 text-xl font-black text-gray-700 dark:text-gray-300">{{ name }}</div>
    <div class="w-full flex justify-center">
      <LoadingSpinner v-if="isLoading && !previewNote"></LoadingSpinner>
    </div>
    <!-- @vue-ignore -->
    <div class="prose dark:prose-invert" v-html="highlight(marked.parse(previewNote ?? ''), searchString)"></div>
  </div>
</template>

<script setup lang="ts">

import {marked} from "marked";
import OpenLink from "./OpenLink.vue";
import Close from "./Close.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import {ref, watch} from "vue";
import {usePreview} from "../preview.js";
import {useHighlight} from "../highlighter.js";

const props = defineProps({
  filename: String,
  url: String,
  searchString: String,
  vaultName: String,
  name: String,
  highlighting: {
    type: Boolean,
    default: false,
  },
});

const show = defineModel<boolean>();

// @ts-ignore
const popover = ref<HTMLElement|null>(null);

const {previewNote, fetchPreview, isLoading} = usePreview();

const {highlight} = useHighlight();

watch(show,() => {
  if(show.value) {
    openNotePreview();
  } else {
    closeNotePreview();
  }
});

function openNotePreview() {
  fetchPreview(props.filename ?? '');
  popover.value?.showPopover();
}

function closeNotePreview() {
  popover.value?.hidePopover();
}

defineExpose({
  openNotePreview,
  closeNotePreview,
});

</script>

<style scoped>
@import "../style/main.css";
</style>

<style scoped>

[popover] {
  min-width: min(28rem, 100vw);
}

html {
  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-track-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #646464;
  scrollbar-dark-shadow-color: #646464;
}

::-webkit-scrollbar {
  width: 8px;
  height: 3px;
}

::-webkit-scrollbar-button {
  background-color: #666;
}

::-webkit-scrollbar-track {
  background-color: #646464;
}

::-webkit-scrollbar-track-piece {
  background-color: #000;
}

::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #666;
  border-radius: 3px;
}

::-webkit-scrollbar-corner {
  background-color: #646464;
}

::-webkit-resizer {
  background-color: #666;
}

</style>