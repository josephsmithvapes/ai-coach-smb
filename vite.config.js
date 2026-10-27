import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

// Static site: the home page plus the generated service and FAQ pages (see scripts/build-pages.mjs).
const pages = ['index.html', 'faq/index.html', ...fs.readdirSync('services').map((d) => `services/${d}/index.html`)]

export default defineConfig({
  base: '/',
  build: {
    assetsInlineLimit: 0,
    modulePreload: false,
    rollupOptions: { input: Object.fromEntries(pages.map((p) => [p.replace(/\/index\.html$|\.html$/, '') || 'index', path.resolve(p)])) },
  },
})
