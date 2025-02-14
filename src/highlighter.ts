import {useStore} from "./store.js";


export function useHighlight() {
    const store = useStore();

    function regex(searchString: string): RegExp {
        // build a regex from the search string: "foo bar" => (foo|bar)
        const string = ('(' + searchString.split(' ').join('|') + ')').replace('|)', ')');
        return new RegExp(string, 'gi')
    }

    function highlight(string: string, searchString: string): string {
        if (!string || !store.highlighting) {
            return string;
        }
        const searchRegex = regex(searchString ?? '');
        return '<span>' + string.replace(searchRegex, '<span class="bg-yellow dark:bg-yellow text-black dark:text-white">$1</span>') + '</span>';
    }

    return {
        highlight
    }
}