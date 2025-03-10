<template>
<!-- @vue-ignore -->
<div :class="class" class="mb-6">
    <label :for="id ?? name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
        <slot name="label">{{ label }} <a v-if="docs" class="underline text-purple-600" target="_blank" :href="docs">docs</a></slot>
    </label>
    <input v-model="model" 
        :type="type ?? 'text'" 
        :id="id ?? name" 
        :name="name"
        :placeholder="placeholder ?? ''"
        class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
    <slot>
        <span v-if="help" class="text-xs text-gray-700 dark:text-gray-400">
            {{ help }}
        </span>
    </slot>
</div>
</template>
<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

defineProps<{
    class?: string|undefined|null,
    placeholder?: string,
    type?: string,
    id?: string,
    docs?: string,
    name: string,
    label: string,
    help?: string
}>();

const model = defineModel();

</script>