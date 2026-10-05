import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const pages = [
  'index.html',
  'about-us.html',
  'services.html',
  'fleet.html',
  'industries.html',
  'request-a-quote.html',
  'contact.html',
  'privacy-policy.html',
  'cookies.html',
  'terms.html',
  'careers.html',
  'news.html',
]

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, fileURLToPath(new URL(page, import.meta.url))])),
    },
  },
})
