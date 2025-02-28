import type {Mode, State, Color, ExtensionConfig} from "./types.js";

export const MIGRATION = '2.4.0';

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
    period: 'daily',
    dedicatedNoteNotifications: true,
    linkHoverDedicatedNoteBadge: true,
    linkHoverNoteMentions: true,
    pinHotKeyConfig: 'Alt+Shift+K',
    openPeriodicHotKeyConfig: 'Alt+Shift+D',
    appendPeriodicHotKeyConfig: 'Alt+Shift+M',
    newNoteHotKeyConfig: 'Alt+Shift+N',
    settingsHotKeyConfig: 'Alt+Shift+S',
    searchHotKeyConfig: 'Alt+Shift+F',


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
        regex: /^https:\/\/(www\.)?startpage\.([a-z]{2,3})/,
        // sidebar: '#sidebar', // not working -> SPA replaces content
    },
    {
        // name: 'ecosia',
        name: 'generic',
        url: 'https://ecosia.org',
        regex: /^https:\/\/(www\.)?ecosia\.([a-z]{2,3})/,
        sidebar: '.sidebar',
        main: '.mainline__content'
    },
    {
        // name: 'brave',
        // name: 'generic',
        url: 'https://search.brave.com',
        regex: /^https:\/\/(www\.)?search\.brave\.([a-z]{2,3})/,
        // sidebar: '.sidebar', // not working -> SPA replaces content
    },
    {
        // name: 'yandex',
        name: 'generic',
        url: 'https://yandex.com',
        regex: /^https:\/\/(www\.)?yandex\.([a-z]{2,3})/,
        sidebar: '.content__right',
        main: '.content__left',
    },
    {
        // name: 'yahoo',
        name: 'generic',
        url: 'https://search.yahoo.com',
        regex: /^https:\/\/(www\.)?search\.yahoo\.([a-z]{2,3})/,
        sidebar: '#right',
    },
    {
        // name: 'baidu',
        name: 'generic',
        url: 'https://baidu.com',
        regex: /^https:\/\/(www\.)?baidu\.([a-z]{2,3})/,
        sidebar: '#content_right',
        main: '#content_left',
    },
    {
        // name: 'qwant',
        name: 'generic',
        url: 'https://qwant.com',
        regex: /^https:\/\/(www\.)?qwant\.([a-z]{2,3})/,
        sidebar: '.is-sidebar',
        // main: '[data-testid=sectionWeb]',
    },
    {
        name: 'bing',
        url: 'https://bing.com',
        regex: /^https:\/\/(www\.)?bing\.([a-z]{2,3})/,
        sidebar: '#b_context',
        main: '#b_results'
    },
    {
        name: 'duckduckgo',
        url: 'https://duckduckgo.com',
        regex: /^https:\/\/(www\.)?duckduckgo\.([a-z]{2,3})/,
        sidebar: '[data-area=sidebar]',
        main: '[data-area=mainline]',
    },
    {
        name: 'kagi',
        url: 'https://kagi.com',
        regex: /^https:\/\/(www\.)?kagi\.([a-z]{2,3})/,
        sidebar: '.right-content-box',
        main: '.left-content-box',
    }
];

type Permission = {
    name: string,
    icon?: string,
    text: string,
};
export const permissions: Permission[] = [
    {
        name: 'storage',
        icon: '💾', 
        text: 'This is required to store your settings and preferences.'
    },
    {
        name: 'tabs',
        icon: '📑',
        text: 'Access and modify browser tabs. This is required to show the sidebar and embed search results in the page.'
    },
    {
        name: 'host permissions',
        icon: '🔗',
        text: 'Access to the current page URL. This is required to match URLs and show relevant notes.'
    }
];

type Feature = {
    title: string,
    titleHref?: string | null | undefined,
    imgSrc?: string | null | undefined,
    imgHref?: string | null | undefined,
    icon?: string | null | undefined,
    text: string,
    cta?: string | null | undefined,
    ctaHref?: string | null | undefined,
}
export const features: Feature[] = [
    {
        title: 'Instant Live Search',
        titleHref: '#liveSearch',
        icon: '⚡',
        text: 'Find your notes in a flash—just start typing, and results appear instantly, also on your favorite search engine.',
    },
    {
        title: 'Note Recall',
        icon: '💡',
        text: 'Automatically surface relevant notes when you visit websites you already have notes about!'
    },
    {
        title: 'Effortless Sidebar Access',
        icon: '📑',
        text: 'Your notes, always within reach. A collapsible sidebar lets you scroll, browse and search without switching tabs.',
    },
    {
        title: 'Embedded Search Results',
        titleHref: '#embeddedResults',
        icon: '🖥️',
        text: 'See relevant Obsidian notes directly within your searches. Most popular search engines supported.',
    },
    {
        title: 'Quick Note Preview',
        icon: '👀',
        text: 'Preview your notes and open them directly in your browser without switching context.',
    },
    {
        title: 'Adaptive Dark/Light Mode',
        titleHref: '#theme',
        icon: '🌔',
        text: 'Seamlessly matches the theme of the page you are browsing for a distraction-free experience.',
    },
    {
        title: 'Configurable Search',
        titleHref: '#searchUrls',
        icon: '🔍',
        text: 'Exclude files and folders you don\'t want to show show up in the search results.'
    },
    {
        title: 'Choose Search Provider',
        titleHref: '#vault',
        icon: '⭐',
        text: 'Choose how you search — integrates with Omnisearch and Obsidian REST API plugin to power your extension.'
    }
]