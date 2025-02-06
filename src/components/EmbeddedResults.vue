<script setup lang="ts">
import {defineAsyncComponent, computed, ref, onMounted} from 'vue'
import {pageOptions} from "../config.js";
import {store, syncStoreWithExtStorage} from "../store.js";

const asyncComponents = {
  loading: defineAsyncComponent(() => import('./LoadingSpinner.vue')),
  google: defineAsyncComponent(() => import('./GoogleResults.vue')),
  bing: defineAsyncComponent(() => import('./BingResults.vue')),
  kagi: defineAsyncComponent(() => import('./KagiResults.vue')),
  duckduckgo: defineAsyncComponent(() => import('./DuckDuckGoResults.vue')),
  generic: defineAsyncComponent(() => import('./GenericResults.vue')),
};

const componentToRender = computed(() => {
  if(store.nativeResults) {
    return pageOptions.find(option => option.regex.test(window.location.href))?.name ?? 'generic';
  } else {
    return 'generic';
  }
});
const currentComponent = computed(() => {
  // @ts-ignore
  return asyncComponents[componentToRender.value]
});

onMounted(async () => {
  await syncStoreWithExtStorage();
})

</script>

<template>
  <template v-if="store.embeddedResults">
    <component :is="currentComponent"/>
  </template>
</template>

<style scoped>

</style>