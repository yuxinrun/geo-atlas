import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const ROOT = resolve(process.cwd(), 'public')
const ensure = (p) => mkdirSync(dirname(p), { recursive: true })
const save = (rel, content) => {
  const path = resolve(ROOT, rel)
  ensure(path)
  writeFileSync(path, `<?xml version="1.0" encoding="UTF-8"?>\n${content}\n`, 'utf8')
  console.log('  →', rel)
}

const W = 1000
const H = 500
const px = (lon) => ((lon + 180) / 360) * W
const py = (lat) => ((90 - lat) / 180) * H
const poly = (pts) => pts.map(([lon, lat], i) => `${i === 0 ? 'M' : 'L'}${px(lon).toFixed(1)},${py(lat).toFixed(1)}`).join(' ') + ' Z'
const line = (pts) => pts.map(([lon, lat], i) => `${i === 0 ? 'M' : 'L'}${px(lon).toFixed(1)},${py(lat).toFixed(1)}`).join(' ')

const continents = {
  asia: [[26,40],[35,42],[45,40],[50,30],[56,25],[60,25],[68,24],[72,20],[77,8],[80,10],[80,20],[88,22],[92,21],[95,16],[100,13],[104,10],[107,15],[105,21],[110,21],[117,23],[121,30],[122,38],[126,40],[130,43],[135,48],[140,53],[143,59],[150,60],[160,61],[170,66],[179,66],[179,72],[160,70],[140,73],[120,74],[100,76],[80,74],[70,72],[60,70],[50,68],[40,66],[30,70],[28,60],[30,50],[26,45]],
  europe: [[-10,36],[-9,43],[-2,43],[0,49],[-5,50],[-2,58],[5,58],[10,55],[8,63],[15,68],[25,70],[30,65],[28,60],[30,55],[35,55],[40,48],[30,45],[28,41],[20,40],[15,38],[12,45],[5,43],[-2,36]],
  africa: [[-17,15],[-16,20],[-10,26],[-5,32],[0,36],[10,37],[20,32],[25,32],[32,31],[35,28],[38,22],[43,12],[51,12],[48,5],[42,-1],[40,-10],[35,-20],[32,-26],[27,-34],[20,-35],[18,-30],[12,-18],[9,-5],[9,4],[3,6],[-5,5],[-10,6]],
  northAmerica: [[-168,66],[-160,70],[-140,70],[-125,70],[-110,68],[-95,68],[-85,70],[-75,68],[-65,60],[-55,52],[-60,47],[-70,45],[-75,40],[-80,30],[-82,25],[-90,29],[-95,25],[-97,20],[-105,20],[-110,24],[-115,30],[-120,34],[-125,42],[-125,50],[-135,58],[-150,60]],
  southAmerica: [[-80,10],[-72,12],[-62,10],[-52,5],[-50,0],[-44,-2],[-38,-6],[-35,-8],[-39,-15],[-40,-22],[-48,-25],[-53,-34],[-57,-38],[-62,-42],[-65,-50],[-70,-55],[-75,-50],[-73,-42],[-72,-30],[-70,-20],[-75,-10],[-80,-5],[-81,2]],
  oceania: [[113,-22],[114,-30],[118,-35],[125,-33],[132,-32],[138,-35],[145,-38],[150,-37],[153,-28],[152,-24],[146,-19],[142,-11],[136,-12],[130,-11],[125,-14],[120,-20]],
  antarctica: [[-180,-70],[-150,-72],[-120,-73],[-90,-72],[-60,-68],[-30,-70],[0,-69],[30,-68],[60,-67],[90,-66],[120,-67],[150,-72],[180,-70],[180,-89],[-180,-89]],
}

const graticule = (step = 30, color = '#9fb3b8', opacity = 0.18) => {
  let s = ''
  for (let lon = -180; lon <= 180; lon += step) {
    const x = px(lon).toFixed(1)
    s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="0.8"/>`
  }
  for (let lat = -60; lat <= 60; lat += step) {
    const y = py(lat).toFixed(1)
    s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="0.8"/>`
  }
  return s
}

const landPaths = (fill, stroke, extra = '') =>
  Object.values(continents).map((pts) => `<path d="${poly(pts)}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round" ${extra}/>`).join('\n  ')

const defs = (id) => `
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1b3a52"/>
      <stop offset="100%" stop-color="#0f2333"/>
    </linearGradient>
    <clipPath id="clip-${id}"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>
  </defs>`

console.log('生成 SVG 资源：')

// 世界简图
save('maps/world-simple.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="世界海陆分布简图">
  <title>世界海陆分布简图</title>
  <rect width="${W}" height="${H}" fill="#e6eef0"/>
  ${graticule(30, '#31594D', 0.16)}
  ${landPaths('#c9d6c5', '#31594D')}
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="15" fill="#14283C" opacity="0.85">
    <text x="${px(85)}" y="${py(48)}">亚洲</text>
    <text x="${px(15)}" y="${py(50)}">欧洲</text>
    <text x="${px(18)}" y="${py(2)}">非洲</text>
    <text x="${px(-100)}" y="${py(45)}">北美洲</text>
    <text x="${px(-62)}" y="${py(-15)}">南美洲</text>
    <text x="${px(133)}" y="${py(-25)}">大洋洲</text>
    <text x="${px(-20)}" y="${py(-78)}" font-size="12">南极洲</text>
  </g>
</svg>`)

// 世界气候带
const climateBands = [
  { y1: -90, y2: -60, c: '#c9d8e4', label: '寒带' },
  { y1: -60, y2: -30, c: '#a9c2bf', label: '温带' },
  { y1: -30, y2: 0, c: '#d8c8a8', label: '热带/副热带' },
  { y1: 0, y2: 30, c: '#d8c8a8', label: '热带/副热带' },
  { y1: 30, y2: 60, c: '#a9c2bf', label: '温带' },
  { y1: 60, y2: 90, c: '#c9d8e4', label: '寒带' },
].map((b) => `<rect x="0" y="${py(b.y1).toFixed(1)}" width="${W}" height="${(py(b.y2) - py(b.y1)).toFixed(1)}" fill="${b.c}"/>`).join('\n  ')
save('maps/world-climate.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="世界气候带示意图">
  <title>世界气候带示意图</title>
  ${climateBands}
  ${graticule(30, '#ffffff', 0.25)}
  ${landPaths('none', '#14283C')}
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="13" fill="#14283C">
    <text x="12" y="${py(72)}">寒带</text><text x="12" y="${py(42)}">温带</text>
    <text x="12" y="${py(14)}">热带／副热带</text><text x="12" y="${py(-13)}">热带／副热带</text>
    <text x="12" y="${py(-44)}">温带</text><text x="12" y="${py(-74)}">寒带</text>
  </g>
</svg>`)

// 板块构造
const boundaries = [
  [[-30,62],[-25,45],[-15,25],[-12,5],[-15,-15],[-10,-35],[-8,-55]],
  [[-110,22],[-105,5],[-110,-15],[-115,-35]],
  [[30,36],[48,32],[68,30],[88,28],[98,26]],
  [[35,12],[38,2],[36,-10],[34,-18]],
  [[-150,58],[-130,48],[-120,35],[-105,20],[-92,14],[-82,2],[-76,-18],[-73,-38],[-70,-55]],
  [[122,50],[132,42],[142,36],[150,44],[160,54],[172,60]],
  [[60,25],[68,10],[72,-5],[66,-20]],
]
save('maps/world-plates.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="世界板块构造示意图">
  <title>世界板块构造示意图（简化）</title>
  <rect width="${W}" height="${H}" fill="#eef2ee"/>
  ${graticule(30, '#31594D', 0.12)}
  ${landPaths('#dfe7dc', '#89918E')}
  ${boundaries.map((b) => `<path d="${line(b)}" fill="none" stroke="#B4543C" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="7 4"/>`).join('\n  ')}
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="12" fill="#14283C" opacity="0.8">
    <text x="${px(-145)}" y="${py(50)}">太平洋板块</text>
    <text x="${px(-35)}" y="${py(20)}">美洲板块</text>
    <text x="${px(15)}" y="${py(50)}">欧亚板块</text>
    <text x="${px(20)}" y="${py(-10)}">非洲板块</text>
    <text x="${px(75)}" y="${py(-30)}">印度洋板块</text>
  </g>
  <text x="12" y="488" font-family="sans-serif" font-size="11" fill="#89918E">简化示意，边界位置仅供教学参考</text>
</svg>`)

// 山脉
const mountains = [
  [[-78,8],[-75,-5],[-70,-18],[-70,-30],[-72,-45]],
  [[-125,55],[-115,45],[-108,35],[-105,25]],
  [[72,32],[80,30],[88,28],[96,28],[102,27]],
  [[5,46],[10,46],[15,47],[20,47]],
  [[60,48],[60,58],[60,68]],
  [[40,38],[45,40],[50,38]],
]
const peaks = [[-70,-20],[-110,40],[86,28],[12,46]]
save('maps/world-mountains.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="世界主要山脉分布示意图">
  <title>世界主要山脉分布示意图</title>
  <rect width="${W}" height="${H}" fill="#f4f1e8"/>
  ${graticule(30, '#31594D', 0.12)}
  ${landPaths('#d9dfd0', '#89918E')}
  ${mountains.map((m) => `<path d="${line(m)}" fill="none" stroke="#6B4F38" stroke-width="3.2" stroke-linecap="round"/>`).join('\n  ')}
  ${peaks.map(([lon, lat]) => { const x = px(lon), y = py(lat); return `<path d="M${x},${y - 9} L${x + 8},${y + 6} L${x - 8},${y + 6} Z" fill="#31594D"/>` }).join('\n  ')}
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="12" fill="#14283C">
    <text x="${px(-74)}" y="${py(-24)}">安第斯山脉</text>
    <text x="${px(-112)}" y="${py(40)}">落基山脉</text>
    <text x="${px(73)}" y="${py(35)}">喜马拉雅山脉</text>
    <text x="${px(4)}" y="${py(50)}">阿尔卑斯山</text>
  </g>
</svg>`)

// 河流
const rivers = [
  { pts: [[32,-2],[33,10],[32,20],[31,30]], name: '尼罗河', ox: 4, oy: -4 },
  { pts: [[-72,-5],[-60,-4],[-50,-2],[-45,0]], name: '亚马孙河', ox: -6, oy: -6 },
  { pts: [[92,33],[105,30],[115,30],[121,31]], name: '长江', ox: -4, oy: -6 },
  { pts: [[96,35],[105,35],[112,35],[119,37]], name: '黄河', ox: -4, oy: 14 },
  { pts: [[-95,47],[-93,38],[-91,30]], name: '密西西比河', ox: 4, oy: -4 },
  { pts: [[8,48],[15,47],[25,45],[29,45]], name: '多瑙河', ox: 2, oy: -6 },
]
save('maps/world-rivers.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="世界主要河流分布示意图">
  <title>世界主要河流分布示意图</title>
  <rect width="${W}" height="${H}" fill="#f2f5f2"/>
  ${graticule(30, '#31594D', 0.12)}
  ${landPaths('#dfe7dc', '#89918E')}
  ${rivers.map((r) => `<path d="${line(r.pts)}" fill="none" stroke="#3E7C9B" stroke-width="2.6" stroke-linecap="round"/>`).join('\n  ')}
  ${rivers.map((r) => { const last = r.pts[r.pts.length - 1]; return `<text x="${px(last[0]) + r.ox}" y="${py(last[1]) + r.oy}" font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="12" fill="#14283C">${r.name}</text>` }).join('\n  ')}
</svg>`)

// 人口密度示意
const popCenters = [
  [120,32,26],[112,34,16],[105,22,14],[100,13,10],[77,28,30],[88,23,22],[72,20,14],
  [121,14,12],[105,6,9],[118,40,7],[139,36,10],[-74,40,14],[-87,41,8],[-118,34,9],[-99,19,9],
  [-46,-23,12],[-70,-33,7],[0,51,8],[2,48,9],[13,52,7],[30,50,9],[28,-26,6],[31,30,10],
  [3,6,8],[-3,5,7],[-75,10,5],[-58,-34,5],[151,-34,5],
]
let dots = ''
for (const [lon, lat, n] of popCenters) {
  for (let i = 0; i < n; i++) {
    const a = i * 2.399, r = Math.sqrt(i) * 6
    const x = px(lon) + Math.cos(a) * r * 1.7
    const y = py(lat) + Math.sin(a) * r
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#14283C" opacity="0.7"/>`
  }
}
save('maps/population.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="世界人口分布示意图">
  <title>世界人口分布示意图</title>
  <rect width="${W}" height="${H}" fill="#f4f1e8"/>
  ${graticule(30, '#31594D', 0.1)}
  ${landPaths('#dfe7dc', '#89918E')}
  ${dots}
  <text x="12" y="486" font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="11" fill="#89918E">点密度为示意表达，不代表精确人口栅格数据</text>
</svg>`)

// Hero 背景
const heroLand = landPaths('#33564F', '#7E9B8C')
save('images/hero/hero-world.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="深色世界地图与经纬网背景">
  <title>世界地理志 Hero 背景：世界地图</title>
  <defs>
    <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1B354A"/>
      <stop offset="100%" stop-color="#0C1C29"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#2A5360" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0C1C29" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#ocean)"/>
  <rect width="1600" height="900" fill="url(#glow)"/>
  <g transform="translate(0,120) scale(1.6,1.32)">
    <g opacity="0.95">${heroLand}</g>
    <g opacity="0.6">${graticule(15, '#AFC6C0', 0.35)}</g>
  </g>
  <g fill="none" stroke="#D8C8A8" stroke-width="1" opacity="0.16">
    ${[0,1,2,3,4].map((i) => `<circle cx="1120" cy="400" r="${180 + i * 60}"/>`).join('\n    ')}
  </g>
  <g fill="#D8C8A8" opacity="0.55">
    <circle cx="700" cy="250" r="2"/><circle cx="880" cy="430" r="2"/><circle cx="1230" cy="560" r="2"/>
    <circle cx="430" cy="520" r="2"/><circle cx="1060" cy="620" r="2"/>
  </g>
</svg>`)

// 七大洲卡片
const continentMeta = {
  asia: { name: '亚洲', en: 'ASIA', center: [90, 38] },
  europe: { name: '欧洲', en: 'EUROPE', center: [15, 51] },
  africa: { name: '非洲', en: 'AFRICA', center: [20, 2] },
  northAmerica: { name: '北美洲', en: 'NORTH AMERICA', center: [-100, 45] },
  southAmerica: { name: '南美洲', en: 'SOUTH AMERICA', center: [-60, -18] },
  oceania: { name: '大洋洲', en: 'OCEANIA', center: [134, -23] },
  antarctica: { name: '南极洲', en: 'ANTARCTICA', center: [0, -80] },
}
for (const [key, pts] of Object.entries(continents)) {
  const meta = continentMeta[key]
  const xs = pts.map((p) => px(p[0])), ys = pts.map((p) => py(p[1]))
  const minX = Math.max(0, Math.min(...xs) - 45), maxX = Math.min(W, Math.max(...xs) + 45)
  const minY = Math.max(0, Math.min(...ys) - 35), maxY = Math.min(H, Math.max(...ys) + 35)
  const vw = maxX - minX, vh = maxY - minY
  const local = pts.map(([lon, lat]) => [((px(lon) - minX) / vw) * 600, ((py(lat) - minY) / vh) * 380])
  save(`images/continents/${key === 'northAmerica' ? 'north-america' : key === 'southAmerica' ? 'south-america' : key}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="${meta.name}轮廓示意图">
  <title>${meta.name}轮廓示意图</title>
  <rect width="600" height="380" fill="#EDE9DD"/>
  ${[1,2,3].map((i) => `<line x1="0" y1="${i * 95}" x2="600" y2="${i * 95}" stroke="#31594D" stroke-opacity="0.1"/>`).join('\n  ')}
  <path d="${local.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')} Z" fill="#C7D2C2" stroke="#31594D" stroke-width="2" stroke-linejoin="round"/>
  <g font-family="'Noto Serif CJK SC','SimSun',serif" fill="#14283C">
    <text x="28" y="52" font-size="26" letter-spacing="4">${meta.name}</text>
    <text x="30" y="76" font-family="sans-serif" font-size="12" letter-spacing="3" fill="#89918E">${meta.en}</text>
  </g>
  <path d="M28,350 L120,350" stroke="#D8C8A8" stroke-width="3"/>
</svg>`)
}

// 中国三级阶梯
save('maps/china-steps.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" role="img" aria-label="中国地形三级阶梯示意图">
  <title>中国地形三级阶梯示意图</title>
  <rect width="800" height="420" fill="#F7F5EF"/>
  <path d="M40,110 L250,110 L290,210 L500,210 L540,300 L760,300 L760,370 L40,370 Z" fill="#D8C8A8" stroke="#31594D" stroke-width="2"/>
  <rect x="40" y="110" width="210" height="260" fill="#8FA79A" fill-opacity="0.55"/>
  <rect x="290" y="210" width="210" height="160" fill="#BFCBB4" fill-opacity="0.6"/>
  <rect x="540" y="300" width="220" height="70" fill="#D8C8A8" fill-opacity="0.7"/>
  <g font-family="'Noto Serif CJK SC','SimSun',serif" fill="#14283C" font-size="17">
    <text x="70" y="85">第一级阶梯</text><text x="320" y="185">第二级阶梯</text><text x="565" y="275">第三级阶梯</text>
  </g>
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="12" fill="#303A3E">
    <text x="70" y="150">青藏高原</text><text x="70" y="172">平均 4000 m 以上</text>
    <text x="320" y="250">高原与盆地</text><text x="320" y="272">1000—2000 m</text>
    <text x="565" y="335">平原与丘陵</text><text x="565" y="357">500 m 以下</text>
  </g>
  <path d="M60,390 L740,390" stroke="#14283C" stroke-width="1" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#14283C"/></marker></defs>
  <text x="360" y="410" font-family="sans-serif" font-size="11" fill="#89918E">西 → 东（示意，非按比例）</text>
</svg>`)

// 亚洲季风
save('maps/asia-monsoon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" role="img" aria-label="亚洲季风示意图">
  <title>亚洲季风示意图</title>
  <rect width="800" height="460" fill="#EFF3F0"/>
  <path d="M80,120 C180,60 360,50 520,90 C640,120 720,180 700,250 C670,330 520,380 360,370 C220,360 120,300 80,220 Z" fill="#D5DFD0" stroke="#31594D" stroke-width="2"/>
  <path d="M180,300 C250,340 360,360 480,340" fill="none" stroke="#3E7C9B" stroke-width="2"/>
  <defs>
    <marker id="blue" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#3E7C9B"/></marker>
    <marker id="red" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#B4543C"/></marker>
  </defs>
  <g stroke="#3E7C9B" stroke-width="3" fill="none" marker-end="url(#blue)">
    <path d="M400,430 C400,370 390,330 370,290"/>
    <path d="M540,420 C530,360 510,320 470,280"/>
    <path d="M660,390 C640,340 610,300 560,265"/>
  </g>
  <g stroke="#B4543C" stroke-width="2.4" fill="none" marker-end="url(#red)" opacity="0.85">
    <path d="M300,150 C320,200 340,240 370,280"/>
    <path d="M180,180 C230,230 280,260 330,285"/>
  </g>
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="14" fill="#14283C">
    <text x="330" y="110">亚洲大陆</text>
    <text x="330" y="420" fill="#3E7C9B">夏季风：海洋 → 大陆</text>
    <text x="55" y="60" fill="#B4543C">冬季风：大陆 → 海洋</text>
  </g>
</svg>`)

// 青藏高原剖面
save('maps/tibet-profile.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 420" role="img" aria-label="青藏高原及周边地形剖面示意图">
  <title>青藏高原及周边地形剖面示意图</title>
  <rect width="820" height="420" fill="#F7F5EF"/>
  <path d="M20,330 L160,310 L260,190 L330,110 L450,100 L540,150 L640,270 L800,300 L800,380 L20,380 Z" fill="#D8C8A8" stroke="#31594D" stroke-width="2"/>
  <path d="M20,330 L160,310 L260,190 L330,110 L450,100 L540,150 L640,270 L800,300" fill="none" stroke="#6B4F38" stroke-width="3"/>
  <line x1="20" y1="380" x2="800" y2="380" stroke="#14283C"/>
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="13" fill="#303A3E">
    <text x="40" y="355">印度洋</text>
    <text x="235" y="180">喜马拉雅山</text>
    <text x="355" y="85">青藏高原</text>
    <text x="580" y="250">四川盆地</text>
    <text x="700" y="290">东部平原</text>
  </g>
  <g font-family="sans-serif" font-size="11" fill="#89918E">
    <text x="20" y="405">剖面示意，非按比例；高程与距离不作定量依据</text>
  </g>
</svg>`)

// 地球圈层
save('illustrations/earth-layers.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="地球圈层结构示意图">
  <title>地球圈层结构示意图</title>
  <rect width="640" height="640" fill="#F7F5EF"/>
  <circle cx="320" cy="310" r="230" fill="#E5E1D3" stroke="#14283C" stroke-width="2"/>
  <circle cx="320" cy="310" r="198" fill="#C9D6C5" stroke="#31594D" stroke-width="1.5"/>
  <circle cx="320" cy="310" r="166" fill="#A9BFAE" stroke="#31594D" stroke-width="1.5"/>
  <circle cx="320" cy="310" r="126" fill="#D8C8A8" stroke="#6B4F38" stroke-width="1.5"/>
  <circle cx="320" cy="310" r="70" fill="#B4543C" opacity="0.8"/>
  <g stroke="#89918E" stroke-width="1" stroke-dasharray="4 4">
    <line x1="320" y1="80" x2="320" y2="540"/><line x1="90" y1="310" x2="550" y2="310"/>
  </g>
  <g font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="14" fill="#14283C">
    <text x="345" y="100">大气圈</text>
    <text x="345" y="140">水圈与生物圈</text>
    <text x="345" y="180">地壳</text>
    <text x="345" y="220">地幔</text>
    <text x="345" y="270">地核（示意）</text>
  </g>
  <text x="320" y="600" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#89918E">概念示意，非按比例</text>
</svg>`)

// 贸易网络
save('illustrations/trade-routes.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" role="img" aria-label="全球联系网络示意图">
  <title>全球联系网络示意图</title>
  <rect width="1000" height="500" fill="#F2F0E8"/>
  ${graticule(30, '#31594D', 0.1)}
  ${landPaths('#DCE3D8', '#89918E')}
  <defs><marker id="r" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#B4543C"/></marker></defs>
  ${[
    [[121,31],[110,10],[80,6],[43,12],[30,42],[5,50],[-70,40]],
    [[121,31],[150,40],[180,45],[-150,45],[-120,35]],
    [[-75,-20],[-40,-5],[10,0],[55,10],[100,10]],
    [[-95,20],[-80,25],[-60,30],[-10,40],[20,50]],
  ].map((r) => `<path d="${line(r)}" fill="none" stroke="#B4543C" stroke-width="2" stroke-opacity="0.75" marker-end="url(#r)"/>`).join('\n  ')}
  ${[[121,31],[5,50],[-75,40],[-10,40],[100,10],[43,12],[-46,-23]].map(([lon, lat]) => `<circle cx="${px(lon).toFixed(1)}" cy="${py(lat).toFixed(1)}" r="5" fill="#14283C"/>`).join('\n  ')}
  <text x="14" y="486" font-family="'Noto Sans CJK SC','Microsoft YaHei',sans-serif" font-size="11" fill="#89918E">航线为示意表达，不代表实际航路</text>
</svg>`)

// Logo
save('icons/logo.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="GeoAtlas 标志">
  <title>GeoAtlas 标志</title>
  <circle cx="32" cy="32" r="29" fill="#14283C"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#D8C8A8" stroke-width="1.6"/>
  <ellipse cx="32" cy="32" rx="10" ry="22" fill="none" stroke="#D8C8A8" stroke-width="1.2"/>
  <line x1="10" y1="32" x2="54" y2="32" stroke="#D8C8A8" stroke-width="1.2"/>
  <path d="M14,22 C22,26 26,20 32,24 C38,28 44,20 51,23 M14,42 C22,38 27,45 33,40 C39,36 45,43 51,40" fill="none" stroke="#7FA99A" stroke-width="2" stroke-linecap="round"/>
  <circle cx="44" cy="16" r="3" fill="#D8C8A8"/>
</svg>`)

console.log('SVG 资源生成完成')
