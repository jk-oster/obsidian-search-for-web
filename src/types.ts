export type Color = string;
export type State = string;
export type Action = string;
export type Mode = string;
export type SearchProvider = 'local-rest' | 'omni-search';
export type MessageData = BadgeActionData | OpenUrlActionData;

export interface Message<T> {
    action: Action;
    data?: T;
}

export type BadgeActionData = {
    text?: string;
    status?: State;
    statusText?: string;
}
export type BadgeAction = Message<BadgeActionData>;

export type OpenUrlActionData = {
    url: string;
}
export type OpenUrlAction = Message<OpenUrlActionData>;

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

export interface ApiError {
    message: string,
    errorCode: number
}

export interface ExtensionConfig {
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

    currentUrl: string,
    searchString: string,

    status: State,
    color: Color,
    statusText: string,
    results: string,
}