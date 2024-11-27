<template>

    <div v-if="matches?.length !== 0" style="width: 100%;">
        <div style="margin-bottom: 1em">
            <span style="font-size: 18px">
                <Logo></Logo>
                &nbspObsidian search results</span>
            <span style="font-size: 12px"> (<a @click.prevent="openOptionsPage()" class="feedback-link-btn" title="Settings" href="#">settings</a>)</span>
        </div>
    
        <div v-for="item of matches" class="MjjYud" data-obsidian-result>
            <div class="g Ww4FFb vt6azd tF2Cxc asEBEc" style="width: 100%">
                <div class="N54PNb BToiNc cvP2Ce">
                    <div class="kb0PBd cvP2Ce jGGQ5e">
                        <div class="yuRUbf">
                            <div>
                                <span>
                                    <a :href="item.url" style="cursor: pointer;"><br />
                                        <h3 class="LC20lb MBeuO DKV0Md">{{item.basename}}</h3>
                                        <div class="notranslate TbwUpd NJjxre iUh30 ojE3Fb">
                                            <div class="q0vns">
                                                <span class="H9lube">
                                                    <div class="eqA2re NjwKYd Vwoesf" aria-hidden="true">
                                                        <Logo></Logo>
                                                    </div>
                                                </span>
                                                <div>
                                                    <span class="VuuXrf">Obsidian</span>
                                                    <div class="byrV5b">
                                                    <cite class="qLRx3b tjvcx GvPZzd cHaqb" role="text">
                                                        <span class="dyjrff ob9lvb" role="text">
                                                        {{item.path}}
                                                        </span>
                                                    </cite>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="kb0PBd cvP2Ce">
                        <div
                            class="VwiC3b yXK7lf lyLwlc yDYNvb W8l4ac lEBKkf"
                            style="-webkit-line-clamp: 3"
                        >
                            <span> {{item.excerpt}} </span>
                        </div>
                    </div>
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