import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { articles } from './src/data/articles/index'
import { continents } from './src/data/continents'

const BASE_URL = 'https://yuxinrun.github.io/geo-atlas/'

function sitemapPlugin(): Plugin {
  return {
    name: 'geo-atlas-sitemap',
    apply: 'build',
    closeBundle() {
      const routes = [
        '/', '/world', '/continents', '/china-world', '/physical-geography',
        '/human-geography', '/economic-geography', '/historical-geography',
        '/topics', '/articles', '/atlas', '/books', '/about', '/search',
        ...continents.map((c) => `/continents/${c.slug}`),
        ...articles.map((a) => `/articles/${a.slug}`),
      ]
      const urls = routes
        .map((route) => `  <url><loc>${BASE_URL}${route.replace(/^\//, '')}</loc></url>`)
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), xml, 'utf8')
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [react(), sitemapPlugin()],
  base: command === 'build' ? '/geo-atlas/' : '/',
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}))
