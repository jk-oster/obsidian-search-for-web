// @ts-ignore
import OffCanvas from "@/components/OffCanvas.vue";
import GoogleResults from "../components/GoogleResults.vue";
import { createApp } from "vue";
import BingResults from "../components/BingResults.vue";
import DuckDuckGoResults from "../components/DuckDuckGoResults.vue";
import KagiResults from "../components/KagiResults.vue";
import { sendToRuntime } from "../service";
import { Actions } from "../config";
import { getFromExtStorage } from "../store";
import { createIsolatedElement } from '@webext-core/isolated-element';
import browser from 'webextension-polyfill';


sendToRuntime({action: Actions.fetch, data: {url: window.location.href}}).then((data) => {
    // console.log('fetched data', data);
});

const pageOptions = [
    {
        regex: /^https:\/\/(www\.)?google\.com/,
        selector: '#rhs',
        component: GoogleResults
    },
    {
        regex: /^https:\/\/(www\.)?bing\.com/,
        selector: '#b_context',
        component: BingResults
    },
    {
        regex: /^https:\/\/(www\.)?duckduckgo\.com/,
        selector: '[data-area=sidebar]',
        component: DuckDuckGoResults
    },
    {
        regex: /^https:\/\/(www\.)?kagi\.com/,
        selector: '.right-content-box',
        component: KagiResults
    },
    {
        regex: /^https:\/\/(www\.)?search\.brave\.com/,
        selector: 'aside.sidebar',
        component: BraveResults,
    }
];

pageOptions.forEach(async (option) => {
    const mountEl = document.querySelector(option.selector);
    const embeddedResults = await getFromExtStorage('embeddedResults');

    if (option.regex.test(window.location.href) && embeddedResults) {
        console.log('Matched ', option);
        if(!mountEl) return;
        
        const sidebar = document.createElement('div');
        sidebar.style.width = '100%';
        sidebar.style.fontSize = '20px';
        sidebar.id = 'obsidian-browser-search-embedded-results';
        mountEl.insertBefore(sidebar, mountEl.firstChild);
        createApp(option.component).mount(sidebar);
    }
});

async function setupSidebar(){
    const { parentElement, isolatedElement } = await createIsolatedElement({
        name: 'obsidian-browser-search-sidebar',
        css: {
            url: browser.runtime.getURL('/style.css'),
        },
        isolateEvents: true, // or array of event names to isolate, e.g., ['click', 'keydown']
    });
    document.body.appendChild(parentElement);
    createApp(OffCanvas).mount(isolatedElement);
}

setupSidebar();
