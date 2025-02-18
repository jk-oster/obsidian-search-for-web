<template>
  <svg  :class="class" stroke="currentColor"  fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 6.362A9.707 9.707 0 0 1 12 5c6.307 0 9.367 5.683 9.91 6.808.06.123.06.261 0 .385-.352.728-1.756 3.362-4.41 5.131M14 18.8a9.93 9.93 0 0 1-2 .2c-6.307 0-9.367-5.683-9.91-6.808a.44.44 0 0 1 0-.386c.219-.452.84-1.632 1.91-2.885" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="stroke-000000"></path>
    <path d="M10 9.764A3 3 0 0 1 14.236 14M3 3l18 18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="stroke-000000"></path>
  </svg>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "ClosedEye",
  props: {
    class: String
  }
});

</script>

<style scoped>
  .purple { fill: #9974F8; }
  @media (prefers-color-scheme: dark) { .purple { fill: #A88BFA; } }
</style>