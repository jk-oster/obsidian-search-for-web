<template>
<!-- @vue-ignore -->
<div :class="class" class="mb-6">
    <label :for="id ?? name" class="inline-flex relative items-center mr-5 cursor-pointer">
        <input class="sr-only peer"
            v-model="model" 
            :type="type ?? 'checkbox'" 
            :id="id ?? name" 
            :name="name"
            :checked="checked"/>
        <div
            class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
        </div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            <slot name="label">{{ label }} <a v-if="docs" class="underline text-purple-600" target="_blank" :href="docs">docs</a></slot>
        </span>
    </label>
    <div class="text-xs text-gray-700 dark:text-gray-400">
        <slot>{{ help }}</slot>
    </div>
</div>
</template>
<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

defineProps<{
    class?: string|undefined|null,
    checked?: boolean,
    type?: string,
    id?: string,
    docs?: string,
    name: string,
    label: string,
    help?: string
}>();

const model = defineModel();

</script>