<template>
  <svg :class="class" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#ffffff" stroke-miterlimit="10" class="stroke-1d1d1b"><circle cx="16" cy="16.6" r="2.8"></circle><path
      d="M26.1 17.9v-2.5l-3.1-.9c-.1-.4-.3-.8-.5-1.2l1.6-2.9-1.8-1.8-2.9 1.6c-.4-.2-.8-.3-1.2-.5l-.9-3.1h-2.5l-.9 3.1c-.4.1-.8.3-1.2.5L9.8 8.6 8 10.4l1.6 2.9c-.2.4-.4.8-.5 1.2l-3.1.9v2.5l3.1.9c.1.4.3.8.5 1.2L8 22.8l1.8 1.8 2.8-1.6c.4.2.8.4 1.2.5l.9 3.1h2.5l.9-3.1c.4-.1.8-.3 1.2-.5l2.8 1.6 1.8-1.8-1.5-2.8c.2-.4.4-.8.5-1.2l3.2-.9z"></path></g></svg>
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