import {store} from "./store.js";


export function useHighlight() {
    function regex(searchString: string): RegExp {
        const parts = searchString.trim().split(/\s+/).filter(Boolean)
            .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        return new RegExp('(' + parts.join('|') + ')', 'gi');
    }

    function highlight(string: string, searchString: string): string {
        if (!string || !store.highlighting || !searchString?.trim()) {
            return string;
        }
        const searchRegex = regex(searchString);
        return '<span>' + string.replace(searchRegex, '<span class="bg-yellow dark:bg-yellow text-black dark:text-white">$1</span>') + '</span>';
    }

    return {
        highlight
    }
}
