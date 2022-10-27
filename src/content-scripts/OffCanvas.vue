<template>
  <div v-if="computedNotes?.length > 0 && searchString?.length > 2"
    class="popup-container absolute right-5 top-36 dark bg-gray-900 p-2 rounded">
    <button @click="searchInObsidianGui"
      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Open
      Search in Obsidian</button>
    <div class="text-xs tracking-tight text-gray-700 dark:text-gray-300 mb-2">
      Searching for: "{{ searchString }}", {{ notes.length }} results
    </div>
    <div class="highlight-area">
      <Card v-for="note of computedNotes" :key="note.score" :filename="note.filename" :matches="note.matches"
        :searchString="searchString"></Card>
    </div>
    <button v-if="notes?.length > 6" @click="numberOfNotes = numberOfNotes + 6"
      class="ext-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Show more results</button>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  components: [Card],
  data() {
    return {
      filterFn: (note) =>
        !note.filename.includes("Assets") &&
        !note.filename.includes(".excalidraw") &&
        !note.filename.includes("Template"),
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
      numberOfNotes: 6,
    };
  },
  computed: {
    computedNotes() {
      const filteredNotes = this.notes?.filter(this.filterFn) ?? [];

      const match = this.searchString?.toLowerCase();

      filteredNotes?.sort((a, b) => {
        const aIndexMatch = a.filename.toLowerCase().indexOf(match);
        const bIndexMatch = b.filename.toLowerCase().indexOf(match);
        if (aIndexMatch > bIndexMatch) return -1;
        if (aIndexMatch < bIndexMatch) return 1;
        return 0;
      });

      return filteredNotes.slice(0, this.numberOfNotes);
    },
  },
  async created() {
    let params = new URLSearchParams(document.location.search);
    this.searchString = params.get("q");
    if (this.searchString) {
      this.notes = await fetch(
        "http://127.0.0.1:27123/search/simple/?query=" +
        this.searchString +
        "&contextLength=" + this.contextLength,
        this.reqOptions
      ).then((res) => res.json());
    }

    document.querySelector("input[aria-label=Suche]")?.addEventListener("keyup", async (event) => {
      this.searchString = event.target.value;
      if (event.target.value && event.target.value.length > 2) {
        this.notes = await fetch(
          "http://127.0.0.1:27123/search/simple/?query=" +
          this.searchString +
          "&contextLength=" + this.contextLength,
          this.reqOptions
        ).then((res) => res.json());
      } else {
        this.notes = [];
      }
    });
  },
  methods: {
    searchInObsidianGui() {
      const searchValue = encodeURIComponent("file:(" + this.searchString + ")  OR line:(" + this.searchString + ")");
      fetch("http://127.0.0.1:27123/search/gui/?query=" + searchValue, this.reqOptions);
    },
  },
};
</script>

<style scoped>
.popup-container {
  z-index: 99999;
}
</style>
