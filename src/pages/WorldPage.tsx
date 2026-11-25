import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/data/articles'
import { continents } from '@/data/continents'
import { categories } from '@/data/site'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

const entryCards = [
  { to: '/continents', title: '七大洲', desc: '构造骨架、气候格局、人口与城市体系', img: 'images/continents/asia.svg' },
  { to: '/physical-geography', title: '自然地理', desc: '山脉、河流、海洋、气候、板块与生态', img: 'maps/world-mountains.svg' },
  { to: '/human-geography', title: '人文地理', desc: '文明、人口、城市、语言与迁徙', img: 'maps/population.svg' },
  { to: '/atlas', title: '地图图鉴', desc: '可缩放的本地 SVG 地图与示意图', img: 'maps/world-simple.svg' },
]

export default function WorldPage() {
  useEffect(() => { document.title = docTitle('世界地理') }, [])

  return (
    <>
      <div className="page-hero compact-hero">
        <img src={asset('maps/world-simple.svg')} alt="" aria-hidden="true" />
        <div className="container">
          <Breadcrumb items={[{ label: '世界地理' }]} />
          <p className="kicker">WORLD GEOGRAPHY</p>
          <h1>世界地理</h1>
          <p className="page-lead">以地球整体为对象，从空间关系、尺度转换与区域比较入手，理解我们所在的行星。</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle kicker="ENTRY POINTS" title="从这里进入世界地理" />
          <div className="entry-grid">
            {entryCards.map((e) => (
              <Link key={e.to} to={e.to} className="entry-card">
                <img src={asset(e.img)} alt="" loading="lazy" />
                <div><h3>{e.title}</h3><p>{e.desc}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionTitle kicker="CORE ARTICLES" title="地球与全球格局" description="先建立框架，再进入区域。" />
          <div className="card-grid three">
            {articles.filter((a) => a.category === '地球与全球格局').map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle kicker="REGIONAL GEOGRAPHY" title="世界区域地理" />
          <div className="region-list">
            {continents.map((c, i) => (
              <Link key={c.slug} to={`/continents/${c.slug}`} className="region-row">
                <span className="region-index">{String(i + 1).padStart(2, '0')}</span>
                <div><strong>{c.name}</strong><small>{c.english}</small></div>
                <p>{c.summary}</p>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionTitle kicker="CATEGORIES" title="按主题阅读" />
          <div className="category-cards">
            {categories.map((cat, i) => (
              <Link key={cat} to={`/articles?category=${encodeURIComponent(cat)}`}>
                <span>0{i + 1}</span>
                <strong>{cat}</strong>
                <small>{articles.filter((a) => a.category === cat).length} 篇文章</small>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
