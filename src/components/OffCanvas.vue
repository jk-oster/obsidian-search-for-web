<template>
  <button ref="toggleButton" id="obsidian-search-for-web-offcanvas-toggle"
          v-if="showToggle"
          :style="style"
          class="popup-button fixed rounded-full p-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="toggleSidebar">
    <span style="font-size: 18px;">
      <Logo></Logo>
<!--      <ExtensionIcon></ExtensionIcon>-->
    </span>
    <span class="sr-only">
      Show Obsidian Search Sidebar
    </span>
    <div v-if="searchResults?.length > 0" class="absolute inline-flex items-center justify-center px-1 h-6 text-xs font-bold text-black bg-success border-2 border-white rounded-md -bottom-2 -end-2 dark:border-gray-900">
      {{ searchResults?.length ?? 0 }}
    </div>
    <div v-if="connectionStatus !== 'search'" :class="connectionStatus === 'noauth' ? 'bg-warn' : 'bg-unknown'" class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-black  border-2 border-white rounded-md -bottom-2 -end-2 dark:border-gray-900">
      {{ connectionStatus === 'noauth' ? '🔑' : ' ' }}
    </div>
  </button>
  <div ref="offCanvas"
       id="obsidian-search-for-web-offcanvas-results overflow-hidden"
       :class="(showPopup ? ' translate-x-0 ' : ' translate-x-full ')"
       class="max-h-screen w-[20em] md:w-[22em] lg:w-[24em] xl:w-[26em] popup-container shadow-sm dark:shadow-none border border-1 border-solid border-gray-200 dark:border-0 fixed duration-300 ease-in-out right-0 top-0 bg-gray-50 dark:bg-gray-800 p-2 rounded-l-[.375em] overflow-auto">
      <div v-if="isOnDelay && !store.show" class="animate-progress absolute top-0 right-0 w-full h-[3px] bg-gray-200 dark:bg-gray-600"></div>
      <SearchResults @update:matches="childMatches($event)"></SearchResults>
  </div>

  <DedicatedNote></DedicatedNote>
</template>

<script setup lang="ts">

import SearchResults from './SearchResults.vue';
import Logo from './icons/Logo.vue';
import {computed, onMounted, ref, watch, watchEffect} from 'vue'
import {store} from '../store.js';
import {Note, NoteMatch} from "../types.js";
import {useElementHover, useDraggable, useWindowSize, useElementSize} from '@vueuse/core';
import {useObsidianConnection} from "../connection.js";
import DedicatedNote from './DedicatedNote.vue';

const searchResults = ref<NoteMatch[]>([]);
const toggleButton = ref<HTMLElement | null>(null);
const offCanvas = ref<HTMLElement | null>(null);
const { connectionStatus } = useObsidianConnection();

const body = useElementSize(document.body);

const {width, height} = useWindowSize({
  includeScrollbar: false,
  type: 'inner',
});

const initialPosition = JSON.parse(localStorage.getItem('obsidian-browser-search-position') ?? '{}');

const getRightSpacing = () => document.body.scrollHeight > document.body.clientHeight ? 65 : 50;

const { x, y, style } = useDraggable(toggleButton, {
  initialValue: {
    x: Math.max(Math.min(initialPosition.x ?? width.value - getRightSpacing(), width.value - getRightSpacing()), 5),
    y: Math.max(Math.min(initialPosition.y ?? (height.value  / 2) - 20, height.value - 40), 5),
  },
  preventDefault: true,
});

watch(width, () => {
  x.value = width.value - getRightSpacing();
});
watch(height, () => {
  x.value = width.value - getRightSpacing();
  y.value = (height.value / 2) - 20;
});
watch(body.height, () => {
  x.value = width.value - getRightSpacing();
  y.value = (height.value / 2) - 20;
});
watchEffect(() => {
  localStorage.setItem('obsidian-browser-search-position', JSON.stringify({
    x: Math.round(x.value),
    y: Math.round(y.value),
  }));
});

const isToggleHovered = useElementHover(toggleButton, {
  delayEnter: 300,
  delayLeave: 500,
});
const isOffCanvasHovered = useElementHover(offCanvas, {
  delayEnter: 300,
  delayLeave: 1000,
});
const isOffCanvasHoveredNoDelay = useElementHover(offCanvas);
const isOnDelay = computed(() => isOffCanvasHovered.value && !isOffCanvasHoveredNoDelay.value);

const showPopup = computed(() => (store.showSidebarOnButtonHover && isToggleHovered.value) || isOffCanvasHovered.value || (store.show && (store.showSidebarWhenNoResults || searchResults.value?.length > 0)));
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

@keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
}

.animate-progress {
    animation: progress 1s linear forwards;
}
</style>
