import {Color, Status, ExtensionConfig} from "./types.js";



export const config: ExtensionConfig = {
    apiKey: "",
    vault: "",
    openObsidianUri: "obsidian://open?vault=",
    obsidianRestUrl: "127.0.0.1",
    protocol: "https://",
    port: 27124,
    show: true,
    liveSearch: true,
    showInPageIcon: true,
    sidePanelOpen: false,
    minChars: 2,
    contextLength: 50,
    matchCount: 2,
    noteNumber: 10,
    searchUrls: 'google.com,duckduckgo.com,bing.com,startpage.com,google.at',
    excludes: 'Assets,Template,.excalidraw',

    currentUrl: '',
    searchString: '',

    statusText: "❗ Make sure Obsidian is running and set your Protocol settings to connect to your Obsidian REST Api!",
    results: " ",
    status: Status.offline,
    color: Color.gray,
};
