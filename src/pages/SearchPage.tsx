import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import SearchBox from '@/components/SearchBox'
import ArticleCard from '@/components/ArticleCard'
import { searchArticles, articles, allTags } from '@/data/articles'
import { docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const results = searchArticles(q)

  useEffect(() => { document.title = docTitle(q ? `搜索：${q}` : '搜索') }, [q])

  const suggestions = ['季风', '青藏高原', '板块', '河流', '人口', '海洋', '农业', '城市']

  return (
    <>
      <div className="page-hero compact-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '搜索' }]} />
          <p className="kicker">SEARCH THE ATLAS</p>
          <h1>搜索</h1>
          <p className="page-lead">在本地文章中搜索标题、摘要、分类、标签与核心概念，无需服务器。</p>
          <SearchBox initial={q} />
        </div>
      </div>

      <section className="section">
        <div className="container">
          {!q ? (
            <>
              <div className="search-suggestions">
                <h2>热门检索词</h2>
                <div>{suggestions.map((s) => <Link key={s} to={`/search?q=${encodeURIComponent(s)}`}>{s}</Link>)}</div>
              </div>
              <div className="search-suggestions">
                <h2>常用标签</h2>
                <div>{allTags.slice(0, 24).map((t) => <Link key={t} to={`/search?q=${encodeURIComponent(t)}`}>#{t}</Link>)}</div>
              </div>
              <p className="result-count">浏览全部 <strong>{articles.length}</strong> 篇文章：<Link to="/articles">进入文章库 →</Link></p>
            </>
          ) : (
            <>
              <p className="result-count">“<strong>{q}</strong>” 的搜索结果：<strong>{results.length}</strong> 篇</p>
              {results.length ? (
                <div className="card-grid three">{results.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
              ) : (
                <div className="empty-state">
                  <h2>没有找到相关文章</h2>
                  <p>可以尝试更宽泛的词，或浏览全部分类与标签。</p>
                  <div className="inline-links center"><Link to="/articles">浏览文章库 →</Link><Link to="/topics">查看专题 →</Link></div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
