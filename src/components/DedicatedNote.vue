<template>

    <div v-if="(badgeShowDelay || hoveredLink) && dedicatedNote" class="absolute bg-transparent" :style="style">
        <a :href="dedicatedNoteUrl" class="flex items-center p-1 pr-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white">
            <!-- @vue-ignore -->
            <div class="flex items-center justify-center mr-2 rounded-md py-1 leading-none" :style="{backgroundColor: isValidHex(dedicatedNote.frontmatter?.['web-badge-color'] ?? '') ? dedicatedNote.frontmatter?.['web-badge-color'] : '#ffffff00'}">
                <div class="text-xs">
                     <!-- @vue-ignore -->
                     {{ dedicatedNote.frontmatter?.['web-badge-icon'] ?? '' }}
                 </div>
            </div>
            <div class="hover:underline">
                <!-- @vue-ignore -->
                {{dedicatedNote.frontmatter?.['web-badge-message'] ?? dedicatedNote.path}}
            </div>
        </a>
    </div>
    
    <Toast 
        :text="currentPageDedicatedNote?.path" 
        status="success" 
        :timeout="30000">
        <template v-slot:icon>
            <!-- @vue-ignore -->
            <div class="flex items-center justify-center mr-2 py-2 px-1 rounded-md leading-none" :style="{backgroundColor: isValidHex(currentPageDedicatedNote.frontmatter?.['web-badge-color'] ?? '') ? currentPageDedicatedNote.frontmatter?.['web-badge-color'] : '#ffffff00'}">
                <div class="text-lg">
                     <!-- @vue-ignore -->
                     {{ currentPageDedicatedNote.frontmatter?.['web-badge-icon'] ?? '🗒️' }}
                 </div>
            </div>
        </template>
        <template v-slot:heading>
            <div class="mr-2">
                <a :href="currentDedicatedNoteUrl" class="underline font-normal">
                    {{currentPageDedicatedNote?.path}}
                </a>
            </div>
        </template>
        <template v-slot:text>
            <div>
                <!-- @vue-ignore -->
                {{currentPageDedicatedNote?.frontmatter?.['web-message'] ?? currentPageDedicatedNote?.stat.mtime}}
            </div>
        </template>
    </Toast>

</template>

<script setup lang="ts">
import { useMouse, whenever } from '@vueuse/core';
import { useHoveredLink } from '../hoveredLink.js';
import Toast from './Toast.vue';
import { useDedicatedNote } from '../dedicatedNote.js';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { Note } from '../types.js';
import { useStore } from '../store.js';

const store = useStore();
const { x, y } = useMouse();
const {hoveredLink} = useHoveredLink();
const {searchForDedicatedNotes, debouncedFetchDedicatedNotes, dedicatedNote, searchString} = useDedicatedNote();
const badgeShowDelay = ref(false);

const dedicatedNoteUrl = computed(() => {
    return `obsidian://open?vault=${store.vault ?? ''}&file=${dedicatedNote.value?.path ?? ''}`;
});

const style = ref({
    left: (25 + x.value) + 'px',
    top: (y.value - 25) + 'px',
});

const isValidHex = (hex: string) => /^#[0-9A-F]{6}$/i.test(hex);

whenever(hoveredLink, async () => {
    if (searchString.value === hoveredLink.value) {
        return;
    }

    dedicatedNote.value = null;
    badgeShowDelay.value = false;
    clearTimeout(showTimeout);

    style.value = {
        left: (x.value + 25) + 'px',
        top: (y.value - 25) + 'px',
    };
    searchForDedicatedNotes(hoveredLink.value ?? '');
});

let showTimeout: number = 0;
watchEffect(() => {
    if (hoveredLink.value && dedicatedNote.value) {
        badgeShowDelay.value = true;
        clearTimeout(showTimeout);
        showTimeout = setTimeout(() => {
            badgeShowDelay.value = false;
        }, 3000);
    }
});

const currentPageDedicatedNote = ref<Note|null>(null);

const currentDedicatedNoteUrl = computed(() => {
    return `obsidian://open?vault=${store.vault ?? ''}&file=${currentPageDedicatedNote.value?.path ?? ''}`;
});

onMounted(() => {
    setTimeout(async() => {
        currentPageDedicatedNote.value = await searchForDedicatedNotes(document.location.href ?? '');
    }, 1000);
});

</script>

<style scoped>
@import "../style/main.css";
</style>