<template>
  <header>
    <nav class="ob-bg-white ob-border-gray-200 ob-px-2 sm:ob-px-4 ob-py-2.5 dark:ob-bg-gray-900">
      <div class="container ob-flex ob-flex-wrap ob-justify-between ob-items-center ob-mx-auto">
        <a href="#" class="ob-flex ob-items-center">
          <img src="/icon/obsidian48.png" class="ob-mr-3 ob-h-6 sm:ob-h-9" alt=""/>
          <span class="ob-self-center ob-text-xl ob-font-semibold ob-whitespace-nowrap dark:ob-text-white">Obsidian Web
                        Search</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button"
                class="ob-inline-flex ob-items-center ob-p-2 ob-ml-3 ob-text-sm ob-text-gray-500 ob-rounded-lg md:ob-hidden hover:ob-bg-gray-100 focus:ob-outline-none focus:ob-ring-2 focus:ob-ring-gray-200 dark:ob-text-gray-400 dark:hover:ob-bg-gray-700 dark:focus:ob-ring-gray-600"
                aria-controls="navbar-default" aria-expanded="false">
          <span class="ob-sr-only">Open main menu</span>
          <img class="ob-w-6 ob-h-6" aria-hidden="true" src="/icon/obsidian48.png"/>
        </button>
        <div class="ob-hidden ob-w-full md:ob-block md:ob-w-auto" id="navbar-default">
          <ul
              class="ob-flex ob-flex-col ob-p-4 ob-mt-4 ob-bg-gray-50 ob-rounded-lg ob-border ob-border-gray-100 md:ob-flex-row md:ob-space-x-8 md:ob-mt-0 md:ob-text-sm md:ob-font-medium md:ob-border-0 md:ob-bg-white dark:ob-bg-gray-800 md:dark:ob-bg-gray-900 dark:ob-border-gray-700">
            <li>
              <a href="#about"
                 class="ob-block ob-py-2 ob-pr-4 ob-pl-3 ob-text-gray-700 ob-rounded hover:ob-bg-gray-100 md:hover:ob-bg-transparent md:ob-border-0 md:hover:ob-text-blue-700 md:ob-p-0 dark:ob-text-gray-400 md:dark:hover:ob-text-white dark:hover:ob-bg-gray-700 dark:hover:ob-text-white md:dark:hover:ob-bg-transparent">About</a>
            </li>
            <li>
              <a href="#core-settings"
                 class="ob-block ob-py-2 ob-pr-4 ob-pl-3 ob-text-gray-700 ob-rounded hover:ob-bg-gray-100 md:hover:ob-bg-transparent md:ob-border-0 md:hover:ob-text-blue-700 md:ob-p-0 dark:ob-text-gray-400 md:dark:hover:ob-text-white dark:hover:ob-bg-gray-700 dark:hover:ob-text-white md:dark:hover:ob-bg-transparent">Core
                Settings</a>
            </li>
            <li>
              <a href="#display-settings"
                 class="ob-block ob-py-2 ob-pr-4 ob-pl-3 ob-text-gray-700 ob-rounded hover:ob-bg-gray-100 md:hover:ob-bg-transparent md:ob-border-0 md:hover:ob-text-blue-700 md:ob-p-0 dark:ob-text-gray-400 md:dark:hover:ob-text-white dark:hover:ob-bg-gray-700 dark:hover:ob-text-white md:dark:hover:ob-bg-transparent">Display
                Settings</a>
            </li>
            <li>
              <a href="#contact"
                 class="ob-block ob-py-2 ob-pr-4 ob-pl-3 ob-text-gray-700 ob-rounded hover:ob-bg-gray-100 md:hover:ob-bg-transparent md:ob-border-0 md:hover:ob-text-blue-700 md:ob-p-0 dark:ob-text-gray-400 md:dark:hover:ob-text-white dark:hover:ob-bg-gray-700 dark:hover:ob-text-white md:dark:hover:ob-bg-transparent">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="ob-flex ob-justify-center dark:ob-bg-gray-900 ob-py-20 ob-px-4">
    <div class="ob-max-w-2xl dark:ob-text-white ob-text-base">
      <h1 id="about"
          class="ob-mb-4 ob-text-4xl ob-font-extrabold ob-tracking-tight ob-leading-none ob-text-gray-900 md:ob-text-5xl lg:ob-text-6xl dark:ob-text-white">
        Obsidian Web Search
      </h1>

      <h2 class="ob-text-4xl ob-mb-6 ob-font-extrabold dark:ob-text-white">
        Have a Evernote like search experience
      </h2>
      <p>
        For all of you who are missing the Evernote browser search
        extension in Obsidian - here is your solution. This extension lets you search
        your Obsidian Vault simultaneously as you type your search in your
        favourite search engine.
      </p>
      <h3 class="ob-my-2 ob-text-xl ob-font-semibold ob-text-gray-900 dark:ob-text-white">
        Features
      </h3>
      <ul class="ob-space-y-1 ob-max-w-lg ob-list-inside ob-text-gray-500 dark:ob-text-gray-400">
        <li class="ob-flex ob-items-center">
          <svg class="ob-w-4 ob-h-4 ob-mr-1.5 ob-text-green-500 dark:ob-text-green-400 ob-flex-shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          LIVE SEARCH: Search your vault for notes matching your current search in e.q. the google search bar
        </li>
        <li class="ob-flex ob-items-center">
          <svg class="ob-w-4 ob-h-4 ob-mr-1.5 ob-text-green-500 dark:ob-text-green-400 ob-flex-shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          URL MATCHING: Search your vault for matches of your current url
        </li>
        <li class="ob-flex ob-items-center">
          <svg class="ob-w-4 ob-h-4 ob-mr-1.5 ob-text-green-500 dark:ob-text-green-400 ob-flex-shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          Scroll and open your matched Obsidian notes in the sidebar
        </li>
        <li class="ob-flex ob-items-center">
          <svg class="ob-w-4 ob-h-4 ob-mr-1.5 ob-text-green-500 dark:ob-text-green-400 ob-flex-shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          Exclude files and folders you don't want to show show up in the sidebar search
        </li>
        <li class="ob-flex ob-items-center">
          <svg class="ob-w-4 ob-h-4 ob-mr-1.5 ob-text-green-500 dark:ob-text-green-400 ob-flex-shrink-0"
               fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
          </svg>
          Customize how much context you want to see
        </li>
      </ul>
      <h3 id="privacy" class="ob-my-2 ob-text-xl ob-font-semibold ob-text-gray-900 dark:ob-text-white">
        Privacy
      </h3>
      <p class="ob-mb-6">
        This extension just communicates between your local Obsidian REST Api
        and the browser. The only data that is stored permanently in the
        browser are the settings you find below. Feel free to check out the
        code base on <a href="">GitHub</a>
      </p>

      <form id="settings" name="settings">
        <fieldset>
          <h2 id="core-settings">
            <legend class="ob-text-4xl ob-mb-6 ob-font-extrabold dark:ob-text-white">
              Core settings
            </legend>
          </h2>

          <div v-if="infoText" class="ob-my-3 ob-p-3 ob-border border-gray ob-rounded-lg">
            <span>{{ infoText }}</span>
            <span> - Requested {{ url }}</span>
          </div>

          <div class="ob-mb-6">
            <label for="apiKey"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Your Obsidian REST Api Key *</label>
            <input v-model="store.apiKey" @change="checkApiKey" type="text" id="apiKey" name="apiKey"
                   placeholder="0b2087ee50e56d71fe7e429203b0d1cb9bfc610a238cc3be04edf6d01d5d57ef"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="ob-mb-6">
            <label for="vault"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Obsidian Vault Name *</label>
            <input v-model="store.vault" @change="checkApiKey" type="text" id="vault" name="vault"
                   placeholder="MyAwesomeSecondBrain"
                   class="ob-inline ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-w-3/4 ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"
                   required/>
            <a id="openVault" :href="store.openObsidianUri + store.vault" :disabled="!store.vault"
               class="ob-w-1/4 focus:ob-outline-none ob-text-white ob-bg-purple-700 hover:ob-bg-purple-800 focus:ob-ring-4 focus:ob-ring-purple-300 ob-font-medium ob-rounded-lg ob-text-sm ob-px-5 ob-py-2.5 ob-mt-2 dark:ob-bg-purple-600 dark:hover:ob-bg-purple-700 dark:focus:ob-ring-purple-900">
              Test Open Vault</a>
          </div>

          <div class=" ob-mb-6">
            <label for="protocol"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-400">
              Select Protocol
            </label>
            <select v-model="store.protocol" @change="checkApiKey" id="protocol" name="protocol" required
                    class="ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500">
              <option selected value="https://">HTTPS</option>
              <option value="http://">HTTP (insecure)</option>
            </select>
          </div>


          <div id="port-container" class="ob-mb-6">
            <label for="port" class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Port number
            </label>
            <input v-model="store.port" @change="checkApiKey" type="number" id="port" name="port"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"/>
          </div>
        </fieldset>

        <fieldset class="ob-mt-4">
          <h2 id="display-settings">
            <legend class="ob-text-4xl ob-mb-6 ob-font-extrabold dark:ob-text-white">
              Display settings
            </legend>
          </h2>

          <div class="ob-mb-6">
            <label for="liveSearch" class="ob-inline-flex ob-relative ob-items-center ob-mr-5 ob-cursor-pointer">
              <input v-model="store.liveSearch" type="checkbox" id="liveSearch" name="liveSearch"
                     class="ob-sr-only peer"/>
              <div
                  class="ob-w-11 ob-h-6 ob-bg-gray-200 ob-rounded-full peer dark:ob-bg-gray-700 peer-focus:ob-ring-4 peer-focus:ob-ring-purple-300 dark:peer-focus:ob-ring-purple-800 peer-checked:after:ob-translate-x-full peer-checked:after:ob-border-white after:content-[''] after:ob-absolute after:ob-top-0.5 after:left-[2px] after:ob-bg-white after:ob-border-gray-300 after:ob-border after:ob-rounded-full after:ob-h-5 after:ob-w-5 after:ob-transition-all dark:ob-border-gray-600 peer-checked:ob-bg-purple-600">
              </div>
              <span class="ob-ml-3 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
                                Live search enabled (fetch search results already while typing)
              </span>
            </label>
          </div>

          <div class="ob-mb-6">
            <label for="showInPageIcon" class="ob-inline-flex ob-relative ob-items-center ob-mr-5 ob-cursor-pointer">
              <input v-model="store.showInPageIcon" type="checkbox" id="showInPageIcon" name="showInPageIcon"
                     class="ob-sr-only peer"/>
              <div
                  class="ob-w-11 ob-h-6 ob-bg-gray-200 ob-rounded-full peer dark:ob-bg-gray-700 peer-focus:ob-ring-4 peer-focus:ob-ring-purple-300 dark:peer-focus:ob-ring-purple-800 peer-checked:after:ob-translate-x-full peer-checked:after:ob-border-white after:content-[''] after:ob-absolute after:ob-top-0.5 after:left-[2px] after:ob-bg-white after:ob-border-gray-300 after:ob-border after:ob-rounded-full after:ob-h-5 after:ob-w-5 after:ob-transition-all dark:ob-border-gray-600 peer-checked:ob-bg-purple-600">
              </div>
              <span class="ob-ml-3 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
                                Show icon on page to open sidebar when results are available
                            </span>
            </label>
          </div>

          <div class="ob-mb-6">
            <label for="minChars"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Minimum length of search input to trigger live search (default
              2)
            </label>
            <input v-model="store.minChars" type="number" id="minChars" name="minChars"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="ob-mb-6">
            <label for="contextLength"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Search context length (default 50 characters)
            </label>
            <input v-model="store.contextLength" type="number" id="contextLength" name="contextLength"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="ob-mb-6">
            <label for="matchCount"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Number of matched lines shown per note (default 2)
            </label>
            <input v-model="store.matchCount" type="number" id="matchCount" name="matchCount"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="ob-mb-6">
            <label for="noteNumber"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-300">
              Number of notes shown per page (default 10)
            </label>
            <input v-model="store.noteNumber" type="number" id="noteNumber" name="noteNumber"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="ob-mb-6">
            <label for="searchUrls"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-400">
              Urls to look for search input (all others will be matched by url
              instead of input) *separate urls by <code>,</code>
            </label>
            <input v-model="store.searchUrls" type="text" id="searchUrls" name="searchUrls"
                   placeholder="google.com,duckduckgo.com,bing.com,startpage.com,google.at"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"/>
          </div>

          <div class="ob-mb-6">
            <label for="excludes"
                   class="ob-block ob-mb-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-400">
              Paths to exclude (files containing the following segments will
              be excluded from search results) *separate segments by
              <code>,</code>
            </label>
            <input v-model="store.excludes" type="text" id="excludes" name="excludes"
                   placeholder="Assets,Template,.excalidraw"
                   class="ob-shadow-sm ob-bg-gray-50 ob-border ob-border-gray-300 ob-text-gray-900 ob-text-sm ob-rounded-lg focus:ob-ring-blue-500 focus:ob-border-blue-500 ob-block ob-w-full ob-p-2.5 dark:ob-bg-gray-700 dark:ob-border-gray-600 dark:ob-placeholder-gray-400 dark:ob-text-white dark:focus:ob-ring-blue-500 dark:focus:ob-border-blue-500 dark:shadow-sm-light"/>
          </div>
        </fieldset>
        <span class="ob-ml-2 ob-text-sm ob-font-medium ob-text-gray-900 dark:ob-text-gray-400" id="status"></span>
      </form>

      <div class="ob-my-12 ob-text-gray-900 dark:ob-text-white">
        <h2 id="contact" class="ob-text-4xl ob-mb-6 ob-font-extrabold dark:ob-text-white">
          Contact
        </h2>
        <p>
          Hey I am <a href="https://jkoster.com">Jakob Osterberger</a> the
          creator of this extension. If you need any support you can contact
          me <a href="https://jkoster.com/contact">though my website</a>.
          Contribution, pull requests and suggestions for improvements are
          very welcome.
        </p>

        <h3 class="ob-my-4 ob-text-xl ob-font-semibold ob-text-gray-900 dark:ob-text-white">
          Credits
        </h3>
        <p>
          Thank's to the creator of the
          <a href="https://github.com/coddingtonbear/obsidian-local-rest-api">Obsidian Local REST Api
            Plugin</a>
          <a href="https://github.com/coddingtonbear">@Adam Coddington</a> for
          his awesome work. His effort rendered this extension possible.
        </p>
        <p>
          Furthermore, kodos to the creator of the
          <a href="https://github.com/StarkShang/vite-plugin-chrome-extension">Vite Chrome Extension
            Plugin</a>
          for enabeling fast and easy development with vue!
        </p>
        <p>
          Big thanks to the team of
          <a href="https://flowbite.com/">Flowbite™</a> for providing such
          awesome free Tailwind components!
        </p>
      </div>
    </div>
  </main>

  <footer
      class="ob-p-4 ob-bg-white ob-shadow md:ob-flex md:ob-items-center md:ob-justify-between md:ob-p-6 dark:ob-bg-gray-800">
        <span class="ob-text-sm ob-text-gray-500 sm:ob-text-center dark:ob-text-gray-400">© 2023
            <a href="https://jkoster.com/" class="hover:ob-underline">Jakob Osterberger</a>. All Rights Reserved.
        </span>
    <ul class="ob-flex ob-flex-wrap ob-items-center ob-mt-3 ob-text-sm ob-text-gray-500 dark:ob-text-gray-400 sm:ob-mt-0">
      <li>
        <a href="#about" class="ob-mr-4 hover:ob-underline md:ob-mr-6 ">About</a>
      </li>
      <li>
        <a href="#privacy" class="ob-mr-4 hover:ob-underline md:ob-mr-6">Privacy Policy</a>
      </li>
      <li>
        <a href="githublicense" class="ob-mr-4 hover:ob-underline md:ob-mr-6">Licensing</a>
      </li>
      <li>
        <a href="#contact" class="hover:ob-underline">Contact</a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {checkApiKey, checkApiKey as apiCheck} from '../util.js';
import {syncStoreWithExtStorage, store} from "../store.js";

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
    await checkApiKey(store.obsidianRestUrl, store.apiKey);
  },

  methods: {
    async checkApiKey() {
      this.infoText = await apiCheck(this.url, this.store.apiKey);
    }
  }
})
</script>

<style>
@import "../style/main.css";
</style>