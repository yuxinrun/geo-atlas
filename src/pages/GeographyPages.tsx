import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/data/articles'
import { physicalTopics, humanTopics } from '@/data/site'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

interface PageConfig {
  title: string
  english: string
  lead: string
  heroImg: string
  topics: readonly { name: string; slug: string; desc: string }[]
  category?: string
  tags?: string[]
}

function GeographyPage({ config }: { config: PageConfig }) {
  useEffect(() => { document.title = docTitle(config.title) }, [config.title])
  const list = config.category
    ? articles.filter((a) => a.category === config.category)
    : articles.filter((a) => config.tags?.some((t) => a.tags.includes(t)))

  return (
    <>
      <div className="page-hero compact-hero navy-hero">
        <div className="container">
          <Breadcrumb items={[{ label: config.title }]} />
          <p className="kicker light">{config.english}</p>
          <h1>{config.title}</h1>
          <p className="page-lead">{config.lead}</p>
        </div>
      </div>
      <section className="section" id="topics">
        <div className="container">
          <SectionTitle kicker="KEY CONCEPTS" title="核心概念与议题" />
          <div className="concept-grid">
            {config.topics.map((t, i) => (
              <div key={t.slug} id={t.slug} className="concept-card">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-paper">
        <div className="container">
          <SectionTitle kicker="READING" title="相关深度文章" description={`${list.length} 篇文章，按机制解释与空间联系组织。`} />
          <div className="card-grid three">
            {list.length ? list.map((a) => <ArticleCard key={a.slug} article={a} />) : articles.slice(0, 6).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
          <div className="inline-links center"><Link to="/articles">浏览全部文章 →</Link><Link to="/atlas">查看地图图鉴 →</Link></div>
        </div>
      </section>
      <div className="hidden-asset" aria-hidden="true"><img src={asset(config.heroImg)} alt="" /></div>
    </>
  )
}

export function PhysicalGeographyPage() {
  return <GeographyPage config={{
    title: '自然地理', english: 'PHYSICAL GEOGRAPHY',
    lead: '从板块运动到气候环流，从山地抬升到流水侵蚀——理解地表过程，才能理解区域差异的来由。',
    heroImg: 'maps/world-mountains.svg', topics: physicalTopics,
  }} />
}

export function HumanGeographyPage() {
  return <GeographyPage config={{
    title: '人文地理', english: 'HUMAN GEOGRAPHY',
    lead: '文明、人口、城市、语言与迁徙并非随机分布。它们沿通道展开，在节点集聚，受制度与环境共同约束。',
    heroImg: 'maps/population.svg', topics: humanTopics,
    category: '人文与经济地理',
  }} />
}

export function EconomicGeographyPage() {
  return <GeographyPage config={{
    title: '经济地理', english: 'ECONOMIC GEOGRAPHY',
    lead: '区位、集聚、分工与通道，是经济地理的四个关键词。把产业放回空间，才能理解全球化中的中心与边缘。',
    heroImg: 'illustrations/trade-routes.svg',
    topics: [
      { name: '区位选择', slug: 'location', desc: '成本、市场、集聚与制度如何决定产业位置' },
      { name: '产业集群', slug: 'clusters', desc: '共享、溢出与路径依赖' },
      { name: '全球价值链', slug: 'value-chain', desc: '研发、制造、物流与营销的空间拆分' },
      { name: '能源地理', slug: 'energy', desc: '资源分布、通道与转型空间' },
      { name: '海上贸易', slug: 'trade', desc: '港口体系与咽喉点' },
      { name: '区域联系', slug: 'linkages', desc: '网络层级与空间不平等' },
    ],
    tags: ['全球分工', '供应链', '能源地理', '港口', '全球化'],
  }} />
}

export function HistoricalGeographyPage() {
  return <GeographyPage config={{
    title: '历史地理', english: 'HISTORICAL GEOGRAPHY',
    lead: '今天的山川、聚落与边界是长期过程的积累。历史地理关注空间如何随时间变化，以及人类如何理解这种变化。',
    heroImg: 'maps/world-rivers.svg',
    topics: [
      { name: '文明起源', slug: 'origins', desc: '大河冲积平原与早期国家' },
      { name: '通道与走廊', slug: 'corridors', desc: '丝绸之路、草原与海上航线' },
      { name: '人口迁移', slug: 'migration', desc: '迁徙路径与区域文化扩散' },
      { name: '城市演变', slug: 'cities', desc: '港口、行政中心与产业城市' },
      { name: '环境变迁', slug: 'environment', desc: '气候波动与土地利用历史' },
      { name: '地图史', slug: 'cartography', desc: '地图作为认识世界的方式' },
    ],
    tags: ['历史地理', '文明起源', '通道', '迁移'],
  }} />
}
