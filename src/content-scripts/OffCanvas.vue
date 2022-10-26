<template>
  <div v-if="computedNotes" class="popup-container absolute right-5 top-5">
    <button @click="searchInObsidianGui">Open Search in Obsidian</button>
    <Card
      v-for="note of computedNotes"
      :key="note.score"
      :filename="note.filename"
      :matches="note.matches"
    ></Card>
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
    };
  },
  computed: {
    computedNotes() {
      return this.notes?.filter(this.filterFn).slice(0, 5);
    },
  },
  async created() {
    let params = new URLSearchParams(document.location.search);
    let searchValue = params.get("q");
    if (searchValue) {
      this.notes = await fetch(
        "http://127.0.0.1:27123/search/simple/?query=" +
          searchValue +
          "&contextLength=30",
        this.reqOptions
      ).then((res) => res.json());
    }

    document
      .querySelector("input[aria-label=Suche]")
      .addEventListener("keyup", async (event) => {
        if (event.target.value) {
          this.notes = await fetch(
            "http://127.0.0.1:27123/search/simple/?query=" +
              event.target.value +
              "&contextLength=30",
            this.reqOptions
          ).then((res) => res.json());
        } else {
          this.notes = [];
        }
      });
  },
  methods: {
    searchInObsidianGui() {
      const searchValue = document.querySelector("input[aria-label=Suche]")
        .value;
      const serachString = encodeURIComponent(
        "file:(" + searchValue + ")  OR line:(" + searchValue + ")"
      );
      fetch(
        "http://127.0.0.1:27123/search/gui/?query=" + serachString,
        this.reqOptions
      );
    },
  },
};
</script>

<style scoped>
.popup-container {
  z-index: 99999;
}
</style>
