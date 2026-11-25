import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import ArticleCard from '@/components/ArticleCard'
import { articles, allTags } from '@/data/articles'
import { categories } from '@/data/site'
import { docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function ArticlesPage() {
  const [params, setParams] = useSearchParams()
  const [keyword, setKeyword] = useState('')
  const category = params.get('category') || '全部'
  const tag = params.get('tag') || ''

  useEffect(() => { document.title = docTitle('地理文章') }, [])

  const list = useMemo(() => articles.filter((a) => {
    if (category !== '全部' && a.category !== category) return false
    if (tag && !a.tags.includes(tag)) return false
    if (keyword.trim()) {
      const q = keyword.trim().toLowerCase()
      if (![a.title, a.summary, ...a.tags].join(' ').toLowerCase().includes(q)) return false
    }
    return true
  }), [category, tag, keyword])

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === '全部') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const activeTags = tag ? [tag] : []

  return (
    <>
      <div className="page-hero compact-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '地理文章' }]} />
          <p className="kicker">ARTICLE LIBRARY</p>
          <h1>地理文章</h1>
          <p className="page-lead">共 {articles.length} 篇。按分类与标签筛选，或用关键词在当前结果中查找。</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-panel">
            <div className="filter-row">
              <span className="filter-label">分类</span>
              <div className="filter-options">
                {['全部', ...categories].map((c) => (
                  <button key={c} type="button" className={category === c ? 'active' : ''} onClick={() => update('category', c)}>{c}</button>
                ))}
              </div>
            </div>
            <div className="filter-row">
              <span className="filter-label">标签</span>
              <div className="filter-options">
                <button type="button" className={!tag ? 'active' : ''} onClick={() => update('tag', '')}>全部</button>
                {allTags.map((t) => (
                  <button key={t} type="button" className={tag === t ? 'active' : ''} onClick={() => update('tag', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="filter-row">
              <span className="filter-label">关键词</span>
              <input type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="在当前结果中筛选标题、摘要或标签" aria-label="文章关键词筛选" />
            </div>
            {(category !== '全部' || tag || keyword) && (
              <div className="active-filters">
                <span>当前筛选：</span>
                {category !== '全部' && <button type="button" onClick={() => update('category', '全部')}>{category} ×</button>}
                {activeTags.map((t) => <button key={t} type="button" onClick={() => update('tag', '')}>{t} ×</button>)}
                {keyword && <button type="button" onClick={() => setKeyword('')}>{keyword} ×</button>}
                <Link to="/articles" onClick={() => setKeyword('')}>清除全部</Link>
              </div>
            )}
          </div>

          <p className="result-count">找到 <strong>{list.length}</strong> 篇文章</p>
          {list.length ? (
            <div className="card-grid three">{list.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
          ) : (
            <div className="empty-state">
              <h2>没有匹配的文章</h2>
              <p>试试更宽泛的关键词，或清除筛选条件。</p>
              <Link className="btn btn-dark" to="/articles">查看全部文章</Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
