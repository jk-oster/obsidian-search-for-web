<template>
  <button v-if="store.showInPageIcon && !store.show && notes?.length > 0"
    class="popup-button fixed right-1 top-1/2 rounded-full" @click="toggleSidebar">
    <div class="relative">
      <img src="../assets/obsidian32.png" alt="Show Obsidian Search">
    </div>
  </button>
  <div
    :class="(showPopup ? ' translate-x-0 ' : ' translate-x-full ') + ' max-h-screen popup-container fixed duration-300 ease-in-out right-0 top-0 dark bg-gray-900 p-2 rounded overflow-auto'">
    <div class="flex justify-between">
      <button v-if="mode != 'urlMatch'" @click="searchInObsidianGui"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Open Search in Obsidian
      </button>
      <button @click="toggleSidebar"
        class="py-1.5 px-3 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Hide
      </button>
    </div>
    <div class="text-xs max-w-xs lg:max-w-sm tracking-tight text-gray-700 dark:text-gray-300 mb-2 break-words">
      Searching for: "{{ store.searchString }}", {{ computedNotes.length }} result(s)
    </div>
    <div class="highlight-area">
      <Card v-for="note of computedNotes" :key="note.score" :filename="note.filename" :matches="note.matches"
        :showMatchesCount="store.matchCount" :searchString="store.searchString" :vaultName="store.vault"></Card>
    </div>
    <button v-if="notes?.length > 6" @click="store.noteNumber = store.noteNumber + 6"
      class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
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
