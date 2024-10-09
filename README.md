[![Create Release Build](https://github.com/jk-oster/obsidian-search-for-web/actions/workflows/release.yaml/badge.svg)](https://github.com/jk-oster/obsidian-search-for-web/actions/workflows/release.yaml)

>❗note that this extension is still experimental - furthermore this extension requires the Obsidian REST API Plugin!

# Obsidian Web Search
## 🔍 Have a Evernote like search experience
For all of you who are missing the Evernote browser search extension in Obsidian - here is your solution. This extension lets you search your Obsidian Vault simultaneously as you type your search in your favourite search engine.

## 🚀 Features
- ✅ LIVE SEARCH: Search your vault for notes matching your current search in e.q. the google search bar
- ✅ URL MATCHING: Search your vault for matches of your current url while browsing
- ✅ Scroll and open your matched Obsidian notes in the sidebar
- ✅ Exclude files and folders you don't want to show show up in the sidebar search
- ✅ Customize how much context you want to see

### 🛡️ Privacy
This extension just communicates between your local Obsidian REST Api and the browser. The only data that is stored permanently in the browser are the settings including the Obsidian REST API-Key.

### 🌐 Browser compatibility
This extension has been tested with Chrome on Windows to be working. By using the webextension-polyfill library of mozilla.org it should also be compatible with Firefox though.

## 🚧 Test the extension
>❗note that this extension is still experimental - furthermore this extension requires the Obsidian REST API Plugin!
1. test it by downloading the released zip file
2. extracting the files
3. [installing the folder from the chrome extension tab](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/)
4. open the settings tab of the extension
5. insert the obsidian REST API key and input vault name
6. go to any webpage and see the number of matching notes in the extension icon

## 🏗️ Build it yourself
Clone the repository, install dependencies `npm install` (or better use `pnpm install`) and run `npm build` / `pnpm build` and choose the *dist* folder als target when installing the extension in the chrome extensions tab.

## Contact & contribution
If you need any support feel free to comment in de discussions or open up an issue. You can also contact me though my [website](https://jakobosterberger.com/contact). Contribution, pull requests and suggestions for improvements are very welcome.

## Credits
Thank's to the creator of the Obsidian Local REST Api Plugin @Adam Coddington for his awesome work. Furthermore, kodos to the creator of the Vite Chrome Extension Plugin for enabeling fast and easy development with Vue! Big thanks to the team of Flowbite™ for providing such awesome free Tailwind components!
