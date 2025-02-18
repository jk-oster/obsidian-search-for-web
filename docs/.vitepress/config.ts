import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Obsidian Browser Search",
  description: "Search your Obsidian vault simultaneously as you type your search in your favorite search engine.",
  themeConfig: {
    logo: '/icon128.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/getting-started' }
    ],

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: 'Why?', link: '/why' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Feature Guide', link: '/feature-guide' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Credits', link: '/credits' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jk-oster/obsidian-search-for-web' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Jakob Osterberger'
    }
  }
})
