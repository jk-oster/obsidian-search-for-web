<template>
  <button v-if="store.showInPageIcon && !store.show && Number(store.results) > 0"
          class="popup-button ob-fixed ob-right-1 ob-top-1/2 ob-rounded-full" @click="toggleSidebar">
    <div class="relative">
      <img src="/icon/obsidian32.png" alt="Show Obsidian Search">
    </div>
  </button>
  <div
      :class="(showPopup ? ' ob-translate-x-0 ' : ' ob-translate-x-full ') + ' ob-max-h-screen popup-container ob-fixed ob-duration-300 ob-ease-in-out ob-right-0 ob-top-0 dark ob-bg-gray-900 ob-p-2 ob-rounded ob-overflow-auto'">
    <SearchResults></SearchResults>
  </div>
</template>

<script lang="ts">

import SearchResults from './SearchResults.vue';
import {defineComponent} from 'vue'

import {
  saveToExtStorageAnd,
  store,
  syncStoreWithExtStorage
} from '../store.js';


export default defineComponent({
  name: "OffCanvas",
  components: { SearchResults},

  data() {
    return {
      store,
    }
  },
  async mounted() {
    await syncStoreWithExtStorage(store);
    store.currentUrl = location.href;
  },
  computed: {
    showPopup(): boolean {
      // console.log(this.notes?.length > 0, this.searchString?.length > this.minChars, this.show);
      return Boolean(Number(store.results) > 0 && store.searchString?.length > store.minChars && store.show);
    },
  },
  methods: {
    toggleSidebar(): void {
      saveToExtStorageAnd(store, 'show', !store.show);
    },
  }
});
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
