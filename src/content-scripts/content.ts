// @ts-ignore
import OffCanvas from "../components/OffCanvas.vue";
import {createApp} from "vue";
import {createIsolatedElement} from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';
import {detectPreferredColorScheme, setColorScheme, getColorSchemeBasedOnChildBgColor, getColorSchemeBasedOnParentBgColor} from "../theme.js";
import EmbeddedResults from "../components/EmbeddedResults.vue";
import {extensionStorage} from "../storage.js";
import {pageOptions} from "../config.js";
// @ts-ignore
import VueSplide from "@splidejs/vue-splide";

let embedded = false;
let embeddedResults: boolean|null = null;
let preferSidebarEmbeddings: boolean|null = true;
async function setupEmbeddedResults() {
    if (embeddedResults === null) {
        embeddedResults = await extensionStorage.getItem('embeddedResults');
    }
    preferSidebarEmbeddings = await extensionStorage.getItem('preferSidebarEmbeddings');

    const matchingPage = pageOptions.find(option => option.regex.test(window.location.href));

    if (matchingPage && embeddedResults) {
        const sidebarEl = document.querySelector(matchingPage.sidebar ?? 'idontmatchanything');
        const mainEl = document.querySelector(matchingPage.main ?? 'idontmatchanything');
        const mountEl = preferSidebarEmbeddings && sidebarEl ? sidebarEl : mainEl;

        if (mountEl) {
            embedded = true;
            const sidebar = document.createElement('div');
            sidebar.style.width = '100%';
            sidebar.style.fontSize = '20px';
            sidebar.style.fontStyle = 'normal';
            sidebar.style.fontFamily = 'Arial, Inter, Helvetica, sans-serif';
            sidebar.style.maxWidth = preferSidebarEmbeddings && sidebarEl ? '400px' : '100%';
            sidebar.id = 'obsidian-browser-search-embedded-results';
            mountEl?.insertBefore(sidebar, mountEl.firstChild);

            const themeSetting = await extensionStorage.getItem('theme');
            const bgScheme = getColorSchemeBasedOnParentBgColor(mountEl);
            if (!themeSetting || themeSetting === 'auto' || themeSetting === 'device') {
                setColorScheme(mountEl, bgScheme);
            } else if (themeSetting === 'light') {
                setColorScheme(mountEl, 'light');
            } else if (themeSetting === 'dark') {
                setColorScheme(mountEl, 'dark');
            }

            createApp(EmbeddedResults, {
                location: preferSidebarEmbeddings && sidebarEl ? 'sidebar' : 'main'
                // @ts-ignore
            }).use(VueSplide).mount(sidebar);
            console.log('[Obsidian Browser Search] injected embedded search results');
        }
    }

    // Retry embedding results if it is dynamically rendered app
    if (!embedded && embeddedResults && !!matchingPage) {
        setTimeout(() => setupEmbeddedResults(), 500);
    }
}

async function setupSidebar() {
    const {parentElement, isolatedElement} = await createIsolatedElement({
        name: 'obsidian-browser-search-sidebar',
        css: {
            url: browser.runtime.getURL('/style.css'),
        },
        isolateEvents: true, // or array of event names to isolate, e.g., ['click', 'keydown']
    });

    isolatedElement.style.fontSize = '14px';
    isolatedElement.style.fontStyle = 'normal';
    isolatedElement.style.fontFamily = 'Arial, Inter, Helvetica, sans-serif';

    document.body.appendChild(parentElement);

    const themeSetting = await extensionStorage.getItem('theme');
    const bgScheme = getColorSchemeBasedOnChildBgColor(document.body);
    const deviceScheme = detectPreferredColorScheme();
    if (!themeSetting || themeSetting === 'auto') {
        setColorScheme(isolatedElement, bgScheme);
    } else if (themeSetting === 'device') {
        setColorScheme(isolatedElement, deviceScheme);
    } else if (themeSetting === 'light') {
        setColorScheme(isolatedElement, 'light');
    } else if (themeSetting === 'dark') {
        setColorScheme(isolatedElement, 'dark');
    }

    createApp(OffCanvas).mount(isolatedElement);
}

setupEmbeddedResults().then();
setupSidebar().then();
