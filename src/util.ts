import browser from "webextension-polyfill";

export function escapeRegex(string: string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function detectColorScheme(){
    if(!window.matchMedia) {
        //matchMedia method not supported
        return '';
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        return 'dark';
    }
    return '';
}