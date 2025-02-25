import { defineConfig, HeadConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/obsidian-search-for-web/',
  title: "Obsidian Browser Search",
  description: "Search your Obsidian vault simultaneously as you type your search in your favorite search engine.",
  lastUpdated: true,

transformHead: ({ pageData }) => {
    const head: HeadConfig[] = []

    head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
    
    return head
  },

  sitemap: {
    hostname: 'https://jk-oster.github.io'
  },
  
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {

    editLink: {
      pattern: 'https://github.com/jk-oster/obsidian-search-for-web/edit/master/docs/:path'
    },

    search: {
      provider: 'local'
    },
    logo: '/icon128.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Creator', link: 'https://www.jakobosterberger.com' }
    ],

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: 'Why?', link: '/why' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Feature Guide', link: '/feature-guide' },
          { text: 'Special Frontmatter Fields', link: '/frontmatter-fields' },
          { text: 'FAQ and Troubleshooting', link: '/faq' },
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Permisions', link: '/permissions' },
          { text: 'Credits', link: '/credits' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jk-oster/obsidian-search-for-web' }
    ],

    footer: {
      message: 'Released under the GPLv3 License.',
      copyright: 'Copyright © 2023-present Jakob Osterberger'
    }
  }
})
