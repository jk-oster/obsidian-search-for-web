<script setup lang="ts">
import {defineAsyncComponent, computed, ref, onMounted} from 'vue'
import {pageOptions} from "../config.js";
import {store} from "../store.js";

const asyncComponents = {
  loading: defineAsyncComponent(() => import('./LoadingSpinner.vue')),
  google: defineAsyncComponent(() => import('./GoogleResults.vue')),
  bing: defineAsyncComponent(() => import('./BingResults.vue')),
  kagi: defineAsyncComponent(() => import('./KagiResults.vue')),
  duckduckgo: defineAsyncComponent(() => import('./DuckDuckGoResults.vue')),
  generic: defineAsyncComponent(() => import('./GenericResults.vue')),
};

const componentToRender = ref<keyof typeof asyncComponents>('loading');
const currentComponent = computed(() => {
  return asyncComponents[componentToRender.value]
});

onMounted(() => {
  if(store.nativeResults) {
    // @ts-ignore
    componentToRender.value = pageOptions.find(option => option.regex.test(window.location.href))?.name ?? 'generic';
  } else {
    componentToRender.value = 'generic';
  }
})

</script>

<template>
  <component :is="currentComponent"/>
</template>

<style scoped>

</style>