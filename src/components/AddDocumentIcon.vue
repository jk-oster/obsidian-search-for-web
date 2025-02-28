<script setup lang="ts">
defineProps<{
  class: string|undefined|null
}>()
</script>

<template>
  <!-- @vue-ignore -->
  <svg :class="class" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.cls-1{fill:currentColor;}</style></defs><path class="cls-1" d="M20.535,7.122,14.879,1.464A4.981,4.981,0,0,0,13.462.487c-.035-.018-.066-.04-.1-.055A4.984,4.984,0,0,0,11.343,0H6A4,4,0,0,0,2,4V20a4,4,0,0,0,4,4H18a4,4,0,0,0,4-4V10.657a4.968,4.968,0,0,0-.433-2.016.85.85,0,0,0-.055-.1A4.976,4.976,0,0,0,20.535,7.122ZM18.586,8H16a2,2,0,0,1-2-2V3.414ZM20,20a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V4A2,2,0,0,1,6,2h5.343A3,3,0,0,1,12,2.078V6a4,4,0,0,0,4,4h3.92a2.953,2.953,0,0,1,.08.657Z"/><path class="cls-1" d="M13,15H11V13a1,1,0,0,0-2,0v2H7a1,1,0,0,0,0,2H9v2a1,1,0,0,0,2,0V17h2a1,1,0,0,0,0-2Z"/>
</svg>
</template>

<style scoped>

</style>