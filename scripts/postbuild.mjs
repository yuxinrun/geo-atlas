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
  var base = '/geo-atlas/'
  var p = window.location.pathname
  var suffix = window.location.search + window.location.hash
  var target = null
  if (p.indexOf('/404.html') !== -1) {
    target = p.split('/404.html')[0] + suffix
  } else if (p.indexOf(base) === 0) {
    var rest = p.slice(base.length)
    if (rest && rest !== 'index.html') target = p + suffix
  } else {
    target = base + suffix.replace(/^#\\//, '')
  }
  if (target) {
    sessionStorage.setItem('geo-atlas-redirect', target)
    window.location.replace(base)
  }
})()
</script>
`
html = html.replace(marker, redirectScript + marker)
writeFileSync(notFound, html)

mkdirSync(resolve(process.cwd(), 'public'), { recursive: true })
console.log('[postbuild] 404.html generated for GitHub Pages SPA fallback')
