import {extensionStorage} from "./storage.js";
import type {Theme} from "./types.js";

export function useTheme() {

    function detectPreferredColorScheme(){
        if(!window.matchMedia) {
            return 'light';
        } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return 'dark';
        }
        return 'light';
    }

    async function setColorScheme(element: HTMLElement|null, theme: Theme|null = null) {
        const themeSetting = theme ?? await extensionStorage.getItem('theme');
        if(themeSetting === 'dark' || (themeSetting === 'auto' && detectPreferredColorScheme() === 'dark')) {
            element?.classList.add('dark');
        } else {
            element?.classList.remove('dark');
        }
    }

    return {
        detectPreferredColorScheme,
        setColorScheme,
    }
}

