<template>
  <button v-if="store.provider === 'local-rest'"
          title="Open Note Preview"
          class="absolute top-2 right-2 text-gray-700 dark:text-gray-400"
          @click.prevent.stop="openNotePreview()">
      <span class="sr-only">
        Show Note Preview
      </span>
    <OpenEye class="h-5 w-5"></OpenEye>
  </button>

  <div ref="popover" popover
       class="mt-4 py-7 px-6 min-h-48 max-w-lg lg:max-w-xl max-h-[95vh] overflow-y-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

    <div class="absolute flex top-2 right-2">
      <a :href="'obsidian://open?vault=' + encodeURIComponent(vaultName ?? '') + '&file=' + encodeURIComponent(name ?? '')"
         class="p-1 mb-2 mr-2 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <span class="sr-only">
            Open Note in Obsidian
          </span>
        <OpenLink class="h-6 w-6"></OpenLink>
      </a>

      <button @click="closeNotePreview()" title="Close Preview"
              class=" p-1 mb-2 text-xs font-medium text-gray-900 focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <span class="sr-only">
            Close Preview
          </span>
        <Close class="h-6 w-6"></Close>
      </button>
    </div>

    <div class="pt-2 text-xl font-black text-gray-700 dark:text-gray-300">{{ name }}</div>
    <div class="w-full flex justify-center">
      <LoadingSpinner v-if="isLoading && !previewNote"></LoadingSpinner>
    </div>
    <!-- @vue-ignore -->
    <div class="prose  dark:prose-invert" v-html="highlight(marked.parse(previewNote ?? ''), searchString)"></div>
  </div>
</template>

<script setup lang="ts">

import {store} from "../store.js";
import {marked} from "marked";
import OpenLink from "./OpenLink.vue";
import OpenEye from "./OpenEye.vue";
import Close from "./Close.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import {ref} from "vue";
import {usePreview} from "../preview.js";
import {useHighlight} from "../highlighter.js";

const props = defineProps({
  filename: String,
  searchString: String,
  vaultName: String,
  name: String,
  highlighting: {
    type: Boolean,
    default: false,
  },
});

// @ts-ignore
const popover = ref<HTMLElement|null>(null);

const {previewNote, fetchPreview, isLoading} = usePreview();

const {highlight} = useHighlight();

function openNotePreview() {
  fetchPreview(props.filename ?? '');
  popover.value?.showPopover();
}

function closeNotePreview() {
  popover.value?.hidePopover();
}
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