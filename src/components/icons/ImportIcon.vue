<script lang="ts" setup>
defineProps<{
  class: string|undefined|null
}>()
</script>

<template>
    <!-- @vue-ignore -->
  <svg :class="class" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"><path d="m6.5.5h-4c-1.1045695 0-2 .8954305-2 2v10c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-10"/><path d="m10.5 7.5-3 3-3-3"/><path d="m14.5.5h-4c-1.65685425 0-3 1.34314575-3 3v7"/></g>
  </svg>
</template>