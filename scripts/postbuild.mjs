import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')
const notFound = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('[postbuild] dist/index.html not found')
  process.exit(1)
}

const fixAssetPaths = (html) =>
  html
    .replace('content="./images/', 'content="/geo-atlas/images/')
    .replace('href="./icons/', 'href="/geo-atlas/icons/')

writeFileSync(index, fixAssetPaths(readFileSync(index, 'utf8')))
copyFileSync(index, notFound)

const marker = '<script type="module"'
let html = readFileSync(notFound, 'utf8')
const redirectScript = `<script>
(function () {
  if (window.location.pathname.indexOf('/404.html') !== -1) {
    var rest = window.location.pathname.split('/404.html')[0] + window.location.search + window.location.hash
    sessionStorage.setItem('geo-atlas-redirect', rest)
    window.location.replace('/geo-atlas/')
  }
})()
</script>
`
html = html.replace(marker, redirectScript + marker)
writeFileSync(notFound, html)

mkdirSync(resolve(process.cwd(), 'public'), { recursive: true })
console.log('[postbuild] 404.html generated for GitHub Pages SPA fallback')
