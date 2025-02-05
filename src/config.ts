import {Mode, Action, State, Color, ExtensionConfig} from "./types.js";

export const SearchModes = {
    search: 'search' as Mode,
    urlMatch: 'urlMatch' as Mode,
}

export const Actions = {
    badge: 'badge' as Action,
    openUrl: 'open-url' as Action,
    openOptionsPage: 'open-options-page' as Action,
    fetch: 'fetch' as Action,
}

export const Colors = {
    blue: '#236dc9' as Color,
    red: '#d53032' as Color,
    yellow: '#ffe834' as Color,
    green: '#8fce00' as Color,
    gray: '#444444' as Color,
};

export const Status = {
    active: 'active' as State,
    noauth: 'noauth' as State,
    url: 'url' as State,
    search: 'search' as State,
    offline: 'offline' as State,
    error: 'error' as State,
    unknown: 'unknown' as State,
};

export const StatusColorMapping: Record<State, Color> = {
    active: Colors.green,
    noauth: Colors.yellow,
    url: Colors.green,
    search: Colors.green,
    offline: Colors.gray,
    error: Colors.red,
    unknown: Colors.gray,
};

export const config: ExtensionConfig = {
    version: "",
    apiKey: "",
    vault: "",
    openObsidianUri: "obsidian://open?vault=",
    obsidianRestUrl: "127.0.0.1",
    protocol: "https://",
    provider: "local-rest", // local-rest, omni-search
    port: 27124,
    show: true,
    liveSearch: true,
    showInPageIcon: true,
    sidePanelOpen: false,
    minChars: 2,
    contextLength: 50,
    matchCount: 2,
    noteNumber: 6,
    searchUrls: 'google.com,duckduckgo.com,bing.com,startpage.com,google.at,search.brave.com,kagi.com',
    excludes: 'Assets,Template,.excalidraw',
    highlight: true,
    embeddedResults: true,
    theme: 'auto',

    currentUrl: '',
    searchString: '',

    statusText: "❗ Make sure Obsidian is running and set your Protocol settings to connect to your Obsidian REST Api!",
    results: " ",
    status: Status.offline,
    color: Colors.gray,
};

export const pageOptions = [
    {
        name: 'google',
        regex: /^https:\/\/(www\.)?google\.com/,
        selector: '#rhs',
    },
    {
        name: 'bing',
        regex: /^https:\/\/(www\.)?bing\.com/,
        selector: '#b_context',
    },
    {
        name: 'duckduckgo',
        regex: /^https:\/\/(www\.)?duckduckgo\.com/,
        selector: '[data-area=sidebar]',
    },
    {
        name: 'kagi',
        regex: /^https:\/\/(www\.)?kagi\.com/,
        selector: '.right-content-box',
    }
];