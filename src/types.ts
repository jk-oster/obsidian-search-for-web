export type Color = string;
export type State = string;
export type Action = string;
export type Mode = string;
export type Theme = 'auto' | 'light' | 'dark';
export type SearchProvider = 'local-rest' | 'omni-search';
export type MessageData = BadgeActionData | OpenUrlActionData;

export interface Message<A, T> {
    action: A;
    data?: T;
}

export type BadgeActionData = {
    text?: string;
    status?: State;
    statusText?: string;
}
export type BadgeAction = Message<'badge', BadgeActionData>;

export type OpenUrlActionData = {
    url: string;
}
export type OpenUrlAction = Message<'open-url', OpenUrlActionData>;

export type FetchActionData = {
    url: string;
    options?: object;
}
export type FetchAction = Message<'fetch', FetchActionData>;

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

export type Command = {
    id: string;
    name: string;
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
    obsidianRestUrl: string,
    protocol: 'https://' | 'http://',
    provider: SearchProvider,
    port: number,
    show: boolean,
    liveSearch: boolean,
    sidePanelOpen: boolean,
    showInPageIcon: boolean,
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
    theme: Theme,

    currentUrl: string,
    searchString: string,

    status: State,
    color: Color,
    statusText: string,
    results: string,
}