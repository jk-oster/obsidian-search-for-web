import { checkApiKey } from './util.js';

// Saves options to chrome.storage
function saveSettings(event) {
    event?.preventDefault();

    chrome.storage.sync.set(
        {
            apiKey: document.getElementById("apiKey").value,
            protocol: document.getElementById("protocol").value,
            customPort: document.getElementById("customPort").checked,
            port: Number(document.getElementById("port").value),
            liveSearch: document.getElementById("liveSearch").checked,
            showInPageIcon: document.getElementById("showInPageIcon").checked,
            minChars: Number(document.getElementById("minChars").value),
            contextLength: Number(document.getElementById("contextLength").value),
            matchCount: Number(document.getElementById("matchCount").value),
            noteNumber: Number(document.getElementById("noteNumber").value),
            searchUrls: document.getElementById("searchUrls").value,
            excludes: document.getElementById("excludes").value
        },
        () => {
            // Update status to let user know options were saved.
            var status = document.getElementById("status");
            status.textContent = "Options saved.";
            setTimeout(() => status.textContent = "", 750);
        }
    );

    chrome.storage.sync.get({
        apiKey: "",
        protocol: "",
        customPort: false,
        port: "",
        liveSearch: true,
        showInPageIcon: true,
        minChars: 2,
        contextLength: 0,
        matchCount: 0,
        noteNumber: 0,
        searchUrls: '',
        excludes: ''
    }, (data) => console.log(data));
}



// Restores select box and checkbox state using the preferences stored in chrome.storage.
async function restoreSettings() {
    chrome.storage.sync.get(
        {
            apiKey: "",
            protocol: "https://127.0.0.1:27124",
            customPort: false,
            port: "27124",
            liveSearch: true,
            showInPageIcon: true,
            contextLength: 50,
            matchCount: 2,
            minChars: 2,
            noteNumber: 10,
            searchUrls: 'google.com,duckduckgo.com,bing.com,startpage.com,google.at',
            excludes: 'Assets,Template,.excalidraw'
        },
        async (data) => {
            document.getElementById("apiKey").value = data.apiKey;
            document.getElementById("protocol").value = data.protocol;
            document.getElementById("customPort").checked = data.customPort;
            document.getElementById("port").value = data.port;
            document.getElementById("liveSearch").checked = data.liveSearch;
            document.getElementById("showInPageIcon").checked = data.showInPageIcon;
            document.getElementById("minChars").value = data.minChars;
            document.getElementById("contextLength").value = data.contextLength;
            document.getElementById("matchCount").value = data.matchCount;
            document.getElementById("noteNumber").value = data.noteNumber;
            document.getElementById("searchUrls").value = data.searchUrls;
            document.getElementById("excludes").value = data.excludes;

            // Init Connection check

            const apiKey = document.getElementById('apiKey').value;
            const url = document.getElementById('protocol').value;
            const infoElem = document.getElementById('apiKeyCheck');
            infoElem.innerText = await checkApiKey(url, apiKey);
        }
    );
}

async function setStatus() {
    const apiKey = document.getElementById('apiKey').value;
    const url = document.getElementById('protocol').value;
    const infoElem = document.getElementById('apiKeyCheck');
    infoElem.innerText = await checkApiKey(url, apiKey);
}

document.addEventListener("DOMContentLoaded", () => {
    restoreSettings();
    const portElem = document.getElementById('port-container');
    chrome.storage.sync.get({ customPort: false }, (data) => {
        if (data.customPort) portElem.classList.remove('hidden');
    });
    document.getElementById('customPort'), addEventListener('change', () => {
        portElem.classList.toggle('hidden');
    })
    document.getElementById("settings").addEventListener("submit", saveSettings);
    document.getElementById('apiKey').addEventListener('change', setStatus);
    document.getElementById('apiKey').addEventListener('input', setStatus);
    document.getElementById('protocol').addEventListener('change', setStatus);
});
