<template>
  <header class="fixed top-0 z-50 w-full">
    <nav class="bg-gray-50 border-b border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
          <img src="/icon/icon48.png" class="mr-3 h-6 sm:h-9" alt=""/>
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vault Lens</span>
        </a>
        <!-- <button data-collapse-toggle="navbar-default" type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <img class="w-6 h-6" aria-hidden="true" src="/icon/icon48.png"/>
        </button> -->
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
              class="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li v-for="item of navbarItems" :key="item.name">
              <a :href="item.href" :target="item.href.includes('http') ? '_blank' : ''" :class="item.class ?? ''"
                 class="inline-flex items-center py-2 pr-4 pl-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-900 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <span>
                  {{ item.name }}
                </span>
                <OpenLink v-if="item.href.includes('http')" class="h-4"></OpenLink>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <aside id="sidebar" class="fixed top-0 left-0 z-40 w-64 lg:w-80 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 pt-8 lg:pt-12 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="mt-14 space-y-2 font-medium">
         <li v-for="item in sidebarItems" :key="item.name">
            <a :href="item.href" :target="item.href.includes('http') ? '_blank' : ''" :class="item.class ?? ''" 
              class="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span class="ms-3">{{ item.name }}</span>
               <OpenLink v-if="item.href.includes('http')" class="h-4"></OpenLink>
            </a>
            <ul v-if="item.children">
                <li v-for="child in item.children" :key="child.name" class="ml-4">
                    <a :href="child.href" :target="child.href.includes('http') ? '_blank' : ''" :class="child.class ?? ''" 
                      class="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <span class="ms-3">{{ child.name }}</span>
                      <OpenLink v-if="child.href.includes('http')" class="h-4"></OpenLink>
                    </a>
                    <ul v-if="child.children">
                      <li v-for="grandChild in child.children" :key="grandChild.name" class="ml-8">
                          <a :href="grandChild.href" :target="grandChild.href.includes('http') ? '_blank' : ''" :class="grandChild.class ?? ''" 
                            class="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span class="ms-3">{{ grandChild.name }}</span>
                            <OpenLink v-if="grandChild.href.includes('http')" class="h-4"></OpenLink>
                          </a>
                      </li>
                  </ul>
                </li>
            </ul>
         </li>
         <li>
          <button @click="exportBugReport"
            class="w-full flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span class="ms-3">
              Generate Bug-Report
            </span>
            <BugIcon class="ml-1 w-4 h-4 text-gray-900 dark:text-gray-400"></BugIcon>
          </button>
         </li>
      </ul>
    </div>
  </aside>

  <main class="bg-white dark:bg-gray-900 flex justify-center sm:ml-64 lg:ml-80 py-10 md:py-16 px-4 mt-14">
    <div class="max-w-2xl dark:text-white text-base">
      <h1 id="about"
          class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Vault Lens
      </h1>

      <h2 class="text-3xl mb-6 font-extrabold italic dark:text-white">
        Shows you and links you to relevant notes inside your Obsidian Vault when you browse the web.
      </h2>
      
      <MarkdownRenderer class="mb-6">
        ### Features & Configuration

        Need some help setting up the extension? Check out the quickstart.
        To find out more about the extension features check out the feature guide.
      </MarkdownRenderer>

      <div class="w-full flex justify-center mb-6">
        <a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html" target="_blank" class="font-bold text-lg mr-2 inline-flex items-center py-2 px-4 focus:outline-hidden text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Feature Guide
        </a>
        <a href="https://jk-oster.github.io/obsidian-search-for-web/getting-started.html" target="_blank" class="font-bold text-lg inline-flex items-center py-2 px-4 focus:outline-hidden text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Quickstart Manual
        </a>
      </div>

      <MarkdownRenderer id="news" class="mb-6 max-w-full rounded-md bg-gray-50 dark:bg-gray-700 p-4">
        **🆕 News since v2.5.0**

        - Official [Firefox](https://addons.mozilla.org/firefox/addon/vault-lens/) & [Edge](https://microsoftedge.microsoft.com/addons/detail/vault-lens/famedkcjbljkkabgpphnioagamckhmcj) support
        - Extension renamed to "[Vault Lens](https://vaultlens.com)"
        - [Hotkey](#hotkey-settings) functionalities
        - [Import / export settings](#upload) and bug reporting in the settings
        - Updated and added extension and feature documentation
        - Improved extension settings UI and default values
      </MarkdownRenderer>

      <!-- <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <PresentationCard v-for="feature in features" :icon="feature.icon" :title="feature.title" :titleHref="feature.titleHref" :imgSrc="feature.imgSrc" :imgHref="feature.imgHref" :text="feature.text" :cta="feature.cta" :ctaHref="feature.ctaHref"></PresentationCard>
      </div> -->

      <h2 id="core-settings" class="mb-4 text-4xl font-extrabold dark:text-white">
        Core Settings
      </h2>

      <form class="mb-6" id="upload" @submit.prevent="importSettings">

        <label for="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">(optional) Settings file to import *.json</label>
        <input  ref="file" type="file" id="file" accept=".json" class="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help">

        <div class="w-full flex justify-between mb-6">
          <button type="submit" 
            class="flex items-center p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            <span>
              Import Settings from JSON
            </span>
            <ImportIcon class="ml-1 w-4 h-4 text-gray-900 dark:text-gray-400"></ImportIcon>
          </button>

          <button @click="exportSettings"
            class="flex items-center p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            <span>
              Export Settings to JSON
            </span>
            <ExportIcon class="ml-1 w-4 h-4 text-gray-900 dark:text-gray-400"></ExportIcon>
          </button>
          <button @click="exportBugReport"
            class="flex items-center p-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-purple-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-500">
            <span>
              Generate Bug-Report
            </span>
            <BugIcon class="ml-1 w-4 h-4 text-gray-900 dark:text-gray-400"></BugIcon>
          </button>
        </div>
      </form>

      <!-- <h3 id="connection-settings"  class="text-2xl font-extrabold dark:text-white mb-4">
          Obsidian Connection
      </h3> -->

      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      <h3 id="connection-settings" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Obsidian Connection</h3>

      <form id="settings" name="settings">
        <fieldset>

          <Toast :text="connectionInfo + ' - Requested ' + url"></Toast>

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
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <h3 id="omnisearch" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Omnisearch</h3>

            <div class="grid grid-cols-2 gap-2">
              <div class="mb-6">
                <label for="protocol"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Select Protocol
                </label>
                <select 
                  v-model="store.protocol" 
                  @change="checkApi();" 
                  id="protocol" 
                  name="protocol" 
                  required
                  :class="store.provider === 'omni-search' ? 'border border-solid border-purple-700' : 'border border-gray-300 dark:border-gray-600'"      
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="http://">HTTP (default - non-encrypted)</option>
                </select>
              </div>
              <div class="mb-6">
                  <label for="port" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Port number
                  </label>
                  <input v-model="store.port" 
                    @change="checkApi();" 
                    type="number" 
                    id="port" 
                    name="port"
                    :class="store.provider === 'omni-search' ? 'border border-solid border-purple-700' : 'border border-gray-300 dark:border-gray-600'"      
                    class="shadow-xs bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              </div>
            </div>

            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <h3 id="local-rest-api" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Local REST API</h3>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label for="restApiProtocol"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Select Protocol
                </label>
                <select v-model="store.restApiProtocol" 
                  @change="checkRestApi();" 
                  id="restApiProtocol" 
                  name="restApiProtocol" 
                  required
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  :class="store.provider === 'local-rest' ? 'border border-solid border-purple-700' : 'border border-gray-300 dark:border-gray-600'">
                  <option value="https://">HTTPS</option>
                  <option value="http://">HTTP (non-encrypted)</option>
                </select>
              </div>
              <div>
                  <label for="restApiPort" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Port number
                  </label>
                  <input 
                    v-model="store.restApiPort" 
                    @change="checkRestApi();" 
                    type="number" 
                    id="restApiPort" 
                    name="restApiPort"
                    class="shadow-xs bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                    :class="store.provider === 'local-rest' ? 'border border-solid border-purple-700' : 'border border-gray-300 dark:border-gray-600'" />
                  </div>
            </div>

          </div>

          <div class="mt-2 mb-6">
            <label for="apiKey"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Your Obsidian REST Api Key * (Local REST API only)</label>
            <input v-model="store.apiKey" 
                   @change="checkRestApi();" 
                   type="text"
                   id="apiKey" name="apiKey"
                   placeholder="Local REST API Key"
                   class="shadow-xs bg-gray-50 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 dark:shadow-sm-light"
                   :class="store.provider === 'local-rest' ? 'border border-solid border-purple-700' : 'border border-gray-300 dark:border-gray-600'"      
                   required />
          </div>

          <p class="mb-6">Troubles with the connection? Find help in the <a href="https://jk-oster.github.io/obsidian-search-for-web/faq.html#how-can-i-troubleshoot-connection-problems-between-obsidian-browser-search-and-obsidian-local-rest-api" class="underline text-purple-600" target="_blank">docs</a>.</p>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="display-settings" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Display Settings</h3>

          <div class="mb-6">
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

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="sidebar" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Sidebar & Page Icon</h3>

          <ToggleInput
            class="mb-6"
            name="showInPageIcon"
            label="Enable toggle icon on page (used to open sidebar)?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%93%91-sidebar"
            v-model="store.showInPageIcon"
            :checked="store.showInPageIcon">
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="showInPageIconWhenNoResults"
            label="Enable toggle icon on page when no search results are available?"
            v-model="store.showInPageIconWhenNoResults"
            :checked="store.showInPageIconWhenNoResults">
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="showSidebarWhenNoResults"
            label="Enable pinned sidebar when no search results are available?"
            v-model="store.showSidebarWhenNoResults"
            :checked="store.showSidebarWhenNoResults">
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="showSidebarOnButtonHover"
            label="Enable showing sidebar on toggle icon hover?"
            v-model="store.showSidebarOnButtonHover"
            :checked="store.showSidebarOnButtonHover">
          </ToggleInput>

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

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

          <h3 id="page-notes" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Page Notes & Link Hover Notifications</h3>

          <ToggleInput
            class="mb-6"
            name="dedicatedNoteNotifications"
            label="Enable dedicated Page Notes notifications?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%97-link-hover-messages"
            v-model="store.dedicatedNoteNotifications"
            :checked="store.dedicatedNoteNotifications">
              If enabled, a tooltip notification will be displayed when hovering over links targeting pages you have created Page Notes. The displayed message can be customized using e.g. "web-message" and other <a class="underline" target="_blank" href="https://jk-oster.github.io/obsidian-search-for-web/frontmatter-fields.html">frontmatter fields</a>.
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="linkHoverDedicatedNoteBadge"
            label="Enable notifications on Link Hover?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%97-link-hover-messages"
            v-model="store.linkHoverDedicatedNoteBadge"
            :checked="store.linkHoverDedicatedNoteBadge">
              If enabled, a tooltip notification will be displayed when hovering over links targeting pages you have created Page Notes. The displayed message can be customized using e.g. "web-message" and other <a class="underline" target="_blank" href="https://jk-oster.github.io/obsidian-search-for-web/frontmatter-fields.html">frontmatter fields</a>.
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="linkHoverNoteMentions"
            label="Enable link hover notifications when URL is mentioned somewhere in the notes?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%97-link-hover-messages"
            v-model="store.linkHoverNoteMentions"
            :checked="store.linkHoverNoteMentions">
            If enabled, a tooltip notification will be displayed when hovering over links targeting pages have mentioned in a note.
          </ToggleInput>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="live-search" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Instant Live Search & Note Recall</h3>

          <ToggleInput
            class="mb-6"
            name="liveSearch"
            label="Enable Instant Live Search?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search"
            v-model="store.liveSearch"
            :checked="store.liveSearch"
            help="Fetch search results already while typing in the searchbar of your search engine">
          </ToggleInput>

          <ToggleInput 
            v-model="store.useLiveSearchFallback" 
            :checked="store.useLiveSearchFallback" 
            label="Enable Fallback for Instant Live Search"
            help="If enabled, the extension will use URL matching if the Live Search does not return any results initially."
            name="useLiveSearchFallback">
          </ToggleInput>

          <ToggleInput 
            v-model="store.useUrlMatchFallback" 
            :checked="store.useUrlMatchFallback" 
            label="Enable Fallback for URL Match"
            help="If enabled, the extension will use the page title or alternatively the page heading (H1) for note recall if checking the URL does not return any results initially."
            name="useUrlMatchFallback">
          </ToggleInput>

          <div class="mb-6">
            <label for="minChars" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Number of characters in search input to trigger Live Search (default 2)
            </label>
            <input v-model="store.minChars" min="1" max="10" type="number" id="minChars" name="minChars"
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   required/>
          </div>

          <div class="mb-6">
            <label for="searchUrls" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Additional Live-Search-Domains *separate urls by <code>,</code> **supports <a class="underline" href="https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_expressions" target="_blank">RegExp</a> (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%E2%9A%A1-instant-live-search" class="underline text-purple-600" target="_blank">docs</a>)
            </label>
            <input v-model="store.searchUrls" type="text" id="searchUrls" name="searchUrls"
                   placeholder="...additional search domains..."
                   class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            <span class="text-xs text-gray-700 dark:text-gray-400">
              You are using a search engine that is not on the supported list? Instant Live Search not triggering or embedded results don't show up? Add the respective search engine URLs here.
            </span>
            <span class="text-xs text-gray-700 dark:text-gray-400">
              The following domains are currently supported by default:
              <template v-for="(page, index) in pageOptions.filter(p => p.regex)">
                <a :href="page.url" class="underline">{{ page.url.replace('https://', '') }}</a>{{ index + 1 >= pageOptions.length ? '' : ', ' }}
              </template>
            </span>
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="embedded-results" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Embedded Search Results</h3>

          <ToggleInput
            class="mb-6"
            name="embeddedResults"
            label="Enable embed search results on Search-Engines?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%96%A5%EF%B8%8F-embedded-search-results"
            v-model="store.embeddedResults"
            :checked="store.embeddedResults">
            Currently supported are:
  
            <template v-for="(page, index) in pageOptions.filter(p => p.sidebar || p.main)">
              <a :href="page.url" class="underline">{{ page.url.replace('https://', '') }}</a>{{ index + 1 >= pageOptions.length ? '' : ', ' }}
            </template>
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="nativeResults"
            label="Enable native search embeddings style?"
            docs="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%96%A5%EF%B8%8F-embedded-search-results"
            v-model="store.nativeResults"
            :checked="store.nativeResults">
            Native embeddings are currently available for Google, Bing, Kagi and DuckDuckGo. Turn this off if the results take up to much space or if embedded search results look ugly. This may happen due to updates & changes on your search engine.
          </ToggleInput>

          <ToggleInput
            class="mb-6"
            name="preferSidebarEmbeddings"
            label="Prefer Embeddings in Search Engine Sidebar?"
            v-model="store.preferSidebarEmbeddings"
            :checked="store.preferSidebarEmbeddings">
            Turn this off to show to always show results in search engine main content instead.
          </ToggleInput>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="search-details" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Search Details</h3>

          <ToggleInput
            class="mb-6"
            name="highlighting"
            label="Enable highlighting of search term in results?"
            v-model="store.highlighting"
            :checked="store.highlighting">
          </ToggleInput>

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
            <label for="excludes"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Paths to exclude *separate segments by<code>,</code> **supports <a class="underline" href="https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_expressions" target="_blank">RegExp</a> (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#%F0%9F%94%8D-exclude-files" class="underline text-purple-600" target="_blank">docs</a>)
            </label>
            <input v-model="store.excludes" type="text" id="excludes" name="excludes"
                    placeholder="Assets,Template,.excalidraw"
                    class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            <span class="text-xs text-gray-700 dark:text-gray-400">
              Files containing any of the defined segments in their file path will be excluded from search results.
            </span>
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="hotkey-settings" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Hotkeys</h3>

          <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <div class="mb-6">
              <label for="pinHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Toggle sidebar (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#⌨%EF%B8%8F-hotkeys" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.pinHotKeyConfig" type="text" id="pinHotKeyConfig" name="pinHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                Default <kbd>{{ config.pinHotKeyConfig }}</kbd>
              </span>
            </div>
  
            <div class="mb-6">
              <label for="openPeriodicHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Open periodic note (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#⌨%EF%B8%8F-hotkeys" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.openPeriodicHotKeyConfig" type="text" id="openPeriodicHotKeyConfig" name="openPeriodicHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                Default <kbd>{{ config.openPeriodicHotKeyConfig }}</kbd>
              </span>
            </div>
            
            <div class="mb-6">
              <label for="appendPeriodicHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Append periodic note (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#⌨%EF%B8%8F-hotkeys" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.appendPeriodicHotKeyConfig" type="text" id="appendPeriodicHotKeyConfig" name="appendPeriodicHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                Default <kbd>{{ config.appendPeriodicHotKeyConfig }}</kbd>
              </span>
            </div>
  
            <div class="mb-6">
              <label for="settingsHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Open settings (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#⌨%EF%B8%8F-hotkeys" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.settingsHotKeyConfig" type="text" id="settingsHotKeyConfig" name="settingsHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                Default <kbd>{{ config.settingsHotKeyConfig }}</kbd>
              </span>
            </div>
  
            <div class="mb-6">
              <label for="searchHotKeyConfig"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Search vault (<a href="https://jk-oster.github.io/obsidian-search-for-web/feature-guide.html#⌨%EF%B8%8F-hotkeys" class="underline text-purple-600" target="_blank">docs</a>)
              </label>
              <input v-model="store.searchHotKeyConfig" type="text" id="searchHotKeyConfig" name="searchHotKeyConfig"
                     placeholder="...additional search domains..."
                     class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                Default <kbd>{{ config.searchHotKeyConfig }}</kbd>
              </span>
            </div>

          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="periodic-notes" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Periodic Notes</h3>

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
            <div class="text-xs text-gray-700 dark:text-gray-400 mt-2">
              If you want to use anything other than "daily" you need to install the <a class="underline" href="obsidian://show-plugin?id=periodic-notes">Periodic Notes Plugin</a> and enable the respecetive periods in its settings.
            </div>
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
          <h3 id="multiple-vaults" class="text-center mb-6 font-bold text-gray-800 dark:text-gray-200">Multiple Vaults</h3>

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

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        </fieldset>
      </form>

      <div class="my-6 text-gray-900 dark:text-white">
        <MarkdownRenderer id="privacy" class="mb-6 max-w-full">
          ## Privacy

          This extension just communicates between your local Obsidian REST Api
          and the browser. The only data that is stored permanently in the
          browser are the settings you find below. Feel free to check out the
          code base on [GitHub](https://github.com/jk-oster/obsidian-search-for-web).
          You can read the full privacy policy [here](https://jk-oster.github.io/obsidian-search-for-web/privacy.html).
        </MarkdownRenderer>

        <h3 id="permissions" class="my-2 text-xl font-semibold text-gray-900 dark:text-white">
          Permissions
        </h3>
        <div class="mb-6 prose prose-slate dark:prose-invert">
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

        <MarkdownRenderer class="max-w-full mb-6" id="contact">
          ## Contact

          Hey I am [Jakob Osterberger](https://jakobosterberger.com) the
          creator of this extension. If you need any support you can contact
          me [though my website](https://jakobosterberger.com/contact).
          Contribution, questions, pull requests and suggestions for improvements are
          very welcome.

          If you encounter any issues with the extension feel free to open an issue on [GitHub](https://github.com/jk-oster/obsidian-search-for-web/issues).         
          Looking for documentation? You can find all the details about the extension [here](https://jk-oster.github.io/obsidian-search-for-web).

          If you like the extension and want to support me and the project you can do so by [buying me a coffee](https://www.kofi.com/jakobosterberger) and giving the extension some good reviews.

          ### Disclaimer

          This is an unofficial browser extension for Obsidian. The project is not sponsored, endorsed or affiliated with Dynalist Inc, the makers of [Obsidian.md](https://obsidian.md). 
          The obsidian logo is property of https://obsidian.md.

          ### Credits

          First and foremost big thanks to the creators of [Obsidian.md](https://obsidian.md) for creating
          such an AWESOME and FREE note taking tool.

          Thanks to the creator of [Obsidian Local REST Api](https://github.com/coddingtonbear/obsidian-local-rest-api)[@Adam Coddington](https://github.com/coddingtonbear) and
          [Omnisearch](https://github.com/scambier/obsidian-omnisearch)[@Scambier](https://github.com/scambier) for
          their awesome work. Their efforts make this browser extension possible.
          
          Furthermore, kudos to the creator of the [Vite Web Extension Plugin](https://github.com/aklinker1/vite-plugin-web-extension) for enabling fast and easy extension development with Vue!
          Big thanks also to the team of [Flowbite™](https://flowbite.com/) for providing such awesome free Tailwind components!
        </MarkdownRenderer>
      </div>
    </div>
  </main>

  <footer class="bg-white dark:bg-gray-900 p-4 shadow-sm md:p-6">
    <div class="text-sm text-gray-500 dark:text-gray-400 text-right">
      © 2025 <a href="https://jakobosterberger.com/" target="_blank" class="hover:underline">Jakob Osterberger</a>. All Rights Reserved. Released under the <a href="https://github.com/jk-oster/obsidian-search-for-web/blob/master/LICENSE" target="_blank" class="hover:underline">GPLv3 License</a>.
    </div>
  </footer>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import type {Theme} from '../types.js';
import Toast from './Toast.vue';
import {store} from '../store.js';
import {useObsidianConnection} from '../connection.js';
import {config, pageOptions,  permissions} from '../config.js';
import {detectPreferredColorScheme, setColorScheme} from '../theme.js';
import {usePlatform} from '../platform.js';
import { getTabService } from '../background-services/TabService.js';
import { getNoteService } from '../background-services/NoteService.js';
import ExportIcon from './icons/ExportIcon.vue';
import BugIcon from './icons/BugIcon.vue';
import ImportIcon from './icons/ImportIcon.vue';
import {proxyToPlainObject} from '../firefox-util.js';
import MarkdownRenderer from './MarkdownRenderer.vue';
import ToggleInput from './ToggleInput.vue';
import OpenLink from './icons/OpenLink.vue';

type NavItem = {
  name: string,
  href: string,
  class?: string,
  children?: NavItem[]
}

const sidebarItems: NavItem[] = [
  {
    name: 'Feature Guide',
    href: 'https://vaultlens.com/feature-guide.html',
    class: 'font-bold focus:outline-hidden text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
  },
  {
    name: 'Quickstart',
    href: 'https://vaultlens.com/getting-started.html',
    class: 'font-bold focus:outline-hidden text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
  },
  {
    name: 'Settings',
    href: '#core-settings',
    children: [
      {
        name: 'Import / Export Settings',
        href: '#core-settings'
      },
      {
        name: 'Obsidian Connection',
        href: '#connection-settings',
        children: [
          {
            name: 'Omnisearch',
            href: '#omnisearch'
          },
          {
            name: 'Local REST API',
            href: '#local-rest-api'
          },
        ]
      },
      {
        name: 'Theme',
        href: '#display-settings'
      },
      {
        name: 'Sidebar & Page Icon',
        href: '#sidebar'
      },
      {
        name: 'Page Notes & Link Hover Notifications',
        href: '#page-notes'
      },
      {
        name: 'Instant Live Search & Note Recall',
        href: '#live-search'
      },
      {
        name: 'Embedded Search Results',
        href: '#embedded-results'
      },
      {
        name: 'Search Details',
        href: '#search-details'
      },
      {
        name: 'Hotkeys',
        href: '#hotkey-settings'
      },
      {
        name: 'Periodic Notes',
        href: '#periodic-notes'
      }
    ]
  },
  {
    name: 'Privacy & Permissions',
    href: '#privacy'
  },
  {
    name: 'Contact & Credits',
    href: '#contact'
  }
];

const navbarItems: NavItem[] = [
  {
    name: 'About',
    href: 'https://vaultlens.com/why.html',
  },
  {
    name: 'Creator',
    href: 'https://jakobosterberger.com'
  },
  {
    name: 'Documentation',
    href: 'https://vaultlens.com'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/jk-oster/obsidian-search-for-web'
  }
];

const tabService = getTabService();
const noteService = getNoteService();

const file = ref<HTMLInputElement | null>(null);

async function exportBugReport() {
  const manifest = await tabService.getManifest();
  const browserDetails = navigator.userAgent;
  const platform = usePlatform();
  const dateTime = new Date().toISOString();
  let localRest = null;

  try {
    localRest = await noteService.fetchMetaData(proxyToPlainObject(store));
    console.log(localRest);
  } catch (e) {
    console.error(e);
  }

  exportSettings({
    meta: {
      dateTime,
      platform,
      browserDetails,
      manifest,
      localRest,
    }
  }, 'bug-report.json');
}

function exportSettings(details = {}, name: string = 'settings.json') {
  const {apiKey, ...settings} = proxyToPlainObject(store);
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({...details, ...settings}, null, 2));
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
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

.prose :where(li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
  margin-top: 0.125em;
  margin-bottom: 0.125em;
}
.prose :where(p):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
  margin-bottom: 0.75em;
}

/* Hide scrollbar by default */
#sidebar ::-webkit-scrollbar {
  width: 8px; /* Adjust width as needed */
  height: 4px;
  border-radius: 3px;
  background: transparent;
}

/* Handle (thumb) */
#sidebar ::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
  transition: background 0.3s ease-in-out;
}

#sidebar * {
  scroll-margin-top: 70px;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
#sidebar * :hover {
  scrollbar-color: #666 transparent;
}

</style>