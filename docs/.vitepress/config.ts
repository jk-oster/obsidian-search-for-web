import { defineConfig, HeadConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vault Lens",
  description: "Search your Obsidian notes simultaneously as you type your search in your favorite search engine.",
  lastUpdated: true,

  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = []

    head.push(['meta', { property: 'og:title', content: pageData.frontmatter?.title ?? '' }])
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter?.description ?? '' }])
    head.push(['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '128x128' }])
    head.push(['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }])
    head.push(['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }])
    head.push(['link', { rel: 'shortcut icon', href: '/favicon.ico' }])
    head.push(['link', { rel: 'manifest', href: '/site.webmanifest' }])
    
    return head
  },

  sitemap: {
    hostname: 'https://vaultlens.com'
  },
  
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {

    editLink: {
      pattern: 'https://github.com/jk-oster/obsidian-search-for-web/edit/master/docs/:path'
    },

    search: {
      provider: 'local'
    },
    logo: './public/icon128.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Install', link: 'https://chromewebstore.google.com/detail/obsidian-browser-search/ikdemlfoilfdmcdiegelchlhfnkpmaee' },
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
          { text: 'FAQ & Troubleshooting', link: '/faq' },
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'Privacy & Permissions', link: '/privacy' },
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
