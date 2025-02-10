<template>
  <LoadingSpinner class="scale-50" v-if="connectionStatus === 'search' && isLoading && paginatedResults?.length === 0"></LoadingSpinner>

  <div ref="container" v-if="paginatedResults?.length !== 0" style="width: 100%;">
    <div style="margin-bottom: 1em">
      <span style="font-size: 18px; display: flex; align-items: baseline;">
          <Logo></Logo>
          <span style="font-size: 18px; display: inline;">
            &nbspObsidian search results&nbsp
          </span>
        <span style="font-size: 12px">
          (<a @click.prevent="openOptionsPage()" class="feedback-link-btn" title="Settings" href="#">settings</a>)
        </span>
      </span>
    </div>

    <div v-for="item of paginatedResults" class="MjjYud" data-obsidian-result>
      <div class="g Ww4FFb vt6azd tF2Cxc asEBEc relative" style="width: 100%">
        <div class="N54PNb BToiNc cvP2Ce">
          <div class="kb0PBd cvP2Ce jGGQ5e">
            <div class="yuRUbf">
              <div>
                <span>
                    <a :href="item.url" style="cursor: pointer;">
                        <br/>
                        <h3 class="LC20lb MBeuO DKV0Md" style="margin-top: 18px; font-size: 20px;">{{ item.basename }}</h3>
                        <div class="notranslate TbwUpd NJjxre iUh30 ojE3Fb">
                            <div class="q0vns">
                                <span class="H9lube">
                                    <div class="eqA2re NjwKYd Vwoesf" aria-hidden="true">
                                        <Logo></Logo>
                                    </div>
                                </span>

                                <div class="CA5RN">
                                  <div>
                                    <span class="VuuXrf">Obisidan</span>
                                  </div>
                                  <div class="byrV5b">
                                    <cite  style="font-size: 12px" class="qLRx3b tjvcx GvPZzd cHaqb" role="text">{{ item.filename ? item.filename : '/' }}</cite>
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
                class="VwiC3b yXK7lf p4wth r025kc hJNv6b Hdw6tb"
                style="-webkit-line-clamp: 3"
            >
              <span> {{ item.excerpt }} </span>
            </div>
          </div>
        </div>
        <NotePreview :filename="item.filename" :name="item.basename" :searchString="searchString"></NotePreview>
      </div>
    </div>

    <button v-if="totalMatches > paginatedResults.length" style="margin-bottom: 1em;" @click="showMore()">
      Show more Obsidian results
    </button>
  </div>
</template>

<script lang="ts" setup>

import {useSearch} from "../search.js";
import Logo from "./Logo.vue";
import {getTabService} from "../background-services/TabService.js";
import LoadingSpinner from "./LoadingSpinner.vue";
import NotePreview from "./NotePreview.vue";

const tabService = getTabService();
const {connectionStatus, paginatedResults, totalMatches, displayNotesNumber, isLoading, searchString} = useSearch(true);

function showMore() {
  displayNotesNumber.value += 6;
}

function openOptionsPage() {
  tabService.openOptionsPage()
}

</script>

<style scoped>
@import "../style/main.css";

a {
  color: var(--JKqx2);
}
</style>