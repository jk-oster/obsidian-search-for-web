<template>
  <div
      ref="element"
      style="min-width: min(100vw, 333px);"
      class="p-3 relative mt-1 max-w-xs lg:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a
        :href="'obsidian://open?vault=' + encodeURIComponent(vaultName ?? '') + '&file=' + encodeURIComponent(basename ? basename + '.md' : '')">
      <p class="text-xs tracking-tight text-gray-700 dark:text-gray-300" v-html="highlight(path ?? '', searchString)"></p>
      <h5 class="my-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
        <span v-html="highlight(basename ?? '', searchString)"></span>
        <span class="font-light text-xs text-gray-700 dark:text-gray-300"> ({{
            matchesCount ?? 0
          }} matches)</span>
      </h5>
    </a>
    <div class="text-xs font-normal text-gray-700 dark:text-gray-400">
      <p class="mt-1 break-words obsidian-search-highlight-area" v-html="highlight(excerpt ?? '', searchString)">
      </p>
    </div>

    <NotePreview :vaultName="vaultName" :name="basename" :filename="filename" :searchString="searchString"></NotePreview>
  </div>

</template>

<script setup lang="ts">
import NotePreview from "./NotePreview.vue";
import {useHighlight} from "../highlighter";

const props = defineProps({
  filename: String,
  basename: String,
  path: String,
  excerpt: String,
  matchesCount: Number,
  searchString: {
    type: String,
    default: '',
  },
  showMatchesCount: Number,
  vaultName: String,
  highlighting: Boolean,
});

const {highlight} = useHighlight();

</script>

<style scoped>
@import "../style/main.css";
</style>

<style>

.obsidian-search-highlight-area {
  .bg-yellow {
    --tw-bg-opacity: .8;
    background-color: rgb(255 255 51 / var(--tw-bg-opacity))
  }

  .text-black {
    --tw-text-opacity: .8;
    color: rgb(0 0 0 / var(--tw-text-opacity))
  }

  :is(.dark .dark\:bg-yellow) {
    --tw-bg-opacity: .8;
    background-color: rgb(255 255 51 / var(--tw-bg-opacity))
  }
}
</style>
