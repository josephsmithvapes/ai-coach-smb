import { defineConfig } from 'vite'

// Plain static page: no framework, one small script for the contact form.
export default defineConfig({
  base: '/',
  build: { assetsInlineLimit: 0, modulePreload: false },
})
