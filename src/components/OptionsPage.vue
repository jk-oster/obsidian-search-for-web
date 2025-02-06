<template>
  <header>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
          <img src="/icon/icon48.png" class="mr-3 h-6 sm:h-9" alt=""/>
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Obsidian Web
                        Search</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <img class="w-6 h-6" aria-hidden="true" src="/icon/icon48.png"/>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
              class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#about"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
            </li>
            <li>
              <a href="#core-settings"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Core
                Settings</a>
            </li>
            <li>
              <a href="#display-settings"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Display
                Settings</a>
            </li>
            <li>
              <a href="#contact"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex justify-center dark:bg-gray-900 py-20 px-4">
    <div class="max-w-2xl dark:text-white text-base">
      <h1 id="about"
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Obsidian Web Search
      </h1>

      <h2 class="text-4xl mb-6 font-extrabold dark:text-white">
        Have a Evernote like search experience - but BETTER and with Obsidian
      </h2>
      <p>
        For all of you who are missing the Evernote browser search
        extension in Obsidian - here is your solution. This extension lets you search
        your Obsidian Vault simultaneously as you type your search in your
        favourite search engine.
      </p>
      <h3 class="my-2 text-xl font-semibold text-gray-900 dark:text-white">
        Features
      </h3>
      <ul class="space-y-1 max-w-lg list-inside text-gray-500 dark:text-gray-400">
        <li class="flex items-center">
          <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          LIVE SEARCH: Search your vault for notes matching your current search in e.q. the google search bar
        </li>
        <li class="flex items-center">
          <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          URL MATCHING: Search your vault for matches of your current url, no matter on which page you are.
        </li>
        <li class="flex items-center">
          <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          SIDEBAR: Scroll and open your matched Obsidian notes in the sidebar on any page.
        </li>
        <li class="flex items-center">
          <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          NOTE PREVIEW: Peek into and open your notes without leaving the browser (requires Local REST Plugin).
        </li>
        <li class="flex items-center">
          <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          CUSTOMIZABEL SEARCH: Exclude files and folders you don't want to show show up in the sidebar search
        </li>
        <li class="flex items-center">
          <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          DIFFERENT SEARCH PLUGINS: Choose between the "Omni Search" Plugin and the "Local REST" Plugin to power your
          Obsidian Web Search
        </li>
      </ul>
      <h3 id="privacy" class="my-2 text-xl font-semibold text-gray-900 dark:text-white">
        Privacy
      </h3>
      <p class="mb-6">
        This extension just communicates between your local Obsidian REST Api
        and the browser. The only data that is stored permanently in the
        browser are the settings you find below. Feel free to check out the
        code base on <a class="underline" href="https://github.com/jk-oster/obsidian-search-for-web">GitHub</a>.
      </p>

      <form id="settings" name="settings">
        <fieldset>
          <h2 id="core-settings">
            <legend class="text-4xl mb-6 font-extrabold dark:text-white">
              Core settings
            </legend>
          </h2>

          <div class="mb-3 p-3 border border-gray rounded-lg min-h-20 flex flex-wrap items-center justify-center">
            <div class=" w-full">
              <span>{{ infoText ? infoText : '🔄️ Checking your local Obsidian connection' }}</span>
              <span> - Requested {{ url }}</span>
            </div>
          </div>

          <div class="mb-6">
            <label for="vault"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Obsidian Vault Name to open Links (only required if you are using multiple vaults)</label>
            <input v-model="store.vault" @change="checkApiKey" type="text" id="vault" name="vault"
                   placeholder="MyAwesomeSecondBrain"
                   class="inline shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
            <a id="openVault" :href="store.openObsidianUri + store.vault" :disabled="!!(store?.vault?.length == 0)"
               class="ml-2 w-1/4 focus:outline-hidden text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Test Open Vault</a>
          </div>

          <div class=" mb-6">
            <label for="provider"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Select Obsidian Search Provider *
            </label>
            <select v-model="store.provider" @change="providerChanged" id="provider" name="provider" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="local-rest">Local REST Plugin</option>
              <option value="omni-search">Omni Search Plugin</option>
            </select>
          </div>

          <div class=" mb-6">
            <label for="protocol"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Select Protocol
            </label>
            <select v-model="store.protocol" @change="checkApiKey" id="protocol" name="protocol" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="https://">HTTPS</option>
              <option value="http://">HTTP (insecure)</option>
            </select>
          </div>

          <div id="port-container" class="mb-6">
            <label for="port" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Port number
            </label>
            <input v-model="store.port" @change="checkApiKey" type="number" id="port" name="port"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
          </div>

          <div class="mb-6">
            <label for="apiKey"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your Obsidian REST Api Key * (Local REST API only)</label>
            <input v-model="store.apiKey" @change="checkApiKey" :disabled="store.provider !== 'local-rest'" type="text" id="apiKey" name="apiKey"
                   placeholder="Local REST API Key"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>
        </fieldset>

        <fieldset class="mt-4">
          <h2 id="display-settings">
            <legend class="text-4xl mb-6 font-extrabold dark:text-white">
              Display settings
            </legend>
          </h2>

          <div class="mb-6">
            <label for="liveSearch" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.liveSearch" type="checkbox" id="liveSearch" name="liveSearch"
                     class="sr-only peer" :checked="store.liveSearch"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Live search enabled (fetch search results already while typing)
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="showInPageIcon" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.showInPageIcon" type="checkbox" id="showInPageIcon" name="showInPageIcon"
                     class="sr-only peer" :checked="store.showInPageIcon"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Show icon on page to open sidebar when results are available
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="embeddedResults" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.embeddedResults" type="checkbox" id="embeddedResults" name="embeddedResults"
                     class="sr-only peer" :checked="store.embeddedResults"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Embed search results on Search-Engines (supports <a href="https://google.com"
                                                                      class="underline">Google</a>, <a
                  href="https://duckduckgo.com" class="underline">DuckDuckGo</a>, <a href="https://bing.com"
                                                                                     class="underline">Bing</a>, <a
                  href="https://kagi.com" class="underline">Kagi</a>)
              </span>
            </label>
          </div>
          <div class="mb-6">
            <label for="highlighting" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.highlighting" type="checkbox" id="highlighting" name="highlighting"
                     class="sr-only peer" :checked="store.highlighting"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Enable highlighting of search term in results
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="nativeResults" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.nativeResults" type="checkbox" id="nativeResults" name="nativeResults"
                     class="sr-only peer" :checked="store.nativeResults"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Enable native search embeddings (turn this off if embedded search results look ugly)
              </span>
            </label>
          </div>

          <div class=" mb-6">
            <label for="theme"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Select Color Scheme
            </label>
            <select v-model="store.theme" @change="setTheme()" id="theme" name="theme" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="auto">Auto (Default - Use Device Settings)</option>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <div class="mb-6">
            <label for="minChars"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Number of characters in search input to trigger live search (default
              2)
            </label>
            <input v-model="store.minChars" min="1" max="10" type="number" id="minChars" name="minChars"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="contextLength"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Search context length (default 50 characters, Local REST API only)
            </label>
            <input v-model="store.contextLength" :disabled="store.provider !== 'local-rest'" min="1" max="500" type="number" id="contextLength" name="contextLength"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="matchCount"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Number of matched lines shown per note (default 2, Local REST API only)
            </label>
            <input v-model="store.matchCount" :disabled="store.provider !== 'local-rest'" min="0" max="10" type="number" id="matchCount" name="matchCount"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="noteNumber"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Number of notes shown per page (default 6)
            </label>
            <input v-model="store.noteNumber" min="1" max="50" type="number" id="noteNumber" name="noteNumber"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="searchUrls"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Live-Search-Domains (Pages on which to look for search input, all others will be matched by URL
              instead of search input) *separate urls by <code>,</code>
            </label>
            <input v-model="store.searchUrls" type="text" id="searchUrls" name="searchUrls"
                   placeholder="google.com,duckduckgo.com,bing.com,startpage.com,google.at,kagi.com"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
          </div>

          <div class="mb-6">
            <label for="excludes"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Paths to exclude (files containing the following segments will
              be excluded from search results) *separate segments by
              <code>,</code>
            </label>
            <input v-model="store.excludes" type="text" id="excludes" name="excludes"
                   placeholder="Assets,Template,.excalidraw"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
          </div>
        </fieldset>
        <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400" id="status"></span>
      </form>

      <div class="my-12 text-gray-900 dark:text-white">
        <h2 id="contact" class="text-4xl mb-6 font-extrabold dark:text-white">
          Contact
        </h2>
        <p>
          Hey I am <a class="underline" href="https://jakobosterberger.com">Jakob Osterberger</a> the
          creator of this extension. If you need any support you can contact
          me <a class="underline" href="https://jakobosterberger.com/contact">though my website</a>.
          Contribution, questions, pull requests and suggestions for improvements are
          very welcome.
        </p>
        <p>
          If you encounter any issues with the extension feel free to open an issue on <a class="underline"
                                                                                          href="https://github.com/jk-oster/obsidian-search-for-web/issues">GitHub</a>.
        </p>

        <h3 class="my-4 text-xl font-semibold text-gray-900 dark:text-white">
          Credits
        </h3>
        <p>
          Thank's to the creator of the
          <a class="underline" href="https://github.com/coddingtonbear/obsidian-local-rest-api">Obsidian Local REST Api
            Plugin</a>
          <a class="underline" href="https://github.com/coddingtonbear">@Adam Coddington</a> for
          his awesome work. His effort rendered this extension possible.
        </p>
        <p>
          Furthermore, kodos to the creator of the
          <a class="underline" href="https://github.com/StarkShang/vite-plugin-chrome-extension">Vite Chrome Extension
            Plugin</a>
          for enabeling fast and easy development with vue!
        </p>
        <p>
          Big thanks to the team of
          <a class="underline" href="https://flowbite.com/">Flowbite™</a> for providing such
          awesome free Tailwind components!
        </p>
      </div>
    </div>
  </main>

  <footer
      class="p-4 bg-white shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023
            <a href="https://jkoster.com/" class="hover:underline">Jakob Osterberger</a>. All Rights Reserved.
        </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <li>
        <a href="#about" class="mr-4 hover:underline md:mr-6 ">About</a>
      </li>
      <li>
        <a href="#privacy" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
      </li>
      <li>
        <a href="githublicense" class="mr-4 hover:underline md:mr-6">Licensing</a>
      </li>
      <li>
        <a href="#contact" class="hover:underline">Contact</a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {syncStoreWithExtStorage, store} from "../store.js";
import {getBadgeService} from "../background-services/BadgeService.js";
import {useTheme} from "../theme.js";
import type {Theme} from "../types.js";

export default defineComponent({
  name: "OptionsPage",

  data() {
    return {
      store,
      infoText: '',
    }
  },

  computed: {
    url() {
      return this.store.protocol + this.store.obsidianRestUrl + ":" + this.store.port;
    },
  },

  async mounted() {
    await syncStoreWithExtStorage();
    this.checkApiKey().then();
  },

  methods: {
    async checkApiKey() {
      const badgeService = getBadgeService();
      this.infoText = (await badgeService.checkApiStatus(this.url, this.store.apiKey, this.store.provider)).statusText || '⚠️ Not connected with Obsidian';
    },

    async setTheme(theme: Theme|null = null) {
      const {setColorScheme} = useTheme();
      setColorScheme(document.body, theme ?? store.theme).then();
    },

    providerChanged() {
      setTimeout(()=>{
        if (store.provider === 'local-rest') {
          store.protocol = 'http://';
          store.obsidianRestUrl = '127.0.0.1';
          store.port = 27124;
        } else {
          store.protocol = 'http://';
          store.obsidianRestUrl = 'localhost';
          store.port = 51361;
        }
        this.checkApiKey().then();
      },1);
    }
  }
})
</script>

<style>
@import "../style/main.css";

[disabled] {
  pointer-events: none;
  opacity: 0.5;
  background: gray;
}
</style>