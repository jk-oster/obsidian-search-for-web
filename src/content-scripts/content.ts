// @ts-ignore
import OffCanvas from "../components/OffCanvas.vue";
import {createApp} from "vue";
import {getFromExtStorage} from "../store.js";
import {createIsolatedElement} from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';
import GoogleResults from "../components/GoogleResults.vue";
import BingResults from "../components/BingResults.vue";
import DuckDuckGoResults from "../components/DuckDuckGoResults.vue";
import KagiResults from "../components/KagiResults.vue";

const pageOptions = [
    {
        name: 'google',
        regex: /^https:\/\/(www\.)?google\.com/,
        selector: '#rhs',
        component: GoogleResults
    },
    {
        name: 'bing',
        regex: /^https:\/\/(www\.)?bing\.com/,
        selector: '#b_context',
        component: BingResults
    },
    {
        name: 'duckduckgo',
        regex: /^https:\/\/(www\.)?duckduckgo\.com/,
        selector: '[data-area=sidebar]',
        component: DuckDuckGoResults
    },
    {
        name: 'kagi',
        regex: /^https:\/\/(www\.)?kagi\.com/,
        selector: '.right-content-box',
        component: KagiResults
    }
];

pageOptions.forEach(async (option) => {
    const mountEl = document.querySelector(option.selector);
    const embeddedResults = await getFromExtStorage('embeddedResults');

    if (option.regex.test(window.location.href) && embeddedResults) {
        console.log('Matched ', option);
        if (!mountEl) return;

        const sidebar = document.createElement('div');
        sidebar.style.width = '100%';
        sidebar.style.fontSize = '20px';
        sidebar.id = 'obsidian-browser-search-embedded-results';
        mountEl.insertBefore(sidebar, mountEl.firstChild);
        createApp(option.component).mount(sidebar);
    }
});

async function setupSidebar() {
    const {parentElement, isolatedElement} = await createIsolatedElement({
        name: 'obsidian-browser-search-sidebar',
        css: {
            url: browser.runtime.getURL('/style.css'),
        },
        isolateEvents: true, // or array of event names to isolate, e.g., ['click', 'keydown']
    });

    document.body.appendChild(parentElement);

    console.log(parentElement);
    createApp(OffCanvas).mount(isolatedElement);
}

setupSidebar().then();
