<template>
  <button v-if="store.showInPageIcon && !store.show && Number(searchResults.length) > 0"
          class="popup-button fixed right-1 top-1/2 rounded-full p-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="toggleSidebar">
    <span style="font-size: 18px;">
      <!-- <img src="/icon/icon128.png" alt=""> -->
      <Logo></Logo>
    </span>
    <span class="sr-only">
      Show Obsidian Search
    </span>
  </button>
  <div
      :class="(showPopup ? ' translate-x-0 ' : ' translate-x-full ') + ' max-h-screen popup-container fixed duration-300 ease-in-out right-0 top-0 bg-white dark:bg-gray-900 p-2 rounded overflow-auto'">
      <SearchResults @update:matches="childMatches($event)"></SearchResults>
  </div>
</template>

<script setup lang="ts">

import SearchResults from './SearchResults.vue';
import Logo from './Logo.vue';
import {computed, onMounted, ref} from 'vue'
import {store, syncStoreWithExtStorage} from '../store.js';
import {NoteMatch} from "../types.js";

const searchResults = ref<NoteMatch[]>([]);

const showPopup = computed(() => Boolean(Number(searchResults.value.length) > 0 && store.searchString?.length > store.minChars && store.show))

onMounted(async () => {
  await syncStoreWithExtStorage();
  store.currentUrl = location.href;
});

function toggleSidebar(): void {
  store.show = !store.show;
}

function childMatches({matches, searchString}: { matches: NoteMatch[], searchString: string }) {
  // console.log(matches);
  searchResults.value = matches;
  store.searchString = searchString;
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
