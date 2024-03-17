export enum MessageAction {
    BADGE = 'badge',
    OPEN_URL = 'open-url',
}

export interface Message {
    action: MessageAction;
    data?: any;
}

export enum Color {
    blue = "#236dc9",
    red = "#d53032",
    yellow = "#ffe834",
    green = "#8fce00",
    gray = "#444444",
};

export enum Status {
    active = "active",
    noauth = "noauth",
    url = "url",
    search = "search",
    offline = "offline",
};


export interface NoteMatch {
    filename: string;
    score: number;
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
    protocol: string,
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
    status: Status,
    color: Color,
    statusText: string,
    results: string,
}