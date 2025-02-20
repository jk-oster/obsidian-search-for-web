---
editLink: true
---

# FAQ and Troubleshooting

> [!warning] Work in Progress 🏗️
> This page is a work in progress. If you don't find an answere to your questions here or in the [guide](./feature-guide.md), feel free to [reach out](https://jakobosterberger.com/contact) or to open up an [issue on github](https://github.com/jk-oster/obsidian-search-for-web/issues)!

## How can I troubleshoot connection problems between Obsidian Browser Search and Obsidian Local REST API?

In general, connection between Obsidian Browser Search and the Obsidian Local REST API are quite simple to set up. Usually it is just a matter of entering the API Key in the correct field, but sometimes things don't go smoothly.

See [this discussion](https://github.com/coddingtonbear/obsidian-web/discussions/174#discussioncomment-8740665) by [@coddingtonbear](https://github.com/coddingtonbear) for steps you can take to troubleshoot connection errors.

## How do I get my browser trust my Obsidian Local REST API certificate?

[@coddingtonbear](https://github.com/coddingtonbear) has written an [extensive guide](https://github.com/coddingtonbear/obsidian-web/wiki/How-do-I-get-my-browser-trust-my-Obsidian-Local-REST-API-certificate%3F) about this issue. Look it up to find out how to get it to work.

## How do I ask Chrome to update extensions immediately?

Chrome will automatically update extensions as updates are approved via the Chrome Web Store review process, but that takes time. If you know the version shown on the Chrome Web store (see [here](https://chromewebstore.google.com/detail/obsidian-browser-search/ikdemlfoilfdmcdiegelchlhfnkpmaee)) is newer than the version you currently have installed, you can easily tell your browser to download updates immediately.

To do that:

1. Go to [chrome://extensions/](chrome://extensions/)
2. Click the "Update" button shown near the upper-left corner of the browser window.

That's it!

## How do I build my own version of Obsidian Brwoser Search?

### For the Webdevelopers

Clone the repository, install dependencies `npm install` (or better use `pnpm install`) and run `npm run dev` / `pnpm dev`. This should automatically start chrome with the extension installed.

### New to Programming?

...coming soon...

## How do I test the latest extension version from Github?

0. open your obsidian vault in the app and install either the local REST API plugin or the omnisearch plugin
1. test this extension by downloading the [latest released](https://github.com/jk-oster/obsidian-search-for-web/releases) zip file
2. extract the files
3. [install the folder from the chrome extension tab](https://bashvlas.com/blog/install-chrome-extension-in-developer-mode/)
4. open the settings tab of the extension
5. configure your search provider and input vault name in the settings
6. go to any webpage and see the number of matching notes in the extension icon

## Is Obsidian Browser Search also available for Firefox?

**Short answer**: Not yet.

**Long answer**: For now the extension is being developed and tested for Chrome on Windows only. By using the [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) library of mozilla.org it is aiming for Firefox compatibility. However, there are still a few things to clear up and implement before Firefox is fully supported.
