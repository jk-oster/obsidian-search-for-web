<template>
    <!-- @vue-ignore -->
    <div :id="id" :class="class" class="markdown prose prose-slate dark:prose-invert"  v-html="renderedMarkdown"></div>
</template>
<script setup lang="ts">
import { marked } from 'marked';
import { defineProps, computed, useSlots } from 'vue';

const props = defineProps<{
    markdown?: string;
    class?: string;
    id?: string;
}>();

const slots = useSlots();
// @ts-ignore
const children = slots?.default()[0].children;
// console.log(children);

const renderedMarkdown = computed(() => {
    // @ts-ignore
    return marked(props.markdown ?? children?.split('\n').map((s: string) => s.trim()).join('\n') ?? '');
});

</script>