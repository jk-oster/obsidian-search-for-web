<template>

    <LoadingSpinner v-if="isLoading && paginatedResults?.length === 0"></LoadingSpinner>

    <template v-if="paginatedResults?.length !== 0">
            
        <div style="margin-bottom: 1em;">
            <span style="font-size: 1.2em"><Logo></Logo>&nbsp;Obsidian results</span>
            <span style="font-size: 0.8em;">
            (<a  @click.prevent="openOptionsPage()" title="Settings" href="#">settings</a>)
            </span>
        </div> 
            
        <div v-for="item of paginatedResults" class="_0_SRI search-result relative" data-highlight="" data-obsidian-result>
            <div class="_0_TITLE __sri-title">
                <h3 class="__sri-title-box">
                    <a class="__sri_title_link _0_sri_title_link _0_URL"
                    style="cursor: pointer;"
                    :title="item.basename"
                    :href="item.url" rel="noopener noreferrer">
                        {{item.basename}}
                    </a>
                </h3>
            </div>

            <div class="__sri-url-box">
                <a class="_0_URL __sri-url" :href="item.url" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
                    <div class="__sri_url_path_box">
                        <span class="host"> <Logo></Logo> Obsidian</span>&nbsp;<span class="path">› {{item.filename ? item.filename : '/'}}</span>
                    </div>
                </a>
            </div>
            <div class="__sri-body">
                <div class="_0_DESC __sri-desc">
                    <div>
                        {{item.excerpt}}
                    </div>
                </div>
            </div>
          <NotePreview :filename="item.filename" :name="item.basename" :searchString="searchString"></NotePreview>
        </div>

        <button v-if="totalMatches > paginatedResults.length" style="margin-bottom: 1em;" @click="showMore()">
            Show more Obsidian results
        </button>
                        
    </template>

</template>

<script lang="ts" setup>

import {useSearch} from "../search.js";
import Logo from "./Logo.vue";
import {getTabService} from "../background-services/TabService.js";
import LoadingSpinner from "./LoadingSpinner.vue";
import NotePreview from "./NotePreview.vue";

const tabService = getTabService();
const {paginatedResults, totalMatches, displayNotesNumber, isLoading, searchString} = useSearch(true);

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