import type {Mode, State, Color, ExtensionConfig} from "./types.js";

export const MIGRATION = '2.0.0';

export const SearchModes = {
    search: 'search' as Mode,
    urlMatch: 'urlMatch' as Mode,
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
    version: MIGRATION,
    apiKey: "",
    vault: "",
    openObsidianUri: "obsidian://open?vault=",
    restApiPort: 27124,
    restApiProtocol: "https://",
    obsidianRestUrl: "127.0.0.1",
    protocol: "https://",
    provider: "local-rest", // local-rest, omni-search
    port: 27124,
    show: false,
    showSidebarWhenNoResults: true,
    liveSearch: true,
    showInPageIcon: true,
    showInPageIconWhenNoResults: true,
    sidePanelOpen: false,
    minChars: 2,
    contextLength: 50,
    matchCount: 2,
    noteNumber: 6,
    searchUrls: 'google.com,duckduckgo.com,bing.com,startpage.com,ecosia.org,google.at,search.brave.com,kagi.com,yandex.com,qwant.com,search.yahoo.com,baidu.com',
    excludes: 'Assets,Template,.excalidraw',
    highlight: true,
    embeddedResults: true,
    highlighting: true,
    nativeResults: true,
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
        main: '#center_col',
        sidebar: '#rhs',
    },
    // {
    //     // name: 'startpage',
    //     name: 'generic',
    //     regex: /^https:\/\/(www\.)?startpage\.com/,
    //     sidebar: '#sidebar',
    // },
    {
        // name: 'ecosia',
        name: 'generic',
        regex: /^https:\/\/(www\.)?ecosia\.org/,
        sidebar: '.sidebar',
        main: '.mainline__content'
    },
    // {
    //     // name: 'brave',
    //     name: 'generic',
    //     regex: /^https:\/\/(www\.)?search\.brave\.com/,
    //     sidebar: '.sidebar',
    // },
    {
        // name: 'yandex',
        name: 'generic',
        regex: /^https:\/\/(www\.)?yandex\.com/,
        sidebar: '.content__right',
        main: '.content__left',
    },
    {
        // name: 'yahoo',
        name: 'generic',
        regex: /^https:\/\/(www\.)?search\.yahoo\.com/,
        sidebar: '#right',
    },
    {
        // name: 'baidu',
        name: 'generic',
        regex: /^https:\/\/(www\.)?baidu\.com/,
        sidebar: '#content_right',
        main: '#content_left',
    },
    {
        // name: 'qwant',
        name: 'generic',
        regex: /^https:\/\/(www\.)?qwant\.com/,
        sidebar: '.is-sidebar',
        main: '[data-testid="sectionWeb"',
    },
    {
        name: 'bing',
        regex: /^https:\/\/(www\.)?bing\.com/,
        sidebar: '#b_context',
        main: '#b_results'
    },
    {
        name: 'duckduckgo',
        regex: /^https:\/\/(www\.)?duckduckgo\.com/,
        sidebar: '[data-area=sidebar]',
        main: '[data-area=mainline]',
    },
    {
        name: 'kagi',
        regex: /^https:\/\/(www\.)?kagi\.com/,
        sidebar: '.right-content-box',
        main: '.left-content-box',
    }
];