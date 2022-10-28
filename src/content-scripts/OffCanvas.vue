<template>
  <!-- <button v-if="!show" class="popup-button absolute right-1 top-1 rounded-full" @click="show = true">
    <div class="relative">
      <img src="../assets/obsidian32.png" alt="Show Obsidian Search">
      <span v-if="notes?.length"
        class="absolute top-6 -right-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 rounded dark:bg-blue-200 dark:text-blue-800">
        {{ notes.length }}
      </span>
    </div>
  </button> -->
  <div
    :class="(showPopup ? 'translate-x-0 ' : 'translate-x-full ') + ' max-h-screen popup-container fixed duration-300 ease-in-out right-0 top-0 dark bg-gray-900 p-2 rounded overflow-auto'">
    <div class="flex justify-between">
      <button v-if="mode != 'urlMatch'" @click="searchInObsidianGui"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Open Search in Obsidian
      </button>
      <button @click="show = false"
        class="py-1.5 px-3 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Hide
      </button>
    </div>
    <div v-if="mode != 'urlMatch'" @click="searchInObsidianGui"
      class="text-xs tracking-tight text-gray-700 dark:text-gray-300 mb-2">
      Searching for: "{{ searchString }}", {{ notes.length }} results
    </div>
    <div class="highlight-area">
      <Card v-for="note of computedNotes" :key="note.score" :filename="note.filename" :matches="note.matches"
        :showMatchesCount="showMatchesCount" :searchString="searchString"></Card>
    </div>
    <button v-if="notes?.length > 6" @click="numberOfNotes = numberOfNotes + 6"
      class="text-white mt-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Show more results</button>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
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
            "Bearer 3bd4d08075867557b5a563f7161f6da343e0d865c6ba2c819c575e197c6665be",
        },
      },
      searchString: '',
      contextLength: 50,
      numberOfNotes: 10,
      liveSearch: true,
      searchUrls: [
        'google.com', 'duckduckgo.com'
      ],
      mode: 'search',
      excludes: [
        'Assets', 'Template', '.excalidraw'
      ],
      obsidianRestUrl: 'http://127.0.0.1:27123',
      show: true,
      showMatchesCount: 2,
    };
  },
  computed: {
    showPopup() {
      return this.notes?.length > 0 && this.searchString?.length > 2 && this.show;
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

      return filteredNotes.slice(0, this.numberOfNotes) ?? [];
    },
  },
  created() {

    // listen to event for changes from saved data in storage
    chrome.storage.onChanged.addListener((data, namespace) => {
      console.log(data);
      if (data.show) {
        this.show = data.show.newValue;
      }
    });

    chrome.storage.sync.get({ show: true }, (data) => this.show = data?.show ?? true);

    fetch(this.obsidianRestUrl + "/", { method: 'GET', headers: this.reqOptions.headers })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status == 'OK' && data.authenticated) {
          this.initSearch();
        }
        else {
          this.mode = 'noauth';
          chrome.storage.sync.set({ status: 'noauth', results: 'x' });
          console.warn('Could not connect to obsidian REST Api 😢 Please start Obsidian first and check your settings!', data)
        };
      }).catch(e => {
        this.mode = 'offline';
        chrome.storage.sync.set({ status: 'offline', results: 'off' });
        console.warn('💎 Start Obsidian or check your URL settings to see search results!', e);
      });
  },
  methods: {
    getInputElement() {
      const input = document.querySelector("input[aria-label=Suche]") ?? document.querySelector("input[name=q]");
      if (!input) console.warn('No search input element detected 😢');
      return input;
    },
    searchInObsidianGui() {
      const searchValue = encodeURIComponent("file:(" + this.searchString + ")  OR line:(" + this.searchString + ")");
      fetch(this.obsidianRestUrl + "/search/gui/?query=" + searchValue, this.reqOptions);
    },
    async fetchNotes() {
      console.log('fetching: ', this.obsidianRestUrl + "/search/simple/?query=" + this.searchString + "&contextLength=" + this.contextLength);
      this.notes = await fetch(
        this.obsidianRestUrl + "/search/simple/?query=" + this.searchString + "&contextLength=" + this.contextLength,
        this.reqOptions
      ).then((res) => res.json())
        .then(data => {
          chrome.storage.sync.set({ results: this.notes ? this.notes.length : '' });
          return data;
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
        chrome.storage.sync.set({ status: 'search' });
        if (this.searchString) {
          this.fetchNotes();
        }
        if (this.liveSearch) {
          this.getInputElement()?.addEventListener("keyup", async (event) => {
            this.searchString = event.target.value;
            if (event.target.value && event.target.value.length > 2) {
              this.fetchNotes();
            } else {
              chrome.storage.sync.set({ results: 0 });
              this.notes = [];
            }
          });
        }
      }
      else {
        // If page url is not matching a search engine check inf notes contain current page URL
        this.mode = 'urlMatch';
        chrome.storage.sync.set({ status: 'url' });
        addEventListener('hashchange', () => this.getUrlMatches());
        this.getUrlMatches();
      }
      console.log('Obsidian Search Initialized 🥳 mode: ' + this.mode + ', search: ' + this.searchString);
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
