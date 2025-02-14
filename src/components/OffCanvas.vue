<template>
  <button ref="toggleButton" id="obsidian-search-for-web-offcanvas-toggle"
          v-if="showToggle"
          class="popup-button fixed right-1 top-1/2 rounded-full p-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="toggleSidebar">
    <span style="font-size: 18px;">
      <Logo></Logo>
    </span>
    <span class="sr-only">
      Show Obsidian Search Sidebar
    </span>
    <div v-if="searchResults?.length > 0" class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-black bg-success border-2 border-white rounded-md -bottom-2 -end-2 dark:border-gray-900">
      {{ searchResults?.length ?? 0 }}
    </div>
    <div v-if="connectionStatus !== 'search'" :class="connectionStatus === 'noauth' ? 'bg-warn' : 'bg-unknown'" class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-black  border-2 border-white rounded-md -bottom-2 -end-2 dark:border-gray-900">
      {{ connectionStatus === 'noauth' ? '🔑' : ' ' }}
    </div>
  </button>
  <div ref="offCanvas"
       id="obsidian-search-for-web-offcanvas-results"
       :class="(showPopup ? ' translate-x-0 ' : ' translate-x-full ') + ' max-h-screen w-[20em] md:w-[22em] lg:w-[24em] xl:w-[26em] popup-container shadow-sm dark:shadow-none border border-1 border-solid border-gray-200 dark:border-0 fixed duration-300 ease-in-out right-0 top-0 bg-gray-50 dark:bg-gray-900 p-2 rounded-l-[.375em] overflow-auto'">
    <SearchResults @update:matches="childMatches($event)"></SearchResults>
  </div>
</template>

<script setup lang="ts">

import SearchResults from './SearchResults.vue';
import Logo from './Logo.vue';
import {computed, onMounted, ref} from 'vue'
import {useStore} from '../store.js';
import {NoteMatch} from "../types.js";
import {useElementHover} from '@vueuse/core';
import {useObsidianConnection} from "../connection";

const store = useStore();

const searchResults = ref<NoteMatch[]>([]);
const toggleButton = ref<HTMLElement | null>(null);
const offCanvas = ref<HTMLElement | null>(null);
const { connectionStatus, connectionInfo } = useObsidianConnection();

const isToggleHovered = useElementHover(toggleButton, {
  delayEnter: 300,
  delayLeave: 500,
});
const isOffCanvasHovered = useElementHover(offCanvas, {
  delayEnter: 300,
  delayLeave: 1000,
});

const showPopup = computed(() => isToggleHovered.value || isOffCanvasHovered.value || (store.show && (store.showSidebarWhenNoResults || searchResults.value?.length > 0)));
const showToggle = computed(() => store.showInPageIcon && (store.showInPageIconWhenNoResults || searchResults.value?.length > 0));

onMounted(async () => {
  store.currentUrl = location.href;
});

function toggleSidebar(): void {
  store.show = !store.show;
}

function childMatches({matches, searchString}: { matches: NoteMatch[], searchString: string }) {
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
