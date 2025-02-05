<!--suppress ALL -->
<template>
  <div
      ref="element"
      style="min-width: min(100vw, 333px);"
      class="p-3 relative mt-1 max-w-xs lg:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a
        :href="'obsidian://open?vault=' + encodeURIComponent(vaultName ?? '') + '&file=' + encodeURIComponent(name ?? '')">
      <p class="text-xs tracking-tight text-gray-700 dark:text-gray-300" v-html="path"></p>
      <h5 class="my-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
        <span v-html="highlight(name)"></span>
        <span class="font-light text-xs text-gray-700 dark:text-gray-300"> ({{
            matchesCount ?? 0
          }} matches)</span>
      </h5>
    </a>
    <div :role="store.provider === 'local-rest' ? 'button' : ''"
         @click="store.provider === 'local-rest' ? openNotePreview() : null"
         class="text-xs font-normal text-gray-700 dark:text-gray-400">
      <p class="mt-1 break-words" v-html="highlight(excerpt ?? '')">
      </p>
    </div>

    <NotePreview :vaultName="vaultName" :name="name" :filename="filename" :searchString="searchString"></NotePreview>
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {store} from "../store.js";
import NotePreview from "./NotePreview.vue";

const props = defineProps({
  filename: String,
  excerpt: String,
  matchesCount: Number,
  searchString: String,
  showMatchesCount: Number,
  vaultName: String,
});

const element = ref<HTMLElement>(null);

const name = props.filename?.split('/')[props.filename?.split('/').length - 1] ?? '';
const path = computed(() => highlight(props.filename?.replace(name, '') ?? ''))

// watchEffect(() => {
//   const showPopOver = isHovered.value && isSpecifiedKeyPressed.value;
//   if (!HTMLElement.prototype.hasOwnProperty("popover")) {
//     if(showPopOver) {
//       // @ts-ignore
//       popover.showPopover();
//     } else {
//       // @ts-ignore
//       popover.hidePopover();
//     }
//   }
// });

function openNotePreview() {
}

function regex(searchString: string): RegExp {
  // build a regex from the search string: "foo bar" => (foo|bar)
  const string = ('(' + searchString.split(' ').join('|') + ')').replace('|)', ')');
  return new RegExp(string, 'gi')
}

function highlight(string: string): string {
  if (!string) {
    return string;
  }
  return '<span>' + string.replace(regex(props.searchString ?? ''), '<span class="bg-yellow dark:bg-yellow text-black">$1</span>') + '</span>';
}
</script>

<style scoped>
@import "../style/main.css";
</style>

<style scoped>

.obsidian-search-highlight-area {
  .bg-yellow {
    --tw-bg-opacity: .8;
    background-color: rgb(255 255 51 / var(--tw-bg-opacity))
  }

  .text-black {
    --tw-text-opacity: .8;
    color: rgb(0 0 0 / var(--tw-text-opacity))
  }

  :is(.dark .dark\:bg-yellow) {
    --tw-bg-opacity: .8;
    background-color: rgb(255 255 51 / var(--tw-bg-opacity))
  }
}
</style>
