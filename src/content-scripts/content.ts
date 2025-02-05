// @ts-ignore
import OffCanvas from "../components/OffCanvas.vue";
import {createApp} from "vue";
import {getFromExtStorage} from "../store.js";
import {createIsolatedElement} from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';
import {useTheme} from "../theme.js";
import EmbeddedResults from "../components/EmbeddedResults.vue";
import {extensionStorage} from "../storage.js";
import {pageOptions} from "../config.js";

const {setColorScheme} = useTheme();

async function setupEmbeddedResults() {
    const embeddedResults = await extensionStorage.getItem('embeddedResults');

    for (const option of pageOptions) {
        const mountEl = document.querySelector(option.selector);

        if (option.regex.test(window.location.href) && embeddedResults) {
            console.log('Matched ', option);
            if (!mountEl) continue;

            const sidebar = document.createElement('div');
            sidebar.style.width = '100%';
            sidebar.style.fontSize = '20px';
            sidebar.id = 'obsidian-browser-search-embedded-results';
            mountEl.insertBefore(sidebar, mountEl.firstChild);
            setColorScheme(sidebar).then();

            createApp(EmbeddedResults).mount(sidebar);
        }
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
