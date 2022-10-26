<template>
    <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{filename}}</h5>
    </a>
    <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <p class="mb-1" v-for="match of computedMatches" :key="match.match.start">{{match.context}}</p>
    </div>
</div>
</template>

<script>
export default {
    props: {
        filename: String,
        matches: Array,
    },
    computed: {
        computedMatches() {
            return this.matches.slice(0, 1);
        }
    }
}
</script>