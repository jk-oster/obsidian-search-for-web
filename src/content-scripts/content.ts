// @ts-ignore
import OffCanvas from "../components/OffCanvas.vue";
import {createApp} from "vue";
import {createIsolatedElement} from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';
import {useTheme} from "../theme.js";
import EmbeddedResults from "../components/EmbeddedResults.vue";
import {extensionStorage} from "../storage.js";
import {pageOptions} from "../config.js";
// @ts-ignore
import VueSplide from "@splidejs/vue-splide";

const {setColorScheme} = useTheme();

let embedded = false;
let embeddedResults: boolean|null = null;

async function setupEmbeddedResults() {
    if (embeddedResults === null) {
        embeddedResults = await extensionStorage.getItem('embeddedResults');
    }

    const matchingPage = pageOptions.find(option => option.regex.test(window.location.href));

    if (matchingPage && embeddedResults) {
        const sidebarEl = document.querySelector(matchingPage.sidebar ?? 'idontmatchanything');
        const mainEl = document.querySelector(matchingPage.main ?? 'idontmatchanything');
        const mountEl = sidebarEl ?? mainEl;

        if (mountEl) {
            embedded = true;
            const sidebar = document.createElement('div');
            sidebar.style.width = '100%';
            sidebar.style.fontSize = '20px';
            sidebar.id = 'obsidian-browser-search-embedded-results';
            mountEl?.insertBefore(sidebar, mountEl.firstChild);
            setColorScheme(sidebar).then();
            createApp(EmbeddedResults, {
                location: sidebarEl ? 'sidebar' : 'main'
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

    document.body.appendChild(parentElement);

    setColorScheme(isolatedElement).then();

    createApp(OffCanvas).mount(isolatedElement);
}

setupEmbeddedResults().then();
setupSidebar().then();
