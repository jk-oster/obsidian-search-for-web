export type Color = string;
export type State = string;
export type Action = string;
export type MessageData = BadgeActionData | OpenUrlActionData;

export const Actions = {
    badge: 'badge' as Action,
    openUrl: 'open-url' as Action,
}

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


export const Colors = {
    blue: "#236dc9" as Color,
    red: "#d53032" as Color,
    yellow: "#ffe834" as Color,
    green: "#8fce00" as Color,
    gray: "#444444" as Color,
};

export const Status = {
    active: "active" as State,
    noauth: "noauth" as State,
    url: "url" as State,
    search: "search" as State,
    offline: "offline" as State,
    error: "error" as State,
    unknown: "unknown" as State,
};

export const StatusColorMapping: Record<State, Color> = {
    active: Colors.blue,
    noauth: Colors.red,
    url: Colors.yellow,
    search: Colors.green,
    offline: Colors.gray,
    error: Colors.red,
    unknown: Colors.gray,
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
    status: State,
    color: Color,
    statusText: string,
    results: string,
}