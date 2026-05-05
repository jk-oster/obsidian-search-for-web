# CLAUDE.md

This file provides guidance to AI-Agents when working with code in this repository.

## What this project is

**Vault Lens** (formerly Obsidian Browser Search) is a browser extension (Chrome + Firefox) that surfaces Obsidian vault notes alongside web search results and on visited URLs. It connects to either the [Obsidian Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api) plugin or the [Omnisearch](https://github.com/scambier/obsidian-omnisearch) plugin running locally.

## Commands

```bash
# Development (Chrome, auto-launches browser with extension loaded)
pnpm dev

# Development (Firefox)
pnpm dev-firefox

# Type check only
pnpm check-types

# Full build (type-check + Chrome + Firefox + zip)
pnpm build

# Build for single target
pnpm build-chrome
pnpm build-firefox

# Docs site (VitePress)
pnpm docs:dev
pnpm docs:build

# Versioning + build (auto-commits with [RELEASE] prefix and builds)
pnpm version-patch   # e.g. 2.6.2 → 2.6.3
pnpm version-minor
pnpm version-major
```

Output goes to `./dist/chrome/` and `./dist/firefox/`. The `zip` step produces `dist.zip` for store uploads.

There are no automated tests.

## Architecture

This is a **Vite + Vue 3 + TypeScript** browser extension built with [`vite-plugin-web-extension`](https://github.com/aklinker1/vite-plugin-web-extension).

### Extension entry points

| Entry | Purpose |
|-------|---------|
| `src/background.ts` | Service worker / background script — initialises services on install, handles toolbar icon click (pin/unpin sidebar) |
| `src/content-scripts/content.ts` | Injected into every `https/http` page — mounts the OffCanvas sidebar and embedded search results into the host page |
| `src/options/options.{ts,html}` | Full settings page |
| `src/popup/popup.{ts,html}` | Toolbar popup |
| `src/side-panel/side-panel.{ts,html}` | Browser side panel (Chrome) |

### Cross-context communication

Background services (`BadgeService`, `NoteService`, `TabService`, `ConnectionService`) live in the background worker and are exposed to content scripts/popups via `@webext-core/proxy-service`. The pattern is:

```ts
// background.ts — register once
registerNoteService();

// anywhere else — use the proxy
const noteService = getNoteService();
await noteService.fetchLocalRest(query, config);
```

Extension settings are synced via `browser.storage.sync`. `src/store.ts` keeps a reactive Vue store (`store`) two-way synced to storage using `@webext-core/storage` and `@vueuse/core` watchers. Components import `store` directly.

### Search providers

Two providers, switched by `store.provider`:

- **`local-rest`** — talks to the Obsidian Local REST API at `127.0.0.1:27123` (default). Uses `POST /search/simple/` for text search, `GET /vault/:file` for note content, `GET/POST /periodic/:period` for daily/weekly notes.
- **`omni-search`** — talks to Omnisearch at `localhost:51361`. Uses `GET /search?q=`.

Both providers are abstracted in `src/background-services/NoteService.ts` and normalise results to the `NoteMatch` type (`src/types.ts`).

### Content script injection strategy

The sidebar (`OffCanvas.vue`) is mounted inside a shadow DOM created by `@webext-core/isolated-element` to prevent host-page CSS leaking in. The embedded results (`EmbeddedResults.vue`) are injected directly into the page DOM (into the sidebar/main column of the matching search engine).

Search engine targets and their CSS selectors are defined in `src/config.ts → pageOptions[]`. Adding support for a new search engine means adding an entry there.

### Browser targeting

`TARGET` env var (`chrome` default / `firefox`) controls:
- Manifest version (MV3 for Chrome, MV2 for Firefox) via `{{chrome}}.` / `{{firefox}}.` template keys in `src/manifest.json`
- `__BROWSER__` global available at runtime for browser-specific code paths

The `patches/` directory contains a patch for `@splidejs/vue-splide` applied automatically via `patch-package` on `pnpm install`.

### Config / defaults

`src/config.ts` contains:
- `config` — the default `ExtensionConfig` object (also used as migration base)
- `MIGRATION` — semver string; bumping this triggers a storage migration on next browser start
- `pageOptions[]` — search engine definitions
- `inputSelector` — CSS selector used to detect the active search input on a page

### File structure

```
src/
├── manifest.json                        # Extension manifest (MV3/MV2 via template keys)
├── background.ts                        # Service worker entry point
├── config.ts                            # Defaults, pageOptions[], inputSelector
├── store.ts                             # Reactive Vue store synced to browser.storage.sync
├── types.ts                             # Shared TypeScript types (NoteMatch, ExtensionConfig, …)
├── search.ts                            # useSearch() composable — fetches & paginates results
├── connection.ts                        # Connection health checks
├── storage.ts                           # Storage helpers
├── hotkeys.ts                           # useHotkeys() composable
├── highlighter.ts                       # Text highlighting logic
├── hover.ts / hoveredLink.ts            # Link-hover note badge logic
├── dedicatedNote.ts                     # Dedicated-note detection
├── preview.ts                           # Note preview logic
├── platform.ts                          # Browser platform utilities
├── firefox-util.ts                      # Firefox-specific workarounds
├── vite-env.d.ts                        # Vite type shims
│
├── background-services/
│   ├── NoteService.ts                   # Fetches notes from local-rest / omni-search, normalises to NoteMatch
│   ├── TabService.ts                    # Tab management (open URL, options page, …)
│   ├── BadgeService.ts                  # Toolbar badge (icon colour + count)
│   └── ConnectionService.ts            # Tracks provider connection state
│
├── content-scripts/
│   └── content.ts                       # Injected into every http/https page; mounts sidebar + embedded results
│
├── components/
│   ├── OffCanvas.vue                    # Collapsible sidebar (shadow DOM, wraps SearchResults)
│   ├── SearchResults.vue                # Sidebar search UI + result list
│   ├── EmbeddedResults.vue              # Picks the right per-engine results component
│   ├── GoogleResults.vue                # Native-style Google result cards
│   ├── BingResults.vue                  # Native-style Bing result cards
│   ├── DuckDuckGoResults.vue            # Native-style DDG result cards
│   ├── KagiResults.vue                  # Native-style Kagi result cards
│   ├── GenericResults.vue               # Fallback for other engines
│   ├── ResultCard.vue                   # Single result card (sidebar)
│   ├── NotePreview.vue                  # Popover preview with markdown render
│   ├── MarkdownRenderer.vue             # Renders markdown content
│   ├── DedicatedNote.vue                # Badge shown on URL-matched pages
│   ├── OptionsPage.vue                  # Full settings page UI
│   ├── PresentationCard.vue             # Feature card (used on options/docs)
│   ├── TextInput.vue / ToggleInput.vue  # Form controls
│   ├── Toast.vue                        # Notification toast
│   ├── LoadingSpinner.vue
│   └── icons/                           # SVG icon components (Logo, Cog, Pin, …)
│
├── options/                             # Options page entry (options.html + options.ts)
├── popup/                               # Toolbar popup entry
├── side-panel/                          # Chrome side panel entry
└── style/
    └── main.css                         # Shared Tailwind + custom styles

docs/                                    # VitePress documentation site
patches/                                 # patch-package patches (@splidejs/vue-splide)
public/                                  # Static assets bundled into the extension
```

### Docs

`docs/` is a VitePress site deployed to GitHub Pages via `.github/workflows/deploy-docs.yaml`. Source lives in `docs/*.md` with config in `docs/.vitepress/`.

### Release flow

1. Run `pnpm version-patch|minor|major` — bumps `package.json`, commits with `[RELEASE]` prefix, builds and zips.
2. Push the tag — CI (`release.yaml`) rebuilds and creates a GitHub Release with `dist.zip`.
3. Manual upload to Chrome Web Store / Firefox Add-on Store via `upload.js` / `deploy.js`.
