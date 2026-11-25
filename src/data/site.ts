export const site = {
  name: '世界地理志',
  english: 'GeoAtlas',
  subtitle: 'A Geographic Perspective on Our World',
  slogan: '从大地出发，理解世界。',
  description:
    '世界地理志以地球为整体研究对象，以空间关系为核心，将中国地理置于全球大陆、海洋、气候、生态与文明网络中观察、比较和理解。我们提供有解释力的地理知识：区分事实、观点与争议，标注数据来源与年份，重视区域比较、尺度转换与因果机制。',
  repo: 'https://github.com/yuxinrun/geo-atlas',
}

export const navItems = [
  { label: '首页', to: '/' },
  { label: '世界地理', to: '/world' },
  { label: '中国与世界', to: '/china-world' },
  { label: '专题研究', to: '/topics' },
  { label: '地理图鉴', to: '/atlas' },
  { label: '阅读书单', to: '/books' },
  { label: '关于本站', to: '/about' },
] as const

export const categories = [
  '地球与全球格局',
  '世界区域地理',
  '中国与世界',
  '人文与经济地理',
] as const

export const physicalTopics = [
  { name: '山脉', slug: 'mountains', desc: '造山带、褶皱与全球山地系统' },
  { name: '河流', slug: 'rivers', desc: '流域、水循环与文明盆地' },
  { name: '海洋', slug: 'oceans', desc: '海盆、洋流与海陆关系' },
  { name: '气候', slug: 'climate', desc: '纬度地带性与大气环流' },
  { name: '地貌', slug: 'landforms', desc: '内外营力塑造的地表形态' },
  { name: '板块', slug: 'plates', desc: '岩石圈运动与地震火山' },
  { name: '冰川', slug: 'glaciers', desc: '冰盖、冰川与世界海平面' },
  { name: '沙漠', slug: 'deserts', desc: '干旱区形成机制与空间分布' },
  { name: '生态', slug: 'ecology', desc: '生物地理与生态系统分异' },
] as const

export const humanTopics = [
  { name: '文明起源', slug: 'civilization', desc: '大河、冲积平原与早期国家' },
  { name: '人口迁移', slug: 'migration', desc: '迁徙走廊、移民与人口重构' },
  { name: '城市', slug: 'cities', desc: '城市体系与全球城市网络' },
  { name: '语言', slug: 'languages', desc: '语言地理与扩散路径' },
  { name: '农业', slug: 'agriculture', desc: '农业起源与作物地理' },
  { name: '交通', slug: 'transport', desc: '通道、节点与可达性' },
  { name: '贸易', slug: 'trade', desc: '贸易网络与空间分工' },
] as const
