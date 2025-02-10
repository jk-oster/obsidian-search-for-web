<template>
  <div
      ref="element"
      style="min-width: min(100vw, 333px);"
      class="p-3 relative mt-2 max-w-xs lg:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a class="flex justify-start items-center"
        :href="'obsidian://open?vault=' + encodeURIComponent(vaultName ?? '') + '&file=' + encodeURIComponent(basename ? basename + '.md' : '')">
      <div v-if="showIcon"
            class="rounded-full p-1.5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        <span style="font-size: 16px;">
          <Logo></Logo>
        </span>
      </div>

      <div>
        <p v-if="filename" class="text-xs leading-none tracking-tight text-gray-700 dark:text-gray-300" v-html="highlight(filename ?? '', searchString)"></p>
        <div class="my-1 text-sm leading-none tracking-tight text-gray-900 dark:text-white hover:underline">
          <span class="text-md font-semibold" v-html="highlight(basename ?? '', searchString)"></span>
          <span class="font-light text-xs text-gray-700 dark:text-gray-300"> ({{
              matchesCount ?? 0
            }} matches)</span>
        </div>
      </div>

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
import Logo from "./Logo.vue";

defineProps({
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
  showIcon: {
    type: Boolean,
    default: false,
  },
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
