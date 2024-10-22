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
      <Card :filename="note.filename" :matches="note.matches" :matchesCount="note.matchesCount ?? note.matches?.length ?? 0"
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
import {LocalRestNoteMatch, OmniSearchNoteMatch, } from "../types.js";
import { useDebounceFn } from '@vueuse/core'

export default defineComponent({
  name: "SearchResults",
  components: {Card},
  data() {
    return {
      notes: [] as LocalRestNoteMatch[],
      store,
      initialized: false,
      SearchModes,
    };
  },

  computed: {
    computedNotes(): LocalRestNoteMatch[] {
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
      if(store.provider === 'local-rest') {
        return `${store.protocol}${store.obsidianRestUrl}:${store.port}/search/simple/?query=${store.searchString}&contextLength=${store.contextLength}`;
      } else {
        return `${store.protocol}${store.obsidianRestUrl}:${store.port}/search?q=${store.searchString}`;
      }
    }
  },
  async mounted() {
    const data = await syncStoreWithExtStorage();

    const apiStatus = await checkApiKey(`${store.protocol}${store.obsidianRestUrl}:${store.port}`, store.apiKey, store.provider);
    if (apiStatus.status !== Status.search) {
      return;
    }

    await this.initSearch();
  },
  methods: {

    toggleSidebar(): void {
      store.show = !store.show;
    },

    getInputElement(): Element | null {
      const input = false
          || document.querySelector("input[aria-label=Suche], input[aria-label=Search], input[name=q], input[data-testid='search-input'], input[type=search], textarea[name=q], textarea[type=search], textarea[aria-label=Suche], textarea[aria-label=Search]");
      if (!input) console.warn('No search input element detected 😢');
      return input;
    },

    searchInObsidianGui(): void {
      const searchValue = encodeURIComponent("file:(" + store.searchString + ")  OR line:(" + store.searchString + ")");
      fetch(store.protocol + store.obsidianRestUrl + "/search/gui/?query=" + searchValue, this.reqOptions);
    },

    omniSearchResultToRestNoteMatch(omniSearchResult: OmniSearchNoteMatch): LocalRestNoteMatch {
      return {
        filename: omniSearchResult.path,
        score: omniSearchResult.score,
        matchesCount: omniSearchResult.matches.length,
        matches: [{
            match: {
                start: 0,
                end: 0,
            },
            context: omniSearchResult.excerpt,
        }]
      };
    },

    fetchNotes(): void {
      // console.log('fetching: ', this.searchQueryUrl);
      fetch(this.searchQueryUrl, store.provider === 'local-rest' ? this.reqOptions : {})
          .then((res) => res.json())
          .then((data: LocalRestNoteMatch[]|OmniSearchNoteMatch[]) => {
            // @ts-ignore
            if (data?.errorCode) {
              throw new Error(data.toString());
            }

            // @ts-ignore
            let filteredNotes: LocalRestNoteMatch[] = data ?? [];
            if(store.provider === 'omni-search') {
              filteredNotes = data.map((note) => this.omniSearchResultToRestNoteMatch(note as OmniSearchNoteMatch));
            }

            // Exclude search results matching exclude list
            if (store.excludes && store.excludes.split(',')[0] != '') {
              filteredNotes = filteredNotes?.filter((note: LocalRestNoteMatch) => {
                return store.excludes.split(',').every(exclude => !note.filename.includes(exclude))
              }) ?? [];
            }

            // Re-Rank notes with filename matching search first
            if (store.provider === 'local-rest') {
              const match = store.searchString?.toLowerCase();
              filteredNotes?.sort((a: LocalRestNoteMatch, b: LocalRestNoteMatch) => {
                const aIndexMatch = a.filename.toLowerCase().indexOf(match);
                const bIndexMatch = b.filename.toLowerCase().indexOf(match);
                if (aIndexMatch > bIndexMatch) return -1;
                if (aIndexMatch < bIndexMatch) return 1;
                return 0;
              });
            }

            sendToRuntime({action: Actions.badge, data: {text: data ? filteredNotes?.length.toString() : '0'}});

            // console.log(store.excludes, filteredNotes);

            this.notes = filteredNotes?.length ? filteredNotes : [];
          })
          .catch(e => {
            // console.log(e, store, this.reqOptions);
            sendToRuntime({action: Actions.badge, data: {text: 'off', status: Status.offline}});
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
