<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "OpenEye",
  props: {
    class: String
  }
});
</script>

<template>
  <svg :class="class" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
</template>

<style scoped>

</style>