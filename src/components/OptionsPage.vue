<template>
  <header>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
          <img src="/icon/icon48.png" class="mr-3 h-6 sm:h-9" alt=""/>
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vault Lens</span>
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
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
            </li>
            <li>
              <a href="#core-settings"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Core
                Settings</a>
            </li>
            <li>
              <a href="#display-settings"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Display
                Settings</a>
            </li>
            <li>
              <a href="#contact"
                 class="block py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex justify-center bg-white dark:bg-gray-900 py-20 px-4">
    <div class="max-w-2xl dark:text-white text-base">
      <h1 id="about"
          class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Vault Lens
      </h1>

      <h2 class="text-3xl mb-6 font-extrabold italic dark:text-white">
        Shows you and links you to relevant notes inside your Obsidian Vault when you browse the web.
      </h2>
      <!-- <p>
        For all of you who are missing the Evernote browser search
        extension in Obsidian - this is your solution.
        Have a Evernote like search experience - but BETTER and with Obsidian.
        This extension lets you search your Obsidian Vault simultaneously as you type your search in your
        favourite search engine.
      </p> -->
      <h3 class="mt-6 my-2 text-xl font-semibold text-gray-900 dark:text-white">
        Features & Configuration
      </h3>

      <p class="mb-6">
        Need some help setting up the extension? Check out the quickstart.
        To find out more about the extension features check out the feature guide.
      </p>
      <div class="w-full flex justify-center mb-6">
        <a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html" traget="_blank" class="font-bold text-lg mr-2 inline-flex items-center py-2.5 px-4 focus:outline-hidden text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Feature Guide
        </a>
        <a href="https://jk-oster.github.io/obsidian-search-for-web/getting-started.html" traget="_blank" class="font-bold text-lg inline-flex items-center py-2.5 px-4 focus:outline-hidden text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Quickstart Manual
        </a>
      </div>

      <!-- <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <PresentationCard v-for="feature in features" :icon="feature.icon" :title="feature.title" :titleHref="feature.titleHref" :imgSrc="feature.imgSrc" :imgHref="feature.imgHref" :text="feature.text" :cta="feature.cta" :ctaHref="feature.ctaHref"></PresentationCard>
      </div> -->

      <h3 id="privacy" class="my-2 text-xl font-semibold text-gray-900 dark:text-white">
        Privacy
      </h3>
      <p class="mb-6">
        This extension just communicates between your local Obsidian REST Api
        and the browser. The only data that is stored permanently in the
        browser are the settings you find below. Feel free to check out the
        code base on <a class="underline" href="https://github.com/jk-oster/obsidian-search-for-web">GitHub</a>.
        <br/>
        You can read the full privacy policy <a class="underline" href="https://jk-oster.github.io/obsidian-search-for-web/privacy.html">here</a>.
      </p>

      <h3 id="privacy" class="my-2 text-xl font-semibold text-gray-900 dark:text-white">
        Permissions
      </h3>
      <div class="mb-6">
        <p>This extension requires the following permissions:</p>
        <ul>
          <li v-for="p of permissions">
            {{ p.icon }} <code>{{ p.name }}</code>: {{ p.text }}
          </li>
        </ul>
        <p>
          You can read more about the permissions in the <a class="underline" href="https://jk-oster.github.io/obsidian-search-for-web/privacy.html#extension-permissions" target="_blank">here</a>.
        </p>
      </div>

      <h3 id="disclaimer" class="my-2 text-xl font-semibold text-gray-900 dark:text-white">
        Disclaimer
      </h3>
      <p class="mb-6">
        This is an unofficial browser extension for Obsidian. It is not connected to the developers of the app. The project is not sponsored, endorsed or affiliated with Dynalist Inc, the makers of <a class="underline" href="https://obsidian.md">Obsidian.md</a> app.
        The obsidian logo is property of <a class="underline" href="https://obsidian.md">https://obsidian.md</a>.
      </p>

      <h2 id="core-settings">
        <legend class="text-4xl font-extrabold dark:text-white">
          Core settings
        </legend>
      </h2>

      <form class="mb-6" id="upload" @submit.prevent="importSettings">

        <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Settings file (*.json)</label>
        <input  ref="file" type="file" id="file" accept=".json" class="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help">

        <div class="w-full flex justify-between mb-6">
          <button type="submit" class="flex p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            <span>
              Import Settings from JSON
            </span>
            <span>
              <ImportIcon class="ml-1 w-6 h-6 text-gray-900 dark:text-gray-400"></ImportIcon>
            </span>
          </button>

          <button @click="exportSettings"
            class="flex p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            <span>
              Export Settings to JSON
            </span>
            <span>
              <ExportIcon class="ml-1 w-6 h-6 text-gray-900 dark:text-gray-400"></ExportIcon>
            </span>
          </button>
          <button @click="exportBugReport"
            class="flex p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            <span>
              Generate Bug-Report
            </span>
            <span>
              <BugIcon class="ml-1 w-6 h-6 text-gray-900 dark:text-gray-400"></BugIcon>
            </span>
          </button>
        </div>
      </form>

      <form id="settings" name="settings">
        <fieldset>

          <Toast :text="connectionInfo + ' - Requested ' + url"></Toast>

          <div class="mb-6">
            <label for="vault"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Obsidian Vault Name to open Links (only required if you are using multiple vaults)</label>
            <input v-model="store.vault" type="text" id="vault" name="vault"
                   placeholder="MyAwesomeSecondBrain"
                   :class="store?.vault?.length != 0 ? 'w-3/4' : 'w-full'"
                   class="inline shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
            <a id="openVault" v-if="store?.vault?.length != 0" :href="'obsidian://open?vault=' + encodeURIComponent(store.vault)"
               class="ml-2 w-1/4 focus:outline-hidden text-white bg-purple-700 hover:bg-purple-obsidian focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Test Open Vault</a>
          </div>

          <div class="mb-6">
            <label for="provider"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Select Obsidian Search Provider *
            </label>
            <select v-model="store.provider" @change="providerChanged" id="provider" name="provider" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="local-rest">Local REST Plugin</option>
              <option value="omni-search">Omni Search Plugin</option>
            </select>
          </div>

          <div>
            <h3>Omnisearch Settings</h3>

            <div class="grid grid-cols-2 gap-2">
              <div class="mb-6">
                <label for="protocol"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Select Protocol
                </label>
                <select v-model="store.protocol" @change="checkApi();" id="protocol" name="protocol" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="http://">HTTP (default - non-encrypted)</option>
                </select>
              </div>
              <div class="mb-6">
                  <label for="port" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Port number
                  </label>
                  <input v-model="store.port" @change="checkApi();" type="number" id="port" name="port"
                         class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              </div>
            </div>

            <h3>Obsidian REST API Settings</h3>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label for="restApiProtocol"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Select Protocol
                </label>
                <select v-model="store.restApiProtocol" @change="checkRestApi();" id="restApiProtocol" name="restApiProtocol" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="https://">HTTPS</option>
                  <option value="http://">HTTP (non-encrypted)</option>
                </select>
              </div>
              <div>
                  <label for="restApiPort" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Port number
                  </label>
                  <input v-model="store.restApiPort" @change="checkRestApi();" type="number" id="restApiPort" name="restApiPort"
                         class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              </div>
            </div>

          </div>

          <div class="mt-2 mb-6">
            <label for="apiKey"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Your Obsidian REST Api Key * (Local REST API only)</label>
            <input v-model="store.apiKey" @change="checkRestApi();" type="text"
                   id="apiKey" name="apiKey"
                   placeholder="Local REST API Key"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <p class="mb-6">Troubles with the connection? Find help in the <a href="https://jk-oster.github.io/obsidian-search-for-web/faq.html#how-can-i-troubleshoot-connection-problems-between-obsidian-browser-search-and-obsidian-local-rest-api" class="underline text-purple-600" target="_blank">docs</a>.</p>

          <div class="mb-6">
            <label for="period"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Select Period for Periodic Notes * (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%93%85-daily-note-quick-access" class="underline text-purple-600" target="_blank">docs</a>)
            </label>
            <select v-model="store.period" id="period" name="period" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="quaterly">quaterly</option>
              <option value="yearly">yearly</option>
            </select>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              If you want to use anything other than "daily" you need to install the <a class="underline" href="obsidian://show-plugin?id=periodic-notes">Periodic Notes Plugin</a> and enable the respecetive periods in its settings.
            </div>
          </div>

        </fieldset>

        <fieldset class="mt-4">
          <h2 id="display-settings">
            <legend class="text-4xl mb-6 font-extrabold dark:text-white">
              Display settings
            </legend>
          </h2>

          <div class="mb-6">
            <label for="showInPageIcon" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.showInPageIcon" type="checkbox" id="showInPageIcon" name="showInPageIcon"
                     class="sr-only peer" :checked="store.showInPageIcon"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable toggle icon on page (used to open sidebar)? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%93%91-sidebar" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="showInPageIconWhenNoResults" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.showInPageIconWhenNoResults" type="checkbox" id="showInPageIconWhenNoResults" name="showInPageIconWhenNoResults"
                     class="sr-only peer" :checked="store.showInPageIconWhenNoResults"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable toggle icon on page when no search results are available?
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="showSidebarWhenNoResults" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.showSidebarWhenNoResults" type="checkbox" id="showSidebarWhenNoResults" name="showSidebarWhenNoResults"
                     class="sr-only peer" :checked="store.showSidebarWhenNoResults"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable pinned sidebar when no search results are available?
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="showSidebarOnButtonHover" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.showSidebarOnButtonHover" type="checkbox" id="showSidebarOnButtonHover" name="showSidebarOnButtonHover"
                     class="sr-only peer" :checked="store.showSidebarOnButtonHover"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable showing sidebar on toggle icon hover?
              </span>
            </label>
          </div>

<!--          <div class="mb-6">-->
<!--            <label for="allowDraggingButton" class="inline-flex relative items-center mr-5 cursor-pointer">-->
<!--              <input v-model="store.allowDraggingButton" type="checkbox" id="allowDraggingButton" name="allowDraggingButton"-->
<!--                     class="sr-only peer" :checked="store.allowDraggingButton"/>-->
<!--              <div-->
<!--                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">-->
<!--              </div>-->
<!--              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">-->
<!--                  Enable dragging and repositioning of toggle icon-->
<!--              </span>-->
<!--            </label>-->
<!--          </div>-->

          <div class="mb-6">
            <label for="highlighting" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.highlighting" type="checkbox" id="highlighting" name="highlighting"
                     class="sr-only peer" :checked="store.highlighting"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable highlighting of search term in results?
              </span>
            </label>
          </div>

          <div class="mb-6">
            <label for="dedicatedNoteNotifications" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.dedicatedNoteNotifications" type="checkbox" id="dedicatedNoteNotifications" name="dedicatedNoteNotifications"
                     class="sr-only peer" :checked="store.dedicatedNoteNotifications"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                Enable dedicated Page Notes notifications? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%97-link-hover-messages" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              If enabled, Page Notes for the URL you are currently visiting will show up as notifications on the page. The displayed message can be customized using e.g. "web-message" and other  <a class="underline" target="_blank" href="https://jk-oster.github.io/obsidian-search-for-web/frontmatter-fields.html">frontmatter fields</a>.
            </div>
          </div>

          <div class="mb-6">
            <label for="linkHoverDedicatedNoteBadge" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.linkHoverDedicatedNoteBadge" type="checkbox" id="linkHoverDedicatedNoteBadge" name="linkHoverDedicatedNoteBadge"
                     class="sr-only peer" :checked="store.linkHoverDedicatedNoteBadge"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                Enable notifications on Link Hover? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%97-link-hover-messages" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              If enabled, a tooltip notification will be displayed when hovering over links targeting pages you have created Page Notes. The displayed message can be customized using e.g. "web-message" and other <a class="underline" target="_blank" href="https://jk-oster.github.io/obsidian-search-for-web/frontmatter-fields.html">frontmatter fields</a>.
            </div>
          </div>

          <div class="mb-6">
            <label for="linkHoverNoteMentions" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.linkHoverNoteMentions" type="checkbox" id="linkHoverNoteMentions" name="linkHoverNoteMentions"
                     class="sr-only peer" :checked="store.linkHoverNoteMentions"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                Enable link hover notifications when URL is mentioned somewhere in the notes? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%97-link-hover-messages" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              If enabled, a tooltip notification will be displayed when hovering over links targeting pages have mentioned in a note.
            </div>
          </div>

          <div class="mb-6">
            <label for="liveSearch" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.liveSearch" type="checkbox" id="liveSearch" name="liveSearch"
                     class="sr-only peer" :checked="store.liveSearch"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                Enable Instant Live Search? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              Fetch search results already while typing in the searchbar of your search engine
            </div>
          </div>

          <div class="mb-6 ">
            <label for="embeddedResults" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.embeddedResults" type="checkbox" id="embeddedResults" name="embeddedResults"
                     class="sr-only peer" :checked="store.embeddedResults"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable embed search results on Search-Engines? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%96%A5%EF%B8%8F-embedded-search-results" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>

            <div class="text-xs text-gray-700 dark:text-gray-400">
              Currently supported are:

              <template v-for="(page, index) in pageOptions.filter(p => p.sidebar || p.main)">
                <a :href="page.url" class="underline">{{ page.url.replace('https://', '') }}</a>{{ index + 1 >= pageOptions.length ? '' : ', ' }}
              </template>
            </div>
          </div>

          <div class="mb-6">
            <label for="nativeResults" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.nativeResults" type="checkbox" id="nativeResults" name="nativeResults"
                     class="sr-only peer" :checked="store.nativeResults"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Enable native search embeddings style? (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%96%A5%EF%B8%8F-embedded-search-results" class="underline text-purple-600" target="_blank">docs</a>)
              </span>
            </label>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              Native embeddings are currently available for Google, Bing, Kagi and DuckDuckGo. Turn this off if embedded search results look ugly. This may happen due to updates & changes on your search engine.
            </div>
          </div>

          <div class="mb-6">
            <label for="preferSidebarEmbeddings" class="inline-flex relative items-center mr-5 cursor-pointer">
              <input v-model="store.preferSidebarEmbeddings" type="checkbox" id="preferSidebarEmbeddings" name="preferSidebarEmbeddings"
                     class="sr-only peer" :checked="store.preferSidebarEmbeddings"/>
              <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-obsidian">
              </div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Prefer Embeddings in Search Engine Sidebar?
              </span>
            </label>
            <div class="text-xs text-gray-700 dark:text-gray-400">
              Turn this off to show to show results in search engine main content.
            </div>
          </div>

          <div class=" mb-6">
            <label for="theme"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Select Color Scheme
            </label>
            <select v-model="store.theme" @change="setTheme()" id="theme" name="theme" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="auto">Automatic (based on page background)</option>
              <option value="device">Use Device Settings</option>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <div class="mb-6">
            <label for="minChars"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Number of characters in search input to trigger live search (default
              2)
            </label>
            <input v-model="store.minChars" min="1" max="10" type="number" id="minChars" name="minChars"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="contextLength"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Search context length (default 50 characters, Local REST API only)
            </label>
            <input v-model="store.contextLength" :disabled="store.provider !== 'local-rest'" min="1" max="500"
                   type="number" id="contextLength" name="contextLength"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="matchCount"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Number of matched lines shown per note (default 3, Local REST API only)
            </label>
            <input v-model="store.matchCount" :disabled="store.provider !== 'local-rest'" min="0" max="10" type="number"
                   id="matchCount" name="matchCount"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="noteNumber"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Number of notes shown per page (default 6)
            </label>
            <input v-model="store.noteNumber" min="1" max="50" type="number" id="noteNumber" name="noteNumber"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="searchUrls"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Additional Live-Search-Domains (separate urls by <code>,</code>) (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
            </label>
            <input v-model="store.searchUrls" type="text" id="searchUrls" name="searchUrls"
                   placeholder="...additional search domains..."
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            <span class="text-xs text-gray-700 dark:text-gray-400">
              Pages on which to look for search input, all others will be matched by URL instead of search input.
            </span>
            <span class="text-xs text-gray-700 dark:text-gray-400">
              The following Domains are currently supported by default:
              <template v-for="(page, index) in pageOptions.filter(p => p.regex)">
                <a :href="page.url" class="underline">{{ page.url.replace('https://', '') }}</a>{{ index + 1 >= pageOptions.length ? '' : ', ' }}
              </template>
            </span>
          </div>

          <div class="mb-6">
            <label for="excludes"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Paths to exclude (separate segments by<code>,</code>)
            </label>
            <input v-model="store.excludes" type="text" id="excludes" name="excludes"
                    placeholder="Assets,Template,.excalidraw"
                    class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            <span class="text-xs text-gray-700 dark:text-gray-400">
              Files containing any of the defined segments in their file path will be excluded from search results.
            </span>
          </div>

          <h3>Hotkeys</h3>

          <div class="grid grid-cols-3 gap-2">
            <div class="mb-6">
              <label for="pinHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Toggle sidebar (default <kbd>{{ config.pinHotKeyConfig }}</kbd>) (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.pinHotKeyConfig" type="text" id="pinHotKeyConfig" name="pinHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
  
            <div class="mb-6">
              <label for="openPeriodicHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Open periodic note (default <kbd>{{ config.openPeriodicHotKeyConfig }}</kbd>) (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.openPeriodicHotKeyConfig" type="text" id="openPeriodicHotKeyConfig" name="openPeriodicHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            
            <div class="mb-6">
              <label for="appendPeriodicHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Append periodic note (default <kbd>{{ config.appendPeriodicHotKeyConfig }}</kbd>) (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.appendPeriodicHotKeyConfig" type="text" id="appendPeriodicHotKeyConfig" name="appendPeriodicHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
  
            <div class="mb-6">
              <label for="settingsHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Open settings (default <kbd>{{ config.settingsHotKeyConfig }}</kbd>) (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.settingsHotKeyConfig" type="text" id="settingsHotKeyConfig" name="settingsHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
  
            <div class="mb-6">
              <label for="searchHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Search vault (default <kbd>{{ config.searchHotKeyConfig }}</kbd>) (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.searchHotKeyConfig" type="text" id="searchHotKeyConfig" name="searchHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>

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
        <p class="mt-1">
          If you encounter any issues with the extension feel free to open an issue on <a class="underline" href="https://github.com/jk-oster/obsidian-search-for-web/issues">GitHub</a>.
        </p>
        <p>
          Looking for documentation? You can find all the details about the extension <a class="underline" href="https://jk-oster.github.io/obsidian-search-for-web">here</a>.
        </p>

        <h3 class="my-4 text-xl font-semibold text-gray-900 dark:text-white">
          Credits
        </h3>
        <p>
          First and foremost big thanks to the creators of <a class="underline" href="https://obsidian.md">Obsidian.md</a> for creating
          such an AWESOME and FREE note taking tool.

          Thanks to the creator of
          <a class="underline" href="https://github.com/coddingtonbear/obsidian-local-rest-api">Obsidian Local REST Api</a>
          <a class="underline" href="https://github.com/coddingtonbear">@Adam Coddington</a> and
          <a class="underline" href="https://github.com/scambier/obsidian-omnisearch">Omnisearch</a>
          <a class="underline" href="https://github.com/scambier">@Scambier</a> for
          their awesome work. Their efforts make this browser extension possible.

          Furthermore, kudos to the creator of the
          <a class="underline" href="https://github.com/aklinker1/vite-plugin-web-extension">Vite Web Extension Plugin</a>
          for enabling fast and easy extension development with Vue!

          Big thanks also to the team of
          <a class="underline" href="https://flowbite.com/">Flowbite™</a> for providing such
          awesome free Tailwind components!
        </p>
      </div>
    </div>
  </main>

  <footer
      class="p-4 bg-gray-50 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025
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

<script setup lang="ts">
import {computed, ref} from 'vue'
import type {Theme} from "../types.js";
import Toast from "./Toast.vue";
import {store} from "../store.js";
import {useObsidianConnection} from "../connection.js";
import {config, pageOptions,  permissions} from "../config.js";
import {detectPreferredColorScheme, setColorScheme} from "../theme.js";
import { getTabService } from '../background-services/TabService.js';
import { getNoteService } from '../background-services/NoteService.js';
import ExportIcon from './ExportIcon.vue';
import BugIcon from './BugIcon.vue';
import ImportIcon from './ImportIcon.vue';

const tabService = getTabService();
const noteService = getNoteService();

const file = ref<HTMLInputElement | null>(null);

async function exportBugReport() {
  const manifest = await tabService.getManifest();
  const browserDetails = navigator.userAgent;
  const dateTime = new Date().toISOString();
  let meta = null;

  try {
    meta = await noteService.fetchMetaData(store);
    console.log(meta);
  } catch (e) {
    console.error(e);
  }

  exportSettings({
    dateTime,
    browserDetails,
    manifest,
    meta
  }, 'bug-report.json');
}

function exportSettings(details = {}, name: string = 'settings.json') {
  const {apiKey, ...settings} = store;
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({...details, ...settings}, null, 2));
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", name);
  document.body.appendChild(dlAnchorElem); // required for firefox
  dlAnchorElem.click();
  dlAnchorElem.remove();
}

function importSettings() {
  if (!file.value?.value.length) return;

	let reader = new FileReader();
	reader.onload = () => {
    const settingsToImport = JSON.parse(reader.result as string);
    console.log(settingsToImport);
    for (const key in settingsToImport) {
      if(key in store) {
        // @ts-ignore
        store[key] = settingsToImport[key];
      }
    }
    connectionInfo.value = '✅ Settings imported successfully';
  };
  // @ts-ignore
	reader.readAsText(file.value.files[0]);
}

const {throttledConnectionCheck, throttledRestApiConnectionCheck, connectionInfo, restApiStatus} = useObsidianConnection(1000);

const url = computed(()=> {
    return (store.provider === 'local-rest' ? store.restApiProtocol : store.protocol)  + (store.provider === 'local-rest' ? '127.0.0.1' : 'localhost') + ":" + (store.provider === 'local-rest' ? store.restApiPort : store.port) ;
});

async function checkApi() {
  throttledConnectionCheck().then();
}
async function checkRestApi() {
  throttledRestApiConnectionCheck().then();
}

function setTheme(theme: Theme | null = null) {
  const themeSetting = theme ?? store.theme;
  if (themeSetting === 'auto' || themeSetting === 'device') {
    setColorScheme(document.body, detectPreferredColorScheme());
  } else {
    setColorScheme(document.body, themeSetting);
  }
}

function providerChanged() {
  setTimeout(() => {
    if (store.provider === 'local-rest') {
      connectionInfo.value = '🔄️ Checking your Obsidian REST API connection'
    } else {
      connectionInfo.value = '🔄️ Checking your Obsidian Omnisearch connection'
    }
    checkApi().then();
  }, 1);
}

</script>

<style>
@import "../style/main.css";

[disabled] {
  pointer-events: none;
  opacity: 0.5;
  background: gray;
}
</style>