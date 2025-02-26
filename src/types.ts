export type Color = string;
export type State = string;
export type Mode = string;
export type Theme = 'device' | 'auto' | 'light' | 'dark';
export type SearchProvider = 'local-rest' | 'omni-search';
export type SearchMode = 'search' | 'urlMatch';
export type PreviewOpenMode = 'append' | 'preview' | 'edit';
export type PreviewType = 'vault' | 'periodic';
export type Period = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type AcceptHeader = 'application/vnd.olrapi.note+json' | 'text/markdown';
export type ContentTypeHeader = 'application/vnd.olrapi.dataview.dql+txt' | 'application/vnd.olrapi.jsonlogic+json' | 'application/json';

export type OmniSearchNoteMatch = {
    score: number
    vault: string
    path: string
    basename: string
    foundWords: string[]
    matches: SearchMatchApi[]
    excerpt: string
}

type SearchMatchApi = {
    match: string
    offset: number
}

export interface LocalRestNoteMatch {
    filename: string;
    score: number;
    matchesCount?: number;
    matches: {
        match: {
            start: number;
            end: number;
        };
        context: string;
    }[];
}

export interface Note {
    content: string,
    frontmatter: {},
    path: string,
    stat: {
        ctime: number,
        mtime: number,
        size: number
    },
    tags: string[]
}

export interface NoteMatch {
    filename: string;
    path: string;
    basename: string;
    score: number;
    matchesCount: number;
    excerpt: string;
    url: string;
}

export interface ApiError {
    message: string,
    errorCode: number
}

export interface ExtensionConfig {
    version: string,
    apiKey: string,
    vault: string,
    openObsidianUri: string,
    protocol: 'https://' | 'http://',
    restApiProtocol: 'https://' | 'http://',
    provider: SearchProvider,
    port: number,
    restApiPort: number,
    show: boolean,
    showSidebarOnButtonHover: boolean,
    allowDraggingButton: boolean,
    showSidebarWhenNoResults: boolean,
    liveSearch: boolean,
    sidePanelOpen: boolean,
    showInPageIcon: boolean,
    showInPageIconWhenNoResults: boolean,
    minChars: number,
    contextLength: number,
    matchCount: number,
    noteNumber: number,
    searchUrls: string,
    excludes: string,
    highlight: boolean,
    embeddedResults: boolean,
    highlighting: boolean,
    nativeResults: boolean,
    preferSidebarEmbeddings: boolean,
    theme: Theme,
    period: Period,
    dedicatedNoteNotifications: boolean,
    linkHoverDedicatedNoteBadge: boolean,
    linkHoverNoteMentions: boolean,

    currentUrl: string,
    searchString: string,
}