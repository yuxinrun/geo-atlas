import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import TableOfContents from '@/components/TableOfContents'
import MapViewer from '@/components/MapViewer'
import ArticleCard from '@/components/ArticleCard'
import { getArticle, relatedArticles } from '@/data/articles'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'
import NotFoundPage from './NotFoundPage'

export default function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)

  useEffect(() => {
    document.title = docTitle(article?.title || '文章未找到')
  }, [article])

  if (!article) return <NotFoundPage />

  const related = relatedArticles(article)

  return (
    <>
      <article className="article-page">
        <header className="article-header">
          <img className="article-header-bg" src={asset(article.cover)} alt="" aria-hidden="true" />
          <div className="container narrow">
            <Breadcrumb items={[{ label: '地理文章', to: '/articles' }, { label: article.title }]} />
            <p className="kicker light">{article.category.toUpperCase()}</p>
            <h1>{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-byline">
              <span>{article.date}</span><span>{article.readingMinutes} 分钟阅读</span><span>字数约 {Math.round(article.sections.reduce((n, s) => n + s.paragraphs.join('').length, 0))} 字</span>
            </div>
            <div className="article-tags">{article.tags.map((t) => <Link key={t} to={`/articles?tag=${encodeURIComponent(t)}`}>#{t}</Link>)}</div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="article-aside">
            <TableOfContents sections={article.sections} />
            <div className="aside-note">
              <h3>阅读提示</h3>
              <p>本文区分事实、学界观点与推论。地图为简化示意，数据均标注来源或年份。</p>
            </div>
          </aside>

          <div className="article-main">
            <div className="article-body">
              {article.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="article-section">
                  <h2><span>{String(i + 1).padStart(2, '0')}</span>{s.heading}</h2>
                  {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                  {s.list && (
                    <ul className="article-list">
                      {s.list.map((item, k) => <li key={k}>{item}</li>)}
                    </ul>
                  )}
                  {s.figure && <MapViewer figure={s.figure} />}
                  {s.callout && <aside className="callout"><strong>{s.callout.label}</strong><p>{s.callout.text}</p></aside>}
                </section>
              ))}

              <section className="article-section concepts-section">
                <h2><span>＋</span>相关地理概念</h2>
                <div className="concept-tags">
                  {article.concepts.map((c) => <Link key={c} to={`/search?q=${encodeURIComponent(c)}`}>{c}</Link>)}
                </div>
              </section>

              <section className="article-section references-section">
                <h2><span>REF</span>参考资料</h2>
                <p className="reference-intro">以下为本文涉及的可核查来源。标注“待核查”的条目表示本站尚未确认具体版本或年份，请以原始机构发布为准。</p>
                <ol>
                  {article.references.map((r, i) => (
                    <li key={i}>
                      <strong>{r.title}</strong>
                      <span>{r.source}{r.year ? ` · ${r.year}` : ''}</span>
                      {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer">访问原始来源 ↗</a>}
                      {r.note && <small>{r.note}</small>}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </article>

      <section className="section section-paper">
        <div className="container">
          <div className="section-heading">
            <div><p className="kicker">FURTHER READING</p><h2>延伸阅读</h2></div>
            <Link className="text-link" to="/articles">全部文章 →</Link>
          </div>
          <div className="card-grid three">{related.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </div>
      </section>
    </>
  )
}
