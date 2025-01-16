<template>
    <div v-if="matches?.length !== 0"  style="width: 100%;" class="snippet">
        <div style="margin-bottom: 1em;">
            <span style="font-size: 1.2em">
                <Logo></Logo>
                &nbsp;Obsidian results
            </span>
            <span style="font-size: 0.8em;">
                (<a title="Settings" href="#"  @click.prevent="openOptionsPage()">settings</a>)
            </span>
        </div>
    
        <div v-for="item of matches" data-omnisearch-result style="margin-bottom: 2rem;">

            <div class="heading-serpresult">
                <div>
                    <a :href="item.url" style="cursor: pointer;" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
                        <div>
                            <span>
                                <Logo></Logo>
                                Obsidian
                            </span>
                            &nbsp;
                            <span>›  {{item.path}}</span>
                        </div>
                    </a>
                </div>
    
                <div>
                    <h2 style="font-size: var(--font-size-result-title-main); padding: 0;">
                        <a
                        :title="item.basename"
                        :href="item.url" rel="noopener noreferrer">
                            {{item.basename}}
                        </a>
                    </h2>
                </div>
            </div>

            <div class="snippet-content-secondary">
                <div>
                    <p>
                        {{item.excerpt}}
                    </p>
                </div>
            </div>
        </div>

        <button style="margin-bottom: 1em;" @click="showMore()">
            Show more Obsidian results
        </button>
    </div>


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