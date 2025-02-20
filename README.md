# Obsidian Web Search

![release badge](https://github.com/jk-oster/obsidian-search-for-web/actions/workflows/release.yaml/badge.svg)

>❗note that this extension requires the [Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) or [Omnisearch](https://github.com/scambier/obsidian-omnisearch) Plugin installed!

Read the [full documentation](https://jk-oster.github.io/obsidian-search-for-web).

## 🔍 Have a Evernote like search experience

For all of you who are missing the Evernote browser search extension in Obsidian - here is your solution. This extension lets you search your Obsidian Vault simultaneously as you type your search in your favourite search engine.

## ✂️ Web Clipper Companion

This extension is a perfect companion for the official [Obsidian Web Clipper Extension](https://obsidian.md/clipper). With the Official Web Clipper you can save content to your Obsidian Vault while browsing, and this extension will allow you to resurface these saved notes as you revisit the page later or type a search for it in your search engine.

## 🚀 Features

Read the full feature list [in the docs](https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html):

- ✅ LIVE SEARCH: Search your vault for notes matching your current search in e.q. the google search bar
- ✅ NOTE RECALL: Search your vault for matches of your current url while browsing
- ✅ EMBEDDED RESULTS: See your notes embedded in the search engine results
- ✅ NOTE PREVIEW: Peek into the note contents without leaving the browser
- ✅ DARK MODE: Supports dark and light mode
- ✅ PAGE NOTES: Show notifications when browsing pages that have dedicated notes in your vault
- ✅ Choose your favourite search provider Local REST API or OmniSearch Plugin
- ✅ Scroll and open your matched Obsidian notes in the sidebar
- ✅ Exclude files and folders you don't want to show up in the sidebar search

### 🛡️ Privacy

This extension just communicates between your local Obsidian REST Api and the browser.
The only data that is stored permanently in the browser are the settings including the Obsidian REST API-Key. For details read the [privacy statement](https://jk-oster.github.io/obsidian-search-for-web/privacy.html)

### 🌐 Browser compatibility



## 🚧 Test the extension

0. open your obsidian vault in the app and install either the local REST API plugin or the omnisearch plugin
1. test this extension by downloading the latest released zip file
2. extract the files
3. [install the folder from the chrome extension tab](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/)
4. open the settings tab of the extension
5. configure your search provider and input vault name in the settings
6. go to any webpage and see the number of matching notes in the extension icon

## 🏗️ Build it yourself

Clone the repository, install dependencies `npm install` (or better use `pnpm install`) and run `npm run dev` / `pnpm dev`.
This should automatically start chrome with the extension installed.

## Contact & contribution

If you need any support feel free to comment in de discussions or open up an issue.
You can also contact me though my [website](https://jakobosterberger.com/contact).
Contribution, pull requests and suggestions for improvements are very welcome.

## Credits

Thanks to the creator of the Obsidian Local REST Api Plugin @Adam Coddington for his awesome work as well as to @scambier for the obsidian-omnisearch plugin.
Furthermore, kudos to the creator of the Vite Chrome Extension Plugin for enabling fast and easy development with Vue!
Big thanks to the team of Flowbite™ for providing such awesome free Tailwind components!
