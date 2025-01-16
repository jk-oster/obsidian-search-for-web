<template>

    <template v-if="matches?.length !== 0">
            
        <div style="margin-bottom: 1em;">
            <span style="font-size: 1.2em"><Logo></Logo>&nbsp;Obsidian results</span>
            <span style="font-size: 0.8em;">
            (<a  @click.prevent="openOptionsPage()" title="Settings" href="#">settings</a>)
            </span>
        </div> 
            
        <div v-for="item of matches" class="_0_SRI search-result" data-highlight="" data-obsidian-result>
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
                        <span class="host"> <Logo></Logo> Obsidian</span>&nbsp;<span class="path">› {{item.path}}</span>
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
        </div>

        <button style="margin-bottom: 1em;" @click="showMore()">
            Show more Obsidian results
        </button>
                        
    </template>

</template>

<script lang="ts" setup>

import { ref, onMounted, watch } from "vue";
import { syncRef } from "@vueuse/core";
import { useSearch } from "../search.js";
import { NoteMatch } from "../types.js";
import Logo from "./Logo.vue";
import { openOptionsPage } from "../service.js";

const matches = ref<NoteMatch[]>([]);
const displayNotesCount = ref<number>(6);

onMounted(async () => {
  const {paginatedResults, initSearch, displayNotesNumber} = await useSearch();
  watch(paginatedResults, (value) => {
    // @ts-ignore
    matches.value = value;
  });
  syncRef(displayNotesNumber, displayNotesCount);
  await initSearch();
});

function showMore() {
  displayNotesCount.value += 6;
}

</script>