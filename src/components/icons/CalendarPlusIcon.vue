<script setup lang="ts">
defineProps<{
  class: string|undefined|null
}>()
</script>

<template>
  <!-- @vue-ignore -->
  <svg :class="class" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11,14 L11,11 L13,11 L13,14 L16,14 L16,16 L13,16 L13,19 L11,19 L11,16 L8,16 L8,14 L11,14 Z M20,8 L20,5 L18,5 L18,6 L16,6 L16,5 L8,5 L8,6 L6,6 L6,5 L4,5 L4,8 L20,8 Z M20,10 L4,10 L4,20 L20,20 L20,10 Z M18,3 L20,3 C21.1045695,3 22,3.8954305 22,5 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,5 C2,3.8954305 2.8954305,3 4,3 L6,3 L6,2 L8,2 L8,3 L16,3 L16,2 L18,2 L18,3 Z" fill-rule="evenodd"/>
  </svg>
</template>

<style scoped>

</style>