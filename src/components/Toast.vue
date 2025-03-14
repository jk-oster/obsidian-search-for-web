<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps({
  heading: {
    type: String,
    default: '',
  },
  additionalClasses: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  icon: String,
  timeout: {
    type: Number,
    default: 15000,
  },
  status: {
    type: String,
    default: '',
  }
});

const show = ref<boolean>(false);
const currentTimeout = ref<number | null>(null);

watch(() => props.text, () => {
  show.value = true;

  if(currentTimeout.value) {
    clearTimeout(currentTimeout.value);
  }
  currentTimeout.value = setTimeout(close, props.timeout);
});

function close() {
  show.value = false;
}

</script>

<template>
  <div v-if="show" class="fixed bottom-1 right-2" :class="additionalClasses"  style="z-index: 999999;">
    <div class="relative overflow-hidden flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-gray-50 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 border border-gray-100 dark:border-gray-600" role="alert">
    
      <div :style="{animation: 'timeoutbar-progress ' + Math.round(props.timeout / 1000) + 's linear forwards'}" class="top-0 left-0 absolute w-full h-[2px] bg-gray-300 dark:bg-gray-600"></div>

      <slot name="icon">

        <div v-if="status === 'success'" class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <span class="sr-only">Check icon</span>
        </div>

        <div v-if="status === 'error'" class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>

        <div v-if="status === 'warning'" class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
          </svg>
          <span class="sr-only">Warning icon</span>
        </div>

        <div v-if="status === 'refresh'" class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
          </svg>
          <span class="sr-only">Refresh icon</span>
        </div>

      </slot>

      <div :class="icon === '' || status ? 'ms-3' : ''">
        <div  class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
          <slot name="heading">{{  heading }}</slot>
        </div>
        <div class="text-xs font-normal">
          <slot name="text">{{ text }}</slot>
        </div>
      </div>

      <button @click="close()" type="button" class="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </div>

</template>

<style scoped>
@import "../style/main.css";

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-3px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(3px, 0, 0);
  }
}
</style>

<style>
@keyframes timeoutbar-progress {
    from { width: 100%; }
    to { width: 0%; }
}
</style>