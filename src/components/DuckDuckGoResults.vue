<template>
  <LoadingSpinner class="scale-50" v-if="isLoading && paginatedResults?.length === 0"></LoadingSpinner>

  <div v-if="paginatedResults?.length !== 0" style="width: 100%;">
    <div style="margin-bottom: 1em;">
      <span class="Ee2e63EzQ9F3xq9wsGDY" style="font-size: 1.2em">
          <Logo></Logo>
          &nbsp;Obsidian results
      </span>
      <span style="font-size: 0.8em;">
          (<a title="Settings" href="#" @click.prevent="openOptionsPage()">settings</a>)
      </span>
    </div>

    <div v-for="item of paginatedResults" class="relative" data-omnisearch-result style="margin-bottom: 2rem;">

      <div>
        <a :href="item.url" style="cursor: pointer;" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
          <div>
            <span>
                <Logo></Logo>
                Obsidian
            </span>
            &nbsp;
            <span>›  {{ item.path }}</span>
          </div>
        </a>
      </div>

      <div>
        <h2 style="font-size: var(--font-size-result-title-main); padding: 0;">
          <a
              :title="item.basename"
              :href="item.url" rel="noopener noreferrer">
            {{ item.basename }}
          </a>
        </h2>
      </div>

      <div>
        <div>
          <p class="OgdwYG6KE2qthn9XQWFC">
            {{ item.excerpt }}
          </p>
        </div>
      </div>

      <NotePreview :filename="item.filename" :name="item.basename" :searchString="searchString"></NotePreview>

    </div>

    <button v-if="totalMatches > paginatedResults.length" style="margin-bottom: 1em;" @click="showMore()">
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