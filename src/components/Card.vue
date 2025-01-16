<template>
  <div 
      style="min-width: min(100vw, 333px);"
      class="p-3 mt-1 max-w-xs lg:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a rel="noreferrer"
        :href="'obsidian://open?vault=' + encodeURIComponent(vaultName ?? '') + '&file=' + encodeURIComponent(name ?? '')">
      <p class="text-xs tracking-tight text-gray-700 dark:text-gray-300" v-html="path"></p>
      <h5 class="my-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
        <span v-html="highlight(name)"></span>
        <span class="font-light text-xs text-gray-700 dark:text-gray-300"> ({{
           matchesCount ?? 0
          }} matches)</span>
      </h5>
    </a>
    <div class="text-xs font-normal text-gray-700 dark:text-gray-400">
      <p class="mt-1 break-words" v-html="highlight(excerpt ?? '')">
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Card",

  props: {
    filename: String,
    excerpt: String,
    matchesCount: Number,
    searchString: String,
    showMatchesCount: Number,
    vaultName: String
  },
  data() {
    return {
      name: this.filename?.split('/')[this.filename?.split('/').length - 1] ?? '',
    };
  },
  computed: {
    path(): string {
      return this.highlight(this.filename?.replace(this.name, '') ?? '');
    },
  },
  methods: {
    regex(searchString: string): RegExp {
      // build a regex from the search string: "foo bar" => (foo|bar)
      const string = ('(' + searchString.split(' ').join('|') + ')').replace('|)', ')');
      return new RegExp(string, 'gi')
    },
    highlight(string: string): string {
      if (!string) {
        return string;
      }
      return '<span>' + string.replace(this.regex(this.searchString ?? ''), '<span class="bg-yellow dark:bg-yellow text-black">$1</span>') + '</span>';
    }
  },
});
</script>

<style scoped>
@import "../style/main.css";
</style>

<style>
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
