# Obsidian Web Search
## 🔍 Have a Evernote like search experience
For all of you who are missing the Evernote browser search extension in Obsidian - here is your solution. This extension lets you search your Obsidian Vault simultaneously as you type your search in your favourite search engine.

## 🚀 Features
- ✅ LIVE SEARCH: Search your vault for notes matching your current search in e.q. the google search bar
- ✅ URL MATCHING: Search your vault for matches of your current url
- ✅ Scroll and open your matched Obsidian notes in the sidebar
- ✅ Exclude files and folders you don't want to show show up in the sidebar search
- ✅ Customize how much context you want to see

### 🛡️ Privacy
This extension just communicates between your local Obsidian REST Api and the browser. The only data that is stored permanently in the browser are the settings you find below. Feel free to check out the code base on GitHub

### 🌐 Browser compatibility
This extension has been tested with Chrome and Firefox to be working.

## 🚧 Test the extension
❗note that this extension is still experimental - furthermore this extension requires the Obsidian REST API Plugin!
1. test it by downloading the released zip file
2. extracting the files
3. [installing the folder from the chrome extension tab](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/)
4. open the settings tab of the extension
5. insert the obsidian REST API key

## 🏗️ Build it yourself
Clone the repository and run `yarn build` and choose the *dist* folder als target when installing the extension in the chrome extensions tab.

## Contact & contribution
If you need any support you can contact me though my website. Contribution, pull requests and suggestions for improvements are very welcome.

## Credits
Thank's to the creator of the Obsidian Local REST Api Plugin @Adam Coddington for his awesome work. Furthermore, kodos to the creator of the Vite Chrome Extension Plugin for enabeling fast and easy development with Vue! Big thanks to the team of Flowbite™ for providing such awesome free Tailwind components!
