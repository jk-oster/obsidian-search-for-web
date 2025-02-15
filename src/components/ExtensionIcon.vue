<template>
  <img :class="class" :style="style" :src="browser.runtime.getURL(src)" />
</template>

<script setup lang="ts">
import browser from "webextension-polyfill";

defineProps({
  class: String,
  style: String,
  src: {
    type: String,
    required: false,
    default: '/icon/icon48.png',
  }
});
</script>

<style scoped>
.purple {
  fill: #9974F8;
}

@media (prefers-color-scheme: dark) {
  .purple {
    fill: #A88BFA;
  }
}
</style>