<template>
  <LoadingSpinner v-if="connectionStatus === 'search' && isLoading && paginatedResults?.length === 0"></LoadingSpinner>

  <div v-if="paginatedResults?.length !== 0" class="w-full leading-1 mb-5" style="font-size: 16px;">

    <div class="flex items-center justify-start w-full my-3">
      <span style="font-size: 20px;">
          <Logo></Logo>
      </span>
      <h2 style="padding: 0;" class="my-0 mr-1 p-0 text-lg leading-1 text-gray-900 dark:text-white">&nbspObsidian Search Results&nbsp</h2>
      <span style="padding: 0;" class="my-0 p-0 text-xs leading-1 text-gray-600 dark:text-gray-400">
            (<a href="#" @click.prevent="openOptionsPage()">Settings</a>)
      </span>
    </div>

    <div class="obsidian-search-highlight-area w-full">
      <template v-if="layout === 'slider'">
        <Splide :options="{rewind: false, perPage: perPage, perMove: perPage, omitEnd: true}">
          <template v-for="note of searchResults" :key="note.score">
            <SplideSlide>
              <ResultCard :item="note"
                    :canPreview="isRestApiConnected"
                    :showMatchesCount="store.matchCount"
                    :searchString="store.searchString"
                    :highlighting="store.highlighting ?? false"
                    :vaultName="store.vault"
                    :showIcon="false">
              </ResultCard>
            </SplideSlide>
          </template>
        </Splide>
      </template>
      <template v-else>
        <template v-for="note of paginatedResults" :key="note.score">
          <ResultCard :item="note"
                :canPreview="isRestApiConnected"
                :showMatchesCount="store.matchCount"
                :searchString="store.searchString"
                :highlighting="store.highlighting ?? false"
                :vaultName="store.vault"
                :showIcon="false">
          </ResultCard>
        </template>
      </template>
    </div>

    <button type="button"
            class="px-3 py-2 text-xs text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-[.5em] me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            v-if="totalMatches > paginatedResults.length && layout !== 'slider'"
            @click="showMore()">
      Show more Obsidian results
    </button>
  </div>


</template>


<script lang="ts" setup>

import {useSearch} from "../search.js";
import Logo from "./Logo.vue";
import {getTabService} from "../background-services/TabService.js";
import LoadingSpinner from "./LoadingSpinner.vue";
import ResultCard from "./ResultCard.vue";
import {useStore} from "../store.js";

const store = useStore();

defineProps({
  layout: {
    type: String,
    default: 'slider',
  },
  perPage: {
    type: Number,
    default: 2
  }
});

const tabService = getTabService();
const {connectionStatus, isRestApiConnected, paginatedResults, totalMatches, searchResults, displayNotesNumber, isLoading} = useSearch(true);

function showMore() {
  displayNotesNumber.value += 6;
}

function openOptionsPage() {
  tabService.openOptionsPage()
}

</script>

<style scoped>
@import "../style/main.css";

.obsidian-search-highlight-area .p-3 {
  padding: 0.75em !important;
}
</style>
<style>
@import url("../../node_modules/@splidejs/vue-splide/dist/css/splide.min.css");
@import url("../../node_modules/@splidejs/vue-splide/dist/css/themes/splide-default.min.css");

.splide__arrow:disabled {
  display: none;
}
.splide__arrow--next {
  right: -1em;
}
.splide__arrow--prev {
  left: -1em;
}
.splide__pagination {
  bottom: -1.125em;
}
</style>