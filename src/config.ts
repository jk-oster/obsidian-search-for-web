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
    restApiProtocol: "https://",
    restApiPort: 27124,
    provider: "local-rest", // local-rest, omni-search
    protocol: "http://",
    port: 51361,
    show: false,
    showSidebarWhenNoResults: true,
    liveSearch: true,
    showInPageIcon: true,
    showSidebarOnButtonHover: true,
    allowDraggingButton: true,
    showInPageIconWhenNoResults: true,
    sidePanelOpen: false,
    minChars: 2,
    contextLength: 50,
    matchCount: 3,
    noteNumber: 6,
    searchUrls: '',
    excludes: 'Assets,Template,.excalidraw',
    highlight: true,
    embeddedResults: true,
    highlighting: true,
    nativeResults: true,
    preferSidebarEmbeddings: true,
    theme: 'auto',

    currentUrl: '',
    searchString: '',
};

export const pageOptions = [
    {
        name: 'google',
        url: 'https://google.com',
        regex: /^https:\/\/(www\.)?google\.([a-z]{2,3})/,
        main: '#center_col',
        sidebar: '#rhs',
    },
    {
        // name: 'startpage',
        // name: 'generic',
        url: 'https://startpage.com',
        regex: /^https:\/\/(www\.)?startpage\.com/,
        // sidebar: '#sidebar', // not working -> SPA replaces content
    },
    {
        // name: 'ecosia',
        name: 'generic',
        url: 'https://ecosia.org',
        regex: /^https:\/\/(www\.)?ecosia\.org/,
        sidebar: '.sidebar',
        main: '.mainline__content'
    },
    {
        // name: 'brave',
        // name: 'generic',
        url: 'https://search.brave.com',
        regex: /^https:\/\/(www\.)?search\.brave\.com/,
        // sidebar: '.sidebar', // not working -> SPA replaces content
    },
    {
        // name: 'yandex',
        name: 'generic',
        url: 'https://yandex.com',
        regex: /^https:\/\/(www\.)?yandex\.com/,
        sidebar: '.content__right',
        main: '.content__left',
    },
    {
        // name: 'yahoo',
        name: 'generic',
        url: 'https://search.yahoo.com',
        regex: /^https:\/\/(www\.)?search\.yahoo\.com/,
        sidebar: '#right',
    },
    {
        // name: 'baidu',
        name: 'generic',
        url: 'https://baidu.com',
        regex: /^https:\/\/(www\.)?baidu\.com/,
        sidebar: '#content_right',
        main: '#content_left',
    },
    {
        // name: 'qwant',
        name: 'generic',
        url: 'https://qwant.com',
        regex: /^https:\/\/(www\.)?qwant\.com/,
        sidebar: '.is-sidebar',
        // main: '[data-testid=sectionWeb]',
    },
    {
        name: 'bing',
        url: 'https://bing.com',
        regex: /^https:\/\/(www\.)?bing\.com/,
        sidebar: '#b_context',
        main: '#b_results'
    },
    {
        name: 'duckduckgo',
        url: 'https://duckduckgo.com',
        regex: /^https:\/\/(www\.)?duckduckgo\.com/,
        sidebar: '[data-area=sidebar]',
        main: '[data-area=mainline]',
    },
    {
        name: 'kagi',
        url: 'https://kagi.com',
        regex: /^https:\/\/(www\.)?kagi\.com/,
        sidebar: '.right-content-box',
        main: '.left-content-box',
    }
];

type Feature = {
    title: string,
    titleHref?: string | null | undefined,
    imgSrc?: string | null | undefined,
    imgHref?: string | null | undefined,
    text: string,
    cta?: string | null | undefined,
    ctaHref?: string | null | undefined,
}
export const features: Feature[] = [
    {
        title: 'Live Search',
        titleHref: '#liveSearch',
        text: 'Search your vault for notes matching your current search in e.q. the google search bar.',
    },
    {
        title: 'Url Matching',
        text: 'Search your vault for matches of your current url, no matter on which page you are.'
    },
    {
        title: 'Search Sidebar',
        text: 'Scroll and open your matched Obsidian notes in the sidebar on any page.',
    },
    {
        title: 'Embedded Results',
        titleHref: '#embeddedResults',
        text: 'See your matched notes naturally embedded in the search engine results. Most popular search engines supported.',
    },
    {
        title: 'Note Preview',
        text: 'Peek into and open your notes without leaving the browser (requires Local REST Plugin).',
    },
    {
        title: 'Automatic Dark/Light Mode',
        titleHref: '#theme',
        text: 'The extension can automatically adapt to dark / light mode depending on the current page you are on.',
    },
    {
        title: 'Customizable Search',
        titleHref: '#searchUrls',
        text: 'Exclude files and folders you don\'t want to show show up in the search results.'
    },
    {
        title: 'Search Plugin Support',
        titleHref: '#vault',
        text: 'Choose between the "Omni Search" Plugin and the "Local REST" Plugin to power your Obsidian Browser Search'
    }
]