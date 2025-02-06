<template>
  <LoadingSpinner v-if="isLoading && paginatedResults?.length === 0"></LoadingSpinner>
  <div v-if="paginatedResults?.length !== 0" class="w-full leading-1 mb-5" style="font-size: 16px;">

    <div class="flex items-center justify-start w-full my-3">
      <span style="font-size: 20px;">
          <Logo></Logo>
      </span>
      <h2 style="padding: 0;" class="my-0 mr-1 p-0 text-lg leading-1 text-gray-900 dark:text-white">&nbspObsidian Search Results&nbsp</h2>
      <span class="my-0 p-0 text-xs leading-1 text-gray-600 dark:text-gray-400">
            (<a href="#" @click.prevent="openOptionsPage()">Settings</a>)
      </span>
    </div>

    <div class="obsidian-search-highlight-area w-full">
      <template v-for="note of paginatedResults" :key="note.score">
        <Card :filename="note.filename"
              :basename="note.basename"
              :path="note.path"
              :excerpt="note.excerpt"
              :matchesCount="note.matchesCount ?? 0"
              :showMatchesCount="store.matchCount"
              :searchString="store.searchString"
              :highlighting="store.highlighting ?? false"
              :vaultName="store.vault"
              :showIcon="false">
        </Card>
      </template>
    </div>

    <button type="button"
            class="px-3 py-2 text-xs text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            v-if="totalMatches > paginatedResults.length"
            @click="showMore()">
      Show more Obsidian results
    </button>
  </div>


</template>


<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useSearch} from "../search.js";
import Logo from "./Logo.vue";
import {getTabService} from "../background-services/TabService.js";
import LoadingSpinner from "./LoadingSpinner.vue";
import NotePreview from "./NotePreview.vue";
import {useTheme} from "../theme";
import {store} from "../store";
import Card from "./Card.vue";

const tabService = getTabService();
const {paginatedResults, totalMatches, initSearch, displayNotesNumber, isLoading, searchString} = useSearch(true);

onMounted(async () => {
  await initSearch();
});

function showMore() {
  displayNotesNumber.value += 6;
}

function openOptionsPage() {
  tabService.openOptionsPage()
}

</script>

<style scoped>
@import "../style/main.css";
</style>