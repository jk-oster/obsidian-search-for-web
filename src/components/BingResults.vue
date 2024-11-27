<template>
    <div v-if="matches?.length !== 0">
            
      <div style="display: flex; justify-content: space-between; align-items: center">
          <h2>Obsidian Search Results</h2>
          <span>
            (<a href="#" @click.prevent="openOptionsPage()">Settings</a>)
          </span>
      </div>

      <div v-for="item of matches" class="b_algo" data-obsidian-result style="padding-bottom: 10px; padding-top: 10px;">
          
        <h2 class="b_attribution">
            <a :href="item.url" target="_blank" style="cursor: pointer;">
              <div class="b_tpcn">
                <div class="tilk" style="display: flex;">
                  <div class="tpic">
                    <div class="wr_fav">
                      <div class="cico siteicon" style="width: 32px; height: 32px;background-color: #f1f3f4; border: 1px solid #ddd; overflow: hidden;border-radius: 100%;">
                          <Logo :style="'width: 16px;height: 16px;position: absolute;border-radius: 4px;left: 9px;top: 18px;'"></Logo>
                      </div>
                    </div>
                  </div>
                  <div class="tptxt">
                    <div class="tptt">Obsidian</div>
                    <div class="tpmeta">
                      <div style="line-height: 20px; font-size: 13px;">
                        <cite>{{ item.path }}</cite>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span style="font-size: 20px;">
                {{ item.basename }}
              </span>
            </a>
        </h2>
        <p class="b_caption" style="margin-bottom: 3px;font-size: 14px;">{{item.excerpt}}</p>
      </div>
      <button style="margin-top: 0.5em; margin-bottom: 2em;" @click="showMore()">
        Show more Obsidian results
      </button>
    </div>


</template>

<script lang="ts" setup>

import Logo from "./Logo.vue";
import { ref, onMounted, watch } from "vue";
import { syncRef } from "@vueuse/core";
import { useSearch } from "../search.js";
import { NoteMatch } from "../types.js";
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