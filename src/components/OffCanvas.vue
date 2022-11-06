<template>
  <button v-if="showInPageIcon && !show && notes?.length > 0" class="popup-button absolute right-1 top-1/2 rounded-full"
    @click="toggleSidebar">
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
    <div class="text-xs max-w-xs lg:max-w-sm tracking-tight text-gray-700 dark:text-gray-300 mb-2">
      Searching for: "{{ searchString }}", {{ notes.length }} result(s)
    </div>
    <div class="highlight-area">
      <Card v-for="note of computedNotes" :key="note.score" :filename="note.filename" :matches="note.matches"
        :showMatchesCount="matchCount" :searchString="searchString" :vaultName="vault"></Card>
    </div>
    <button v-if="notes?.length > 6" @click="noteNumber = noteNumber + 6"
      class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Show more results</button>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { checkApiKey } from '@/util.js';
const browser = require("webextension-polyfill");

export default {
  components: [Card],
  data() {
    return {
      notes: [],
      reqOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer ",
        },
      },
      searchString: '',
      contextLength: 50,
      noteNumber: 10,
      liveSearch: true,
      showInPageIcon: true,
      searchUrls: [],
      mode: '',
      excludes: [],
      obsidianRestUrl: '',
      vault: '',
      show: true,
      matchCount: 2,
      minChars: 2,
    };
  },
  computed: {
    showPopup() {
      console.log(this.notes?.length > 0, this.searchString?.length > this.minChars, this.show);
      return this.notes?.length > 0 && this.searchString?.length > this.minChars && this.show;
    },
    computedNotes() {
      // Exclude search results matching exclude list
      const filteredNotes = this.notes?.filter(note => {
        return this.excludes.every(exclude => !note.filename.includes(exclude))
      }) ?? [];

      // Rank notes with filename matching search first
      const match = this.searchString?.toLowerCase();
      filteredNotes?.sort((a, b) => {
        const aIndexMatch = a.filename.toLowerCase().indexOf(match);
        const bIndexMatch = b.filename.toLowerCase().indexOf(match);
        if (aIndexMatch > bIndexMatch) return -1;
        if (aIndexMatch < bIndexMatch) return 1;
        return 0;
      });

      return filteredNotes.slice(0, this.noteNumber) ?? [];
    },
  },
  created() {
    // listen to event for changes from saved data in storage
    browser.storage.onChanged.addListener((data, namespace) => {
      console.log(data);
      if (data.show) {
        this.show = data.show.newValue;
      }
      else if (data.results || data.status) {
        // DO Nothing
      }
      else {
        this.loadSettings();
      }
    });

    this.loadSettings(async (data) => {
      this.show = data?.show ?? true;
      checkApiKey(this.obsidianRestUrl, data.apiKey, this.initSearch);
    });

    addEventListener('keydown', () => {
      // add short cut for toggling sidebar
    })
  },
  methods: {
    loadSettings(callback = () => { }) {
      browser.storage.sync.get().then((data) => {
        this.reqOptions.headers.Authorization = "Bearer " + data.apiKey;
        this.obsidianRestUrl = data.protocol;
        this.searchUrls = data.searchUrls.split(',') ?? [];
        this.excludes = data.excludes.split(',') ?? [];
        this.noteNumber = data.noteNumber;
        this.minChars = data.minChars;
        this.show = data.show;
        this.searchString = data?.searchString;
        this.contextLength = data.contextLength;
        this.liveSearch = data.liveSearch;
        this.showInPageIcon = data?.showInPageIcon;
        this.vault = data.vault;
        this.matchCount = data.matchCount;

        callback(data);
      });
    },
    toggleSidebar() {
      browser.storage.sync.set({ show: !this.show });
    },
    getInputElement() {
      const input = document.querySelector("input[aria-label=Suche]") ?? document.querySelector("input[name=q]");
      if (!input) console.warn('No search input element detected 😢');
      return input;
    },
    searchInObsidianGui() {
      const searchValue = encodeURIComponent("file:(" + this.searchString + ")  OR line:(" + this.searchString + ")");
      fetch(this.obsidianRestUrl + "/search/gui/?query=" + searchValue, this.reqOptions);
    },
    fetchNotes() {
      console.log('fetching: ', this.obsidianRestUrl + "/search/simple/?query=" + this.searchString + "&contextLength=" + this.contextLength);
      fetch(
        this.obsidianRestUrl + "/search/simple/?query=" + this.searchString + "&contextLength=" + this.contextLength,
        this.reqOptions
      )
        .then((res) => res.json())
        .then(data => {
          browser.storage.sync.set({ results: data ? data.length : '' });
          this.notes = data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async getUrlMatches() {
      this.searchString = document.location.href;
      this.fetchNotes();
    },
    async initSearch() {
      let params = new URLSearchParams(document.location.search);
      this.searchString = params.get("q");

      // If on a search page from settings array
      if (this.searchUrls.some(url => location.origin.includes(url))) {
        browser.storage.sync.set({ status: 'search' });
        if (this.searchString) {
          this.fetchNotes();
        }
        if (this.liveSearch) {
          this.getInputElement()?.addEventListener("keyup", async (event) => {
            this.searchString = event.target.value;
            if (event.target.value && event.target.value.length > this.minChars) {
              this.fetchNotes();
            } else {
              browser.storage.sync.set({ results: 0 });
              this.notes = [];
            }
          });
        }
      }
      else {
        // If page url is not matching a search engine check inf notes contain current page URL
        this.mode = 'urlMatch';
        browser.storage.sync.set({ status: 'url' });
        addEventListener('hashchange', this.getUrlMatches);
        addEventListener('popstate', this.getUrlMatches);
        this.getUrlMatches();
      }
      console.log('Obsidian Search Initialized 🥳 mode: ' + this.mode + ', search: ' + this.searchString);
    },
    async delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  },
};
</script>

<style scoped>
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
