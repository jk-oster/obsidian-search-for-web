<template>
  <div
      class="p-3 mt-1 max-w-xs lg:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a
        :href="'obsidian://advanced-uri?vault=' + encodeURIComponent(vaultName ?? '') + '&filepath=' + encodeURIComponent(filename ?? '')">
      <p class="text-xs tracking-tight text-gray-700 dark:text-gray-300" v-html="path"></p>
      <h5 class="mb-1 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
        <span v-html="highlight(name)"></span>
        <span class="font-light text-xs text-gray-700 dark:text-gray-300"> ({{
           matchesCount ?? matches?.length ?? 0
          }} matches)</span>
      </h5>
    </a>
    <div class="text-xs font-normal text-gray-700 dark:text-gray-400">
      <p class="mt-1 break-words" v-for="match of computedMatches" :key="match.match.start"
         v-html="highlight(match.context)">
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
    matches: Array,
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
    computedMatches(): any[] {
      return this.matches?.slice(0, this.showMatchesCount) ?? [];
    },
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
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 51 / var(--tw-bg-opacity))
  }
  
  .text-black {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity))
  }
  
  :is(.dark .dark\:bg-yellow) {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 51 / var(--tw-bg-opacity))
  }
}
</style>
