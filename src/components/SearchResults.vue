<template>
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
  <div
      class="ob-text-xs ob-max-w-xs ob-lg:max-w-sm ob-tracking-tight ob-text-gray-700 dark:ob-text-gray-300 ob-mb-2 ob-break-words">
    Searching for: "{{ store.searchString }}", {{ computedNotes.length }} result(s) of {{ notes?.length ?? 0 }}
  </div>
  <div class="highlight-area">
    <template v-for="note of computedNotes" :key="note.score">
      <Card :filename="note.filename" :matches="note.matches"
            :showMatchesCount="store.matchCount" :searchString="store.searchString" :vaultName="store.vault"></Card>
    </template>
  </div>
  <button v-if="notes?.length > 6" @click="store.noteNumber = store.noteNumber + 6"
          class="ob-text-white ob-mt-2 ob-bg-gray-800 hover:ob-bg-gray-900 focus:ob-outline-none focus:ob-ring-4 focus:ob-ring-gray-300 ob-font-medium ob-rounded-lg ob-text-sm ob-px-3 ob-py-1.5 ob-mr-2 ob-mb-2 dark:ob-bg-gray-800 dark:hover:ob-bg-gray-700 dark:focus:ob-ring-gray-700 dark:ob-border-gray-700">
    Show more results
  </button>
</template>

<script lang="ts">

import Card from './Card.vue';
import {defineComponent} from 'vue'

import {checkApiKey} from '../util.js';
import {
  saveToExtStorageAnd,
  store,
  syncStoreWithExtStorage
} from '../store.js';
import {sendToRuntime} from '../service.js';
import {Status, MessageAction, NoteMatch} from "../types.js";


export default defineComponent({
  name: "SearchResults",
  components: {Card},
  data() {
    return {
      notes: [],
      store,
      initialized: false,
    };
  },

  computed: {
    computedNotes(): any[] {
      return this.notes.slice(0, store.noteNumber ?? 10) ?? [];
    },

    mode(): string {
      return store.searchUrls.split(',').some(url => store.currentUrl.includes(url)) ? 'search' : 'urlMatch';
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
    },

    searchQueryUrl(): string {
      return `${store.protocol}${store.obsidianRestUrl}:${store.port}/search/simple/?query=${store.searchString}&contextLength=${store.contextLength}`;
    }
  },
  async mounted() {
    await syncStoreWithExtStorage(store);
    await checkApiKey(`${store.protocol}${store.obsidianRestUrl}:${store.port}`, store.apiKey);

    this.initSearch();

    addEventListener('keydown', () => {
      // add short cut for toggling sidebar
    })
  },
  methods: {

    toggleSidebar(): void {
      saveToExtStorageAnd(store, 'show', !store.show);
    },

    getInputElement(): Element | null {
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

    searchInObsidianGui(): void {
      const searchValue = encodeURIComponent("file:(" + store.searchString + ")  OR line:(" + store.searchString + ")");
      fetch(store.protocol + store.obsidianRestUrl + "/search/gui/?query=" + searchValue, this.reqOptions);
    },

    fetchNotes(): void {
      console.log('fetching: ', this.searchQueryUrl);
      fetch(this.searchQueryUrl, this.reqOptions)
          .then((res) => res.json())
          .then((data: NoteMatch[]) => {
            // @ts-ignore
            if (data?.errorCode) {
              throw new Error(data.toString());
            }

            let filteredNotes
            // Exclude search results matching exclude list
            if (store.excludes && store.excludes.split(',')[0] != '') {
              console.log('excludes', store.excludes);
              console.log('notes', data);
              filteredNotes = data?.filter((note: NoteMatch) => {
                return store.excludes.split(',').every(exclude => !note.filename.includes(exclude))
              }) ?? [];
            }

            // Rank notes with filename matching search first
            const match = store.searchString?.toLowerCase();
            filteredNotes?.sort((a: NoteMatch, b: NoteMatch) => {
              const aIndexMatch = a.filename.toLowerCase().indexOf(match);
              const bIndexMatch = b.filename.toLowerCase().indexOf(match);
              if (aIndexMatch > bIndexMatch) return -1;
              if (aIndexMatch < bIndexMatch) return 1;
              return 0;
            });

            saveToExtStorageAnd(store, 'results', data ? filteredNotes?.length : 0);
            sendToRuntime({action: MessageAction.BADGE, data: {results: data ? filteredNotes?.length : 0}});

            console.log(store.excludes, filteredNotes);

            this.notes = filteredNotes.length ? filteredNotes : [];
          })
          .catch(e => {
            console.log(e, store, this.reqOptions);

            saveToExtStorageAnd(store, 'results', 'x');
            sendToRuntime({action: MessageAction.BADGE, data: {results: 'x', status: Status.noauth}});
          });
    },

    async getUrlMatches(): Promise<void> {
      store.searchString = store.currentUrl;
      this.fetchNotes();
    },

    async initSearch(): Promise<void> {
      let params = new URLSearchParams(store.currentUrl.split('?')[1] ?? '');
      store.searchString = params.get("q") ?? '';

      console.log(store.currentUrl, store.searchUrls, store.searchString, this.mode);
      console.log(store.searchUrls.split(',').some(url => store.currentUrl.includes(url)));

      // If on a search page from settings array
      if (this.mode === 'search') {
        saveToExtStorageAnd(store, 'status', Status.search);
        sendToRuntime({action: MessageAction.BADGE, data: {status: Status.search}});

        if (store.searchString) {
          this.fetchNotes();
        }
        if (store.liveSearch) {
          // @ts-ignore
          this.getInputElement()?.addEventListener("keyup", async (event: KeyboardEvent) => {
            console.log('keyup', event.target.value);
            store.searchString = event.target.value;
            if (event.target.value && event.target.value.length > store.minChars) {
              this.fetchNotes();
            } else {
              saveToExtStorageAnd(store, 'results', 0);
              sendToRuntime({action: MessageAction.BADGE, data: {results: 0, status: Status.search}});
              this.notes = [];
            }
          });
        }
      } else {
        // If page url is not matching a search engine check inf notes contain current page URL
        saveToExtStorageAnd(store, 'status', Status.url);
        sendToRuntime({action: MessageAction.BADGE, data: {status: Status.url}});
        addEventListener('hashchange', this.getUrlMatches);
        addEventListener('popstate', this.getUrlMatches);
        this.getUrlMatches();
      }
      console.log('Obsidian Search Initialized 🥳 mode: ' + this.mode + ', search: ' + store.searchString);
    },
    async delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  },
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
