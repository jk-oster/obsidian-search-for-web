<template>
  <button v-if="store.showInPageIcon && !store.show && notes?.length > 0"
    class="popup-button ob-fixed ob-right-1 ob-top-1/2 ob-rounded-full" @click="toggleSidebar">
    <div class="relative">
      <img src="/icon/obsidian32.png" alt="Show Obsidian Search">
    </div>
  </button>
  <div
    :class="(showPopup ? ' ob-translate-x-0 ' : ' ob-translate-x-full ') + ' ob-max-h-screen popup-container ob-fixed ob-duration-300 ob-ease-in-out ob-right-0 ob-top-0 dark ob-bg-gray-900 ob-p-2 ob-rounded ob-overflow-auto'">
    <div class="ob-flex ob-justify-between">
      <button v-if="mode != 'urlMatch'" @click="searchInObsidianGui"
        class="focus:ob-outline-none ob-text-white ob-bg-purple-700 hover:ob- ob-focus:ring-4 focus:ob-ring-purple-300 ob-font-medium ob-rounded-lg ob-text-sm ob-px-3 ob-py-1.5 ob-mb-2 dark:ob-bg-purple-600 dark:hover:ob-bg-purple-700 dark:focus:ob-ring-purple-900">
        Open Search in Obsidian
      </button>
      <button @click="toggleSidebar"
        class="ob-py-1.5 ob-px-3 ob-mb-2 text-sm ob-font-medium ob-text-gray-900 focus:ob-outline-none ob-bg-white ob-rounded-lg ob-border ob-border-gray-200 hover:ob-bg-gray-100 hover:ob-text-blue-700 focus:ob-z-10 focus:ob-ring-4 focus:ob-ring-gray-200 dark:focus:ob-ring-gray-700 dark:ob-bg-gray-800 dark:ob-text-gray-400 dark:ob-border-gray-600 dark:hover:ob-text-white dark:hover:ob-bg-gray-700">
        Hide
      </button>
    </div>
    <div class="ob-text-xs ob-max-w-xs ob-lg:max-w-sm ob-tracking-tight ob-text-gray-700 dark:ob-text-gray-300 ob-mb-2 ob-break-words">
      Searching for: "{{ store.searchString }}", {{ computedNotes.length }} result(s)
    </div>
    <div class="highlight-area">
      <Card v-for="note of computedNotes" :key="note.score" :filename="note.filename" :matches="note.matches"
        :showMatchesCount="store.matchCount" :searchString="store.searchString" :vaultName="store.vault"></Card>
    </div>
    <button v-if="notes?.length > 6" @click="store.noteNumber = store.noteNumber + 6"
      class="ob-text-white ob-mt-2 ob-bg-gray-800 hover:ob-bg-gray-900 focus:ob-outline-none focus:ob-ring-4 focus:ob-ring-gray-300 ob-font-medium ob-rounded-lg ob-text-sm ob-px-3 ob-py-1.5 ob-mr-2 ob-mb-2 dark:ob-bg-gray-800 dark:hover:ob-bg-gray-700 dark:focus:ob-ring-gray-700 dark:ob-border-gray-700">
      Show more results</button>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { checkApiKey } from '@/util.js';
import { store, loadAllFromExtStorageTo, initStorageListeners, saveToExtStorageAnd } from '@/store.js';
import { sendToRuntime } from '@/service.js';

export default {
  components: [Card],
  data() {
    return {
      notes: [],
      mode: '',
      store,
      initialized: false,
    };
  },
  computed: {
    showPopup() {
      // console.log(this.notes?.length > 0, this.searchString?.length > this.minChars, this.show);
      return this.notes?.length > 0 && store.searchString?.length > store.minChars && store.show;
    },
    computedNotes() {
      let filteredNotes = this.notes ?? [];

      // console.log(this.excludes?.length);

      // Exclude search results matching exclude list
      if (store.excludes?.length > 0 && store.excludes[0] != '') {
        console.log('excludes', store.excludes);
        console.log('notes', this.notes);
        filteredNotes = this.notes?.filter(note => {
          return store.excludes.every(exclude => !note.filename.includes(exclude))
        }) ?? [];
      }

      // Rank notes with filename matching search first
      const match = store.searchString?.toLowerCase();
      filteredNotes?.sort((a, b) => {
        const aIndexMatch = a.filename.toLowerCase().indexOf(match);
        const bIndexMatch = b.filename.toLowerCase().indexOf(match);
        if (aIndexMatch > bIndexMatch) return -1;
        if (aIndexMatch < bIndexMatch) return 1;
        return 0;
      });

      return filteredNotes.slice(0, store.noteNumber) ?? [];
    },

    reqOptions() {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + store.apiKey,
        },
      }
    }
  },
  async created() {
    addEventListener('search', () => {
      if (!this.initialized) {
        this.initialized = true;
        this.initSearch();
        console.log('search initialized with notes:', this.notes);
      }
    })

    await loadAllFromExtStorageTo(store);
    initStorageListeners(store);
    await checkApiKey(store.obsidianRestUrl, store.apiKey);

    // start a timer that checks every 10 seconds if the API key is still valid
    // -> update the badge
    // setInterval(async () => {
    //   await checkApiKey(store.obsidianRestUrl, store.apiKey);
    // }, 10 * 1000);

    console.log('notes', this.notes);

    addEventListener('keydown', () => {
      // add short cut for toggling sidebar
    })
  },
  methods: {

    toggleSidebar() {
      saveToExtStorageAnd(store, 'show', !store.show);
    },

    getInputElement() {
      const input = false
        || document.querySelector("input[aria-label=Suche]")
        || document.querySelector("input[aria-label=Search]")
        || document.querySelector("input[name=q]")
        || document.querySelector("input[data-testid='search-input']")
        || document.querySelector("input[type=search]")
        || document.querySelector("textarea[name=q]")
        || document.querySelector("textarea[type=search]")
        || document.querySelector("textarea[aria-label=Suche]")
        || document.querySelector("textarea[aria-label=Search]");
      if (!input) console.warn('No search input element detected 😢');
      return input;
    },

    searchInObsidianGui() {
      const searchValue = encodeURIComponent("file:(" + store.searchString + ")  OR line:(" + store.searchString + ")");
      fetch(store.obsidianRestUrl + "/search/gui/?query=" + searchValue, this.reqOptions);
    },

    fetchNotes() {
      console.log('fetching: ', store.obsidianRestUrl + "/search/simple/?query=" + store.searchString + "&contextLength=" + store.contextLength);
      fetch(
        store.obsidianRestUrl + "/search/simple/?query=" + store.searchString + "&contextLength=" + store.contextLength,
        this.reqOptions
      )
        .then((res) => res.json())
        .then(data => {
          if (data.errorCode) {
            throw new Error(data);
          }
          saveToExtStorageAnd(store, 'results', data ? data.length : 0);
          sendToRuntime({ action: 'badge', results: data ? data.length : 0 });
          this.notes = data.length ? data : [];
        })
        .catch(e => {
          console.log(e, store, this.reqOptions);
        });
    },
    async getUrlMatches() {
      store.searchString = document.location.href;
      this.fetchNotes();
    },
    async initSearch() {
      let params = new URLSearchParams(document.location.search);
      store.searchString = params.get("q");

      // If on a search page from settings array
      if (store.searchUrls.some(url => location.origin.includes(url))) {
        saveToExtStorageAnd(store, 'status', 'search');
        sendToRuntime({ action: 'badge', status: 'search' });

        if (store.searchString) {
          this.fetchNotes();
        }
        if (store.liveSearch) {
          this.getInputElement()?.addEventListener("keyup", async (event) => {
            console.log('keyup', event.target.value);
            store.searchString = event.target.value;
            if (event.target.value && event.target.value.length > store.minChars) {
              this.fetchNotes();
            } else {
              saveToExtStorageAnd(store, 'results', 0);
              sendToRuntime({ action: 'badge', results: 0 });
              this.notes = [];
            }
          });
        }
      }
      else {
        // If page url is not matching a search engine check inf notes contain current page URL
        this.mode = 'urlMatch';
        saveToExtStorageAnd(store, 'status', 'url');
        sendToRuntime('badge', { status: 'url' });
        addEventListener('hashchange', this.getUrlMatches);
        addEventListener('popstate', this.getUrlMatches);
        this.getUrlMatches();
      }
      console.log('Obsidian Search Initialized 🥳 mode: ' + this.mode + ', search: ' + store.searchString);
    },
    async delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  },
};
</script>

<style scoped>
@import "@/style/main.css";

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
