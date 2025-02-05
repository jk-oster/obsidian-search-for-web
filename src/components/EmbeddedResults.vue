<script setup lang="ts">
import {defineAsyncComponent, computed, ref} from 'vue'
import {pageOptions} from "../config.js";

const asyncComponents = {
  loading: defineAsyncComponent(() => import('./LoadingSpinner.vue')),
  google: defineAsyncComponent(() => import('./GoogleResults.vue')),
  bing: defineAsyncComponent(() => import('./BingResults.vue')),
  kagi: defineAsyncComponent(() => import('./KagiResults.vue')),
  duckduckgo: defineAsyncComponent(() => import('./DuckDuckGoResults.vue')),
}

const componentToRender = ref<keyof typeof asyncComponents>('loading');
const currentComponent = computed(() => {
  return asyncComponents[componentToRender.value]
});
// @ts-ignore
componentToRender.value = pageOptions.find(option => option.regex.test(window.location.href))?.name ?? 'loading';

</script>

<template>
  <component :is="currentComponent"/>
</template>

<style scoped>

</style>