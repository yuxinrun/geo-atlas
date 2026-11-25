import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import ArticleCard from '@/components/ArticleCard'
import { topics } from '@/data/topics'
import { getArticle } from '@/data/articles'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function TopicsPage() {
  useEffect(() => { document.title = docTitle('专题研究') }, [])
  return (
    <>
      <div className="page-hero compact-hero">
        <img src={asset('maps/world-climate.svg')} alt="" aria-hidden="true" />
        <div className="container">
          <Breadcrumb items={[{ label: '专题研究' }]} />
          <p className="kicker">TOPIC COLLECTIONS</p>
          <h1>专题研究</h1>
          <p className="page-lead">把分散的文章组织成连续的问题链：从一个概念出发，沿着空间联系一直读到全球格局。</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {topics.map((t, i) => {
            const list = t.articles.map((slug) => getArticle(slug)).filter((a) => a !== undefined)
            return (
              <div key={t.slug} id={t.slug} className="topic-block">
                <SectionTitle kicker={`${t.kicker} · 专题 0${i + 1}`} title={t.title} description={t.description} />
                <div className="topic-layout">
                  <img src={asset(t.image)} alt={`${t.title}示意图`} loading="lazy" />
                  <div className="card-grid two">
                    {list.map((a) => a && <ArticleCard key={a.slug} article={a} variant="compact" />)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
