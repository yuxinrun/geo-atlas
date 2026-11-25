import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import { books, readingPaths } from '@/data/books'
import { docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function BooksPage() {
  useEffect(() => { document.title = docTitle('阅读书单') }, [])
  return (
    <>
      <div className="page-hero compact-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '阅读书单' }]} />
          <p className="kicker">READING LIST</p>
          <h1>阅读书单</h1>
          <p className="page-lead">只列本站能够确认存在的读物。版本信息不确定的条目标明待核查；不以“经典”代替真正的阅读建议。</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle kicker="CURATED BOOKS" title="精选书目" description={`${books.length} 本（种）读物，按入门、进阶与经典标注阅读阶段。`} />
          <div className="book-grid">
            {books.map((b, i) => (
              <article key={b.title} className="book-card">
                <div className="book-index">{String(i + 1).padStart(2, '0')}</div>
                <div className="book-card-main">
                  <div className="book-level">{b.level} · {b.category}</div>
                  <h2>《{b.title}》</h2>
                  <p className="book-author">{b.author} · {b.year}</p>
                  <p className="book-summary">{b.summary}</p>
                  <div className="book-why"><strong>为什么读</strong><p>{b.why}</p></div>
                  {b.note && <small className="book-note">版本说明：{b.note}</small>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionTitle kicker="READING PATHS" title="三条阅读路径" description="从框架建立，到中国与世界比较，再到人文与经济地理。" />
          <div className="path-grid">
            {readingPaths.map((p, i) => (
              <div key={p.name} className="path-card">
                <span>PATH 0{i + 1}</span>
                <h3>{p.name}</h3>
                <ol>{p.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
