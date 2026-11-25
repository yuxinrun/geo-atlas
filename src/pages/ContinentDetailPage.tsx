import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import MapViewer from '@/components/MapViewer'
import ArticleCard from '@/components/ArticleCard'
import { continents, getContinent } from '@/data/continents'
import { articles } from '@/data/articles'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'
import NotFoundPage from './NotFoundPage'

export default function ContinentDetailPage() {
  const { slug = '' } = useParams()
  const continent = getContinent(slug)
  useEffect(() => { document.title = docTitle(continent ? `${continent.name}地理` : '未找到大洲') }, [continent])

  if (!continent) return <NotFoundPage />

  const related = articles.filter((a) => a.tags.includes(continent.name) || a.slug.includes(slug)).slice(0, 3)
  const fallback = articles.filter((a) => a.category === '世界区域地理').slice(0, 3)
  const index = continents.findIndex((c) => c.slug === slug)
  const next = continents[(index + 1) % continents.length]

  return (
    <>
      <div className="page-hero continent-hero">
        <img src={asset(continent.image)} alt="" aria-hidden="true" />
        <div className="container">
          <Breadcrumb items={[{ label: '七大洲', to: '/continents' }, { label: continent.name }]} />
          <p className="kicker light">{continent.english.toUpperCase()} · CONTINENT</p>
          <h1>{continent.name}</h1>
          <p className="page-lead">{continent.summary}</p>
        </div>
      </div>

      <section className="section">
        <div className="container narrow">
          <div className="fact-strip">
            {continent.facts.map((f) => (
              <div key={f.label}>
                <span>{f.label}</span>
                <strong>{f.value}</strong>
                {f.note && <small>{f.note}</small>}
              </div>
            ))}
          </div>
          <div className="article-body">
            {continent.body.map((s, i) => (
              <section key={s.id} id={s.id} className="article-section">
                <h2><span>{String(i + 1).padStart(2, '0')}</span>{s.heading}</h2>
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                {s.figure && <MapViewer figure={s.figure} />}
                {s.callout && <aside className="callout"><strong>{s.callout.label}</strong><p>{s.callout.text}</p></aside>}
              </section>
            ))}
          </div>
          <div className="highlight-box">
            <h3>值得继续追问</h3>
            <ul>{continent.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <div className="section-heading">
            <div><p className="kicker">RELATED READING</p><h2>相关阅读</h2></div>
            <Link className="text-link" to={`/continents/${next.slug}`}>下一洲：{next.name} →</Link>
          </div>
          <div className="card-grid three">
            {(related.length ? related : fallback).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>
    </>
  )
}
