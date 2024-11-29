<template>
  <div class="flex justify-between" style="font-size: 20px">
    <button @click="openOptionsPage" title="Open Settings"
      class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      <span class="sr-only">
        Settings
      </span>
      <span>
        <Cog class="w-6 h-6"></Cog>
      </span>
    </button>

    <a :href="'obsidian://search?query=' + encodeURIComponent(store.searchString) + '&vault=' + encodeURIComponent(store.vault)" v-if="mode != SearchModes.urlMatch" @click="searchInObsidianGui"
            class="no-underline focus:outline-none text-white text-sm bg-purple-700 hover: focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-3 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
      Open Search in Obsidian
    </a>

    <button @click="toggleSidebar" title="Hide"
      class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      <span class="sr-only">
        Hide
      </span>
      <span>
        <Eye class="w-5 h-5"></Eye>
      </span>
    </button>
  </div>
  <div
      class="text-xs max-w-xs lg:max-w-sm tracking-tight text-gray-700 dark:text-gray-300 mb-2 break-words">
    Searching for: "{{ store.searchString }}", {{ matches.length }} result(s) of {{ totalMatches ?? 0 }}
  </div>
  <div class="obsidian-search-highlight-area">
    <template v-for="note of matches" :key="note.score">
      <Card :filename="note.filename" :excerpt="note.excerpt" :matchesCount="note.matchesCount ?? 0"
            :showMatchesCount="store.matchCount" :searchString="store.searchString" :vaultName="store.vault"></Card>
    </template>
  </div>
  <button v-if="totalMatches > 6" @click="showMore()"
          class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    Show more results
  </button>
</template>

<script lang="ts" setup>

import { ref, onMounted, watchEffect, watch, defineEmits } from "vue";
import { syncRef } from "@vueuse/core";
import { computed } from 'vue';
import { store, syncStoreWithExtStorage } from '../store.js';
import {SearchModes} from "../config.js";
import { useSearch } from '../search.js';
import type {NoteMatch} from "../types.js";
import Card from './Card.vue';
import Eye from "./Eye.vue";
import Cog from "./Cog.vue";
import { openOptionsPage } from "../service.js";

const mode = ref<string>('');
const matches = ref<NoteMatch[]>([]);
const queryString = ref<string>('');
const displayNotesCount = ref<number>(6);
const totalMatches = ref<number>(0);

onMounted(async () => {
  await syncStoreWithExtStorage();

  const {
    searchString,
    searchMode,
    searchResults,
    initSearch,
    paginatedResults,
    displayNotesNumber
  } = await useSearch();

  watch(paginatedResults, (value) => { 
    // @ts-ignore
    matches.value = value;
    totalMatches.value = searchResults.value.length;
  });
  syncRef(displayNotesNumber, displayNotesCount);
  syncRef(searchMode, mode);
  syncRef(searchString, queryString);

  await initSearch();
});

const emit = defineEmits(['update:matches']);
watchEffect(() => {
  emit('update:matches', {
    matches: matches.value,
    searchString: queryString.value
  });
});

function toggleSidebar(): void {
  store.show = !store.show;
}

function searchInObsidianGui(): void {
  const searchValue = encodeURIComponent("file:(" + store.searchString + ")  OR line:(" + store.searchString + ")");
  fetch(store.protocol + store.obsidianRestUrl + "/search/gui/?query=" + searchValue);
}

function showMore() {
  displayNotesCount.value = displayNotesCount.value + 6;
}
</script>

<style scoped>
@import "../style/main.css";

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

.translate-x-0 {
  transform: translateX(0);
}

.translate-x-full {
  transform: translateX(100%);
}

.duration-300 {
  animation-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.popup-container,
.popup-button {
  z-index: 99999;
}
</style>
