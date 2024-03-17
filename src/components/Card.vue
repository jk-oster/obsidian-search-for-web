<template>
  <div
      class="ob-p-3 ob-mt-1 ob-max-w-xs ob-lg:max-w-sm ob-bg-white ob-rounded-lg ob-border ob-border-gray-200 ob-shadow-md dark:ob-bg-gray-800 dark:ob-border-gray-700">
    <a
        :href="'obsidian://advanced-uri?vault=' + encodeURIComponent(vaultName) + '&filepath=' + encodeURIComponent(filename)">
      <p class="ob-text-xs ob-tracking-tight ob-text-gray-700 dark:ob-text-gray-300" v-html="path"></p>
      <h5 class="ob-mb-1 ob-text-sm ob-font-semibold ob-tracking-tight ob-text-gray-900 dark:ob-text-white">
        <span v-html="highlight(name)"></span>
        <span class="ob-font-light ob-text-xs ob-text-gray-700 dark:ob-text-gray-300"> ({{
            matches.length
          }} matches)</span>
      </h5>
    </a>
    <div class="ob-text-xs ob-font-normal ob-text-gray-700 dark:ob-text-gray-400">
      <p class="ob-mt-1 ob-break-words" v-for="match of computedMatches" :key="match.match.start"
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
    searchString: String,
    showMatchesCount: Number,
    vaultName: String
  },
  data() {
    return {
      name: this.filename.split('/')[this.filename.split('/').length - 1],

    };
  },
  computed: {
    computedMatches(): any[] {
      return this.matches.slice(0, this.showMatchesCount);
    },
    path(): string {
      return this.highlight(this.filename.replace(this.name, ''));
    },
  },
  methods: {
    regex(searchString: string): string {
      const string = ('(' + searchString.split(' ').join('|') + ')').replace('|)', ')');
      return new RegExp(string, 'gi')
    },
    highlight(string: string): string {
      return '<span>' + string.replace(this.regex(this.searchString), '<span class="bg-yellow dark:bg-yellow text-black">$1</span>') + '</span>';
    }
  },
});
</script>

<style scoped>
@import "../style/main.css";
</style>

<style>
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
</style>
