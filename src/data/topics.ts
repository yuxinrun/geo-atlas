export interface Topic {
  slug: string
  title: string
  kicker: string
  description: string
  image: string
  articles: string[]
}

export const topics: Topic[] = [
  {
    slug: 'earth-system',
    title: '地球作为一个系统',
    kicker: 'EARTH SYSTEM',
    description: '把大气圈、水圈、岩石圈与生物圈作为相互作用的整体，理解地表环境的形成与变化。',
    image: 'illustrations/earth-layers.svg',
    articles: ['earth-surface-structure', 'plate-tectonics', 'global-climate-system', 'world-oceans'],
  },
  {
    slug: 'china-in-world',
    title: '中国在世界中的位置',
    kicker: 'CHINA & WORLD',
    description: '把中国的地形、气候、水系与海陆关系放回欧亚大陆和全球体系中观察。',
    image: 'maps/china-steps.svg',
    articles: ['china-in-eurasia', 'tibetan-plateau', 'east-asia-monsoon', 'china-coast-west-pacific'],
  },
  {
    slug: 'mountains-water',
    title: '山脉与水系',
    kicker: 'MOUNTAINS & WATER',
    description: '从造山带到大河流域，追踪地形如何控制水流、生态与人类聚落。',
    image: 'maps/world-rivers.svg',
    articles: ['world-mountain-systems', 'world-river-basins', 'tibetan-plateau', 'china-rivers-comparison'],
  },
  {
    slug: 'climate-ecology',
    title: '气候与生态',
    kicker: 'CLIMATE & ECOLOGY',
    description: '纬度、环流与海陆分布如何共同塑造全球气候带与生态系统。',
    image: 'maps/world-climate.svg',
    articles: ['global-climate-system', 'global-deserts', 'antarctica-ice', 'china-climate-zones'],
  },
  {
    slug: 'civilization-networks',
    title: '文明与网络',
    kicker: 'CIVILIZATION & NETWORKS',
    description: '从河流文明到海上贸易与全球产业分工，理解人类活动的空间组织。',
    image: 'illustrations/trade-routes.svg',
    articles: ['ancient-civilizations-rivers', 'maritime-trade-routes', 'global-urban-networks', 'globalization-geography'],
  },
  {
    slug: 'population-resources',
    title: '人口与资源',
    kicker: 'POPULATION & RESOURCES',
    description: '人口分布、能源资源与产业分工背后的地理约束与历史路径。',
    image: 'maps/population.svg',
    articles: ['world-population-distribution', 'world-energy-resources', 'global-industry-division', 'human-migration'],
  },
]
