<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Pin",
  props: {
    class: String
  }
});
</script>

<template>
  <svg :class="class" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" stroke="none"/><path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6"/><line x1="12" x2="12" y1="16" y2="21"/><line x1="8" x2="16" y1="4" y2="4"/>
  </svg>
</template>

<style scoped>

</style>