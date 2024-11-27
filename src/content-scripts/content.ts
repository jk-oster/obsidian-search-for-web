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

sendToRuntime({action: Actions.fetch, data: {url: window.location.href}}).then((data) => {
    console.log('fetched data', data);
});

const MOUNT_EL_ID = "obsidian-search-for-chrome";

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
        regex: /^https:\/\/duckduckgo\.com/,
        selector: '[data-area=sidebar]',
        component: DuckDuckGoResults
    },
    {
        regex: /^https:\/\/(www\.)?kagi\.com/,
        selector: '.right-content-box',
        component: KagiResults
    }
];

pageOptions.forEach(async (option) => {
    const mountEl = document.querySelector(option.selector);
    const embeddedResults = await getFromExtStorage('embeddedResults');

    if (option.regex.test(window.location.href) && embeddedResults) {
        console.log('Matched: ' + option.regex);
        if(!mountEl) return;
        
        const sidebar = document.createElement('div');
        sidebar.style.width = '100%';
        sidebar.id = 'obsidian-search-for-chrome-sidebar';
        mountEl.insertBefore(sidebar, mountEl.firstChild);
        createApp(option.component).mount(sidebar);
    }
})

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(OffCanvas).mount(mountEl);

// @ts-ignore
window.obsidianSearch = vm;
// @ts-ignore
// console.log(window.obsidianSearch);
