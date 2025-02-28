<template>
  <div class="w-full">

    <div class="flex justify-between" style="font-size: 20px;">
      <button @click="openOptionsPage" 
        :title="'Open Settings (' + store.settingsHotKeyConfig + ')'"
        class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
        <span class="sr-only">
          Settings
        </span>
        <span>
          <Cog class="w-6 h-6 text-gray-900 dark:text-gray-400"></Cog>
        </span>
      </button>

      <button v-if="isRestApiConnected" 
        @click="openPeriodicNote" 
        :title="'Open Periodic Note ' + store.period + ' (' + store.openPeriodicHotKeyConfig + ')'"
        class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
        <span class="sr-only">
          Open Periodic Note ({{ store.period }}) ({{ store.openPeriodicHotKeyConfig }})
        </span>
        <span>
          <CalendarIcon class="w-6 h-6 text-gray-900 dark:text-gray-400"></CalendarIcon>
        </span>
      </button>

      <!-- <a href="" class="no-underline focus:outline-hidden text-white text-xs bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"></a> -->
      <a :href="'obsidian://search?query=' + encodeURIComponent(store.searchString) + '&vault=' + encodeURIComponent(store.vault)"
        title="Open Search in Obsidian"
        class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500"     >
        <div class="sr-only">
          Open Search in Obsidian
        </div>
        <span>
          <OpenLink class="w-6 h-6 text-gray-900 dark:text-gray-400"></OpenLink>
        </span>
      </a>

      <button v-if="isRestApiConnected" @click="appendPeriodicNote" 
        :title="'Append Periodic Note ' + store.period + ' (' + store.appendPeriodicHotKeyConfig + ')'"
        class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
        <span class="sr-only">
          Append Periodic Note ({{ store.period }}) ({{ store.appendPeriodicHotKeyConfig }})
        </span>
        <span>
          <CalendarPlusIcon class="w-6 h-6 text-gray-900 dark:text-gray-400"></CalendarPlusIcon>
        </span>
      </button>

      <button @click="toggleSidebar" :title="(store.show ? 'Unpin Sidebar: ' : 'Pin Sidebar: ') + store.pinHotKeyConfig"
              class="p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
        <span class="sr-only">
          {{ store.show ? 'Unpin Sidebar' : 'Pin Sidebar' }}
        </span>
        <span>
          <Pin v-if="!store.show" class="h-5 w-5"></Pin>
          <UnPin v-if="store.show" class="h-5 w-5"></UnPin>
        </span>
      </button>
    </div>

    <NotePreview ref="notePreviewElem" 
        url="obsidian://daily"
        type="periodic"
        :mode="previewOpenMode"
        :name="dailyNoteNameString + ` (${store.period})`"
        :filename="dailyNoteNameString + '.md'"
        searchString="">
    </NotePreview>

    <form class="mx-auto flex mb-2">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search"
               ref="searchInput"
               v-model="searchString"
               class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:bg-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-600 dark:focus:border-gray-600"
               :placeholder="'Search your vault ... (' + store.searchHotKeyConfig + ')'"
               />
      </div>
    </form>

    <div
        class="text-xs tracking-tight text-gray-700 dark:text-gray-100 mb-2 break-words">
      {{ paginatedResults.length }} result(s) of {{ totalMatches ?? 0 }}
    </div>
    <div class="obsidian-search-highlight-area">
      <template v-for="note of paginatedResults" :key="note.score">
        <ResultCard :item="note"
              :showIcon="false"
              :canPreview="isRestApiConnected"
              :showMatchesCount="store.matchCount"
              :searchString="store.searchString"
              :highlighting="store.highlighting ?? false"
              :vaultName="store.vault">
        </ResultCard>
      </template>

      <div v-if="paginatedResults.length <= 0"  class="min-h-8 p-3 text-xs rounded-md border border-1 border-dashed border-gray-700 dark:border-gray-300  text-gray-700 dark:text-gray-100 mb-2">

        <div v-if="connectionStatus === 'noauth'">
          🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings and paste it in the extension <a class="underline" href="#" @click.prevent="openOptionsPage()">settings</a>.
        </div>
        <div v-else-if="connectionStatus !== 'search'">
          ❗ Could not connect to Obsidian. Please make sure <a class="underline" href="obsidian://open">Obsidian</a> is running and check your extension <a class="underline" href="#" @click.prevent="openOptionsPage()">settings</a>.
        </div>

        <div v-else class="break-words flex flex-col items-center justify-center">
          <Close class="h-12"></Close>
          No matching results found in your Obsidian vault.
        </div>

      </div>
    </div>
    <button v-if="totalMatches > 6" @click="showMore()"
            class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-hidden focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Show more results
    </button>
  </div>
</template>

<script lang="ts" setup>

import {watchEffect, defineEmits, ref} from "vue";
import {store} from '../store.js';
import {useSearch} from '../search.js';
import ResultCard from './ResultCard.vue';
import Cog from "./Cog.vue";
import {getTabService} from "../background-services/TabService.js";
import Pin from "./Pin.vue";
import UnPin from "./UnPin.vue";
import Close from "./Close.vue";
import CalendarIcon from "./CalendarIcon.vue";
import CalendarPlusIcon from "./CalendarPlusIcon.vue";
import NotePreview from "./NotePreview.vue";
import OpenLink from "./OpenLink.vue";
import { useHotkeys } from "../hotkeys.js";
import { whenever } from "@vueuse/core";

const tabService = getTabService();

const searchInput = ref<HTMLInputElement | null>(null);

const pinHotkey = useHotkeys(store.pinHotKeyConfig, toggleSidebar);
const openPeriodicHotkey = useHotkeys(store.openPeriodicHotKeyConfig, openPeriodicNote);
const appendPeriodicHotkey = useHotkeys(store.appendPeriodicHotKeyConfig, appendPeriodicNote);
const settingsHotkey = useHotkeys(store.settingsHotKeyConfig, openOptionsPage);
const searchHotkey = useHotkeys(store.searchHotKeyConfig, () => {
  if (!store.show) {
    store.show = true;
  }
  if(searchInput.value) {
    setTimeout(() => {
      searchInput.value?.focus();
      searchInput.value?.select();
    }, 300);
  }
});

const todaysDate = new Date();
const dailyNoteNameString = `${todaysDate.getFullYear()}-${(todaysDate.getMonth() + 1).toString().padStart(2, '0')}-${todaysDate.getDate().toString().padStart(2, '0')}`;
const notePreviewElem = ref<HTMLElement | null>(null);
const previewOpenMode = ref<'append'|'preview'|'edit'>('preview');

const {
  searchString,
  searchResults,
  paginatedResults,
  displayNotesNumber,
  totalMatches,
  connectionStatus,
  isRestApiConnected,
  debouncedFetchNotes,
} = useSearch();

whenever(searchString, () => {
  debouncedFetchNotes();
});

const emit = defineEmits(['update:matches']);
watchEffect(() => {
  emit('update:matches', {
    matches: searchResults.value,
    searchString: searchString.value,
  });
});

function toggleSidebar(): void {
  store.show = !store.show;
}

function showMore() {
  displayNotesNumber.value = displayNotesNumber.value + 6;
}

function openOptionsPage() {
  tabService.openOptionsPage();
}

function openPeriodicNote() {
  previewOpenMode.value = 'preview';
  // @ts-ignore
  notePreviewElem.value?.openNotePreview('preview');
}

function appendPeriodicNote() {
  previewOpenMode.value = 'append';
  // @ts-ignore
  notePreviewElem.value?.openNotePreview('append');
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
