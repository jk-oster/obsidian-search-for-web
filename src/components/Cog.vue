<template>
  <svg :class="class" fill="none" stroke="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 21H10L9.44904 18.5206C8.7879 18.2618 8.17573 17.9053 7.63028 17.4689L5.20573 18.232L3.20573 14.7679L5.07828 13.0503C5.02673 12.7077 5 12.357 5 12C5 11.643 5.02673 11.2923 5.07828 10.9496L3.20573 9.23204L5.20574 5.76794L7.6303 6.53106C8.17575 6.09467 8.78791 5.73819 9.44904 5.47935L10 3H14L14.551 5.47935C15.2121 5.73819 15.8242 6.09466 16.3697 6.53104L18.7942 5.76794L20.7942 9.23204L18.9217 10.9496C18.9733 11.2922 19 11.643 19 12C19 12.357 18.9733 12.7078 18.9217 13.0504L20.7942 14.7679L18.7942 18.232L16.3697 17.4689C15.8243 17.9053 15.2121 18.2618 14.551 18.5206L14 21Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
  </svg>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "Cog",
  props: {
    class: String
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