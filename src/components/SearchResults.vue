<template>
  <div class="flex justify-between">
    <button v-if="mode != SearchModes.urlMatch" @click="searchInObsidianGui"
            class="focus:outline-none text-white bg-purple-700 hover: focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
      Open Search in Obsidian
    </button>
    <button @click="toggleSidebar"
            class="py-1.5 px-3 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Hide
    </button>
  </div>
  <div
      class="text-xs max-w-xs lg:max-w-sm tracking-tight text-gray-700 dark:text-gray-300 mb-2 break-words">
    Searching for: "{{ store.searchString }}", {{ computedNotes.length }} result(s) of {{ notes?.length ?? 0 }}
  </div>
  <div class="obsidian-search-highlight-area">
    <template v-for="note of computedNotes" :key="note.score">
      <Card :filename="note.filename" :matches="note.matches"
            :showMatchesCount="store.matchCount" :searchString="store.searchString" :vaultName="store.vault"></Card>
    </template>
  </div>
  <button v-if="notes?.length > 6" @click="store.noteNumber = store.noteNumber + 6"
          class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    Show more results
  </button>
</template>

<script lang="ts">

import Card from './Card.vue';
import {defineComponent} from 'vue'

import {checkApiKey} from '../util.js';
import {
  store,
  syncStoreWithExtStorage
} from '../store.js';
import {sendToRuntime} from '../service.js';
import {Actions, Status, SearchModes} from "../config.js";
import {NoteMatch, } from "../types.js";
import { useDebounceFn } from '@vueuse/core'

export default defineComponent({
  name: "SearchResults",
  components: {Card},
  data() {
    return {
      notes: [] as NoteMatch[],
      store,
      initialized: false,
    };
  },

  computed: {
    computedNotes(): NoteMatch[] {
      return this.notes.slice(0, store.noteNumber ?? 10) ?? [];
    },

    mode(): string {
      return store.searchUrls.split(',').some(url => store.currentUrl.includes(url)) ? SearchModes.search : SearchModes.urlMatch;
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
    await syncStoreWithExtStorage();
    await checkApiKey(`${store.protocol}${store.obsidianRestUrl}:${store.port}`, store.apiKey);

    await this.initSearch();

    addEventListener('keydown', () => {
      // add short cut for toggling sidebar
    })
  },
  methods: {

    toggleSidebar(): void {
      store.show = !store.show;
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
      // console.log('fetching: ', this.searchQueryUrl);
      fetch(this.searchQueryUrl, this.reqOptions)
          .then((res) => res.json())
          .then((data: NoteMatch[]) => {
            // @ts-ignore
            if (data?.errorCode) {
              throw new Error(data.toString());
            }

            let filteredNotes: NoteMatch[] = [];
            // Exclude search results matching exclude list
            if (store.excludes && store.excludes.split(',')[0] != '') {
              // console.log('excludes', store.excludes);
              // console.log('notes', data);
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

            sendToRuntime({action: Actions.badge, data: {text: data ? filteredNotes?.length.toString() : '0'}});

            // console.log(store.excludes, filteredNotes);

            this.notes = filteredNotes?.length ? filteredNotes : [];
          })
          .catch(e => {
            // console.log(e, store, this.reqOptions);
            sendToRuntime({action: Actions.badge, data: {text: 'x', status: Status.noauth}});
          });
    },

    async getUrlMatches(): Promise<void> {
      store.searchString = store.currentUrl;
      this.fetchNotes();
    },

    async initSearch(): Promise<void> {
      let params = new URLSearchParams(store.currentUrl.split('?')[1] ?? '');
      store.searchString = params.get("q") ?? '';

      // console.log(store.currentUrl, store.searchUrls, store.searchString, this.mode);
      // console.log(store.searchUrls.split(',').some(url => store.currentUrl.includes(url)));

      // If on a search page from settings array
      if (this.mode === SearchModes.search) {
        sendToRuntime({action: Actions.badge, data: {status: Status.search, text: ' '}});

        if (store.searchString) {
          this.fetchNotes();
        }
        if (store.liveSearch) {
          // @ts-ignore
          this.getInputElement()?.addEventListener('keyup', async (event: KeyboardEvent|any) => {
            // console.log('keyup', event.target?.value);
            store.searchString = event.target?.value ?? '';
            if (event.target?.value && event.target?.value?.length > store.minChars) {
              this.fetchNotes();
            } else {
              sendToRuntime({action: Actions.badge, data: {text: '0', status: Status.search}});
              this.notes = [];
            }
          });
        }
      } else {
        // If page url is not matching a search engine check inf notes contain current page URL
        sendToRuntime({action: Actions.badge, data: {status: Status.url , text: ' '}});
        addEventListener('hashchange', this.getUrlMatches);
        addEventListener('popstate', this.getUrlMatches);
        this.getUrlMatches();
      }
      console.log('Obsidian Search Initialized 🥳 mode: ' + this.mode + ', search: ' + store.searchString);
    },
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
