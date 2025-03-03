<template>
  <div class="results-card p-3 relative mt-2 w-full bg-white rounded-[.5em] border border-gray-100 dark:bg-gray-900 dark:border-gray-700">
    <a class="flex justify-start items-center"
        @click="openNotePreview"
        :href="item.url">
      <div v-if="showIcon"
            class="rounded-full p-1.5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        <span style="font-size: 16px;">
          <Logo></Logo>
        </span>
      </div>

      <div>
        <p v-if="item.filename" class="text-xs leading-none tracking-tight text-gray-900 dark:text-gray-100" v-html="highlight(item.filename ?? '', searchString)"></p>
        <div class="my-1 text-sm leading-none tracking-tight text-gray-700 dark:text-white hover:underline">
          <span class="text-md font-semibold" v-html="highlight(item.basename ?? '', searchString)"></span>
          <span class="font-light text-xs text-gray-900 dark:text-gray-100"> ({{
              item.matchesCount ?? 0
            }} matches)</span>
        </div>
      </div>

    </a>
    <div class="text-xs font-normal text-gray-600 dark:text-gray-400">
      <p class="mt-1 break-words obsidian-search-highlight-area" v-html="highlight(item.excerpt ?? '', searchString)">
      </p>
    </div>

    <a v-if="canPreview"
       class="open-link absolute top-2 right-2 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
       title="Open Note in Obsidian"
       :href="item.url">
      <OpenLink class="w-4 h-4"></OpenLink>
    </a>

    <NotePreview v-if="canPreview"
                 ref="notePreview"
                 :url="item.url"
                 :name="item.basename"
                 :filename="item.filename"
                 :searchString="searchString">
    </NotePreview>

  </div>

</template>

<script setup lang="ts">
import NotePreview from "./NotePreview.vue";
import {useHighlight} from "../highlighter.js";
import Logo from "./icons/Logo.vue";
import {ref} from "vue";
import OpenLink from "./icons/OpenLink.vue";
import type {NoteMatch} from "../types.js";

const props = defineProps<{
  item: NoteMatch
  searchString: string,
  showMatchesCount?: number,
  vaultName: string,
  highlighting: boolean|undefined,
  showIcon: boolean|undefined,
  canPreview: boolean,
}>();

const {highlight} = useHighlight();

const notePreview = ref<HTMLElement | null>(null);

function openNotePreview(event: Event) {
  if(props.canPreview && notePreview.value) {
    event.preventDefault();
    // @ts-ignore
    notePreview.value.openNotePreview();
  }
}

</script>

<style scoped>
@import "../style/main.css";
</style>

<style>

.obsidian-search-highlight-area {
  .bg-yellow {
    background-color: rgba(240, 210, 110, 0.9);
  }
  /*
  rgb(255 255 51
  rgb(237, 217, 152)
  rgb(250, 237, 150)
  */
  .open-link {
    visibility: hidden;
  }

  .results-card:hover {
    .open-link {
      visibility: visible;
    }
  }

  .text-black {
    --tw-text-opacity: .7;
    color: rgb(0 0 0 / var(--tw-text-opacity))
  }

  :is(.dark .dark\:bg-yellow) {
    background-color: rgba(230, 190, 100, 0.8);
  }

  :is(.dark .dark\:text-white) {
    color: #ffffff;
  }
}
</style>
