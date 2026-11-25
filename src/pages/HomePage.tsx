import { Link } from 'react-router-dom'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/data/articles'
import { continents } from '@/data/continents'
import { books } from '@/data/books'
import { physicalTopics, humanTopics } from '@/data/site'
import { topics } from '@/data/topics'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

const chinaLinks = [
  { title: '中国在欧亚大陆的地理位置', slug: 'china-in-eurasia' },
  { title: '青藏高原与全球山地系统', slug: 'tibetan-plateau' },
  { title: '东亚季风与全球季风体系', slug: 'east-asia-monsoon' },
  { title: '中国河流与亚洲水系', slug: 'china-rivers-comparison' },
  { title: '中国地形三级阶梯与全球格局', slug: 'china-three-steps' },
  { title: '中国海岸线与西太平洋', slug: 'china-coast-west-pacific' },
  { title: '中国气候分异与全球气候带', slug: 'china-climate-zones' },
  { title: '世界农业地理看中国农业', slug: 'china-agriculture-world' },
]

const atlasItems = [
  { src: 'maps/world-simple.svg', title: '世界海陆分布图', note: '大陆与海洋的基本格局' },
  { src: 'maps/world-plates.svg', title: '世界板块构造图', note: '边界类型与地震火山带' },
  { src: 'maps/world-climate.svg', title: '世界气候带图', note: '纬度地带性示意' },
  { src: 'maps/china-steps.svg', title: '中国三级阶梯图', note: '西高东低的地形结构' },
]

export default function HomePage() {
  useEffect(() => { document.title = docTitle() }, [])

  const featured = articles.filter((a) => a.featured)
  const worldArticles = articles.filter((a) => a.category === '地球与全球格局').slice(0, 3)
  const deepArticles = articles.filter((a) => !a.featured).slice(0, 6)

  return (
    <>
      <Hero />

      {/* A. 世界观察 */}
      <section className="section section-paper" id="observe">
        <div className="container">
          <SectionTitle
            kicker="WORLD OBSERVATION · 世界观察"
            title="从全球现象开始提问"
            description="地理不是事实清单。每一篇文章都从一个问题出发：它为何发生在这里，又与其他地方有什么联系。"
            action={<Link className="text-link" to="/articles">全部文章 →</Link>}
          />
          <div className="feature-grid">
            <ArticleCard article={featured[0]} variant="feature" />
            <div className="feature-side">
              {featured.slice(1).map((a) => <ArticleCard key={a.slug} article={a} variant="compact" />)}
            </div>
          </div>
          <div className="card-grid three">
            {worldArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* B. 认识地球 */}
      <section className="section" id="earth">
        <div className="container split-section">
          <div className="split-visual">
            <img src={asset('illustrations/earth-layers.svg')} alt="地球圈层结构示意图" loading="lazy" />
          </div>
          <div className="split-text">
            <SectionTitle kicker="UNDERSTANDING THE EARTH · 认识地球" title="把地球作为一个整体" />
            <p>
              地球表面约 71% 被海洋覆盖，陆地集中于北半球。岩石圈、水圈、大气圈与生物圈在地表交叠，
              构造运动抬起山脉，流水与冰川将其削平，太阳辐射驱动环流，把热量从赤道输向两极。
            </p>
            <p>
              全球格局不是静态背景。大陆在地质时间中漂移，洋盆开合，气候带随轨道与构造变化移动。
              只有先建立地球整体的框架，区域地理、中国地理与全球问题才有可讨论的坐标系。
            </p>
            <div className="stat-row">
              <div><strong>71%</strong><span>海洋覆盖</span></div>
              <div><strong>7</strong><span>大洲划分</span></div>
              <div><strong>30+</strong><span>深度文章</span></div>
            </div>
            <div className="inline-links">
              <Link to="/world">进入世界地理 →</Link>
              <Link to="/atlas">查看地图图鉴 →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* C. 世界七大洲 */}
      <section className="section section-paper" id="continents">
        <div className="container">
          <SectionTitle
            kicker="SEVEN CONTINENTS · 世界七大洲"
            title="七个大陆，七种地理逻辑"
            description="从构造骨架、气候格局到人口与城市，每个大洲都有自身的空间结构。"
            action={<Link className="text-link" to="/continents">全部大洲 →</Link>}
          />
          <div className="continent-grid">
            {continents.map((c) => (
              <Link key={c.slug} to={`/continents/${c.slug}`} className="continent-card">
                <img src={asset(c.image)} alt={`${c.name}轮廓示意图`} loading="lazy" />
                <div className="continent-card-body">
                  <h3>{c.name}</h3>
                  <span>{c.english}</span>
                  <p>{c.summary.slice(0, 52)}…</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* D. 中国与世界 */}
      <section className="section china-section" id="china-world">
        <div className="container split-section reverse">
          <div className="split-text">
            <SectionTitle
              kicker="CHINA IN THE WORLD · 重点模块"
              title="中国与世界"
              description="不孤立介绍中国，而是把它放回欧亚大陆、季风体系、高山水系与西太平洋的全球联系中。"
            />
            <ul className="link-list">
              {chinaLinks.map((l) => (
                <li key={l.slug}><Link to={`/articles/${l.slug}`}>{l.title}<span aria-hidden="true">↗</span></Link></li>
              ))}
            </ul>
            <Link className="btn btn-dark" to="/china-world">进入中国与世界</Link>
          </div>
          <div className="split-visual">
            <img src={asset('maps/china-steps.svg')} alt="中国地形三级阶梯示意图" loading="lazy" />
            <p className="visual-caption">中国地势西高东低，呈三级阶梯下降；这条结构线连接了高原、盆地、平原与大陆架。</p>
          </div>
        </div>
      </section>

      {/* E. 自然地理专题 */}
      <section className="section section-paper" id="physical">
        <div className="container">
          <SectionTitle
            kicker="PHYSICAL GEOGRAPHY · 自然地理"
            title="山脉、河流、海洋与气候"
            action={<Link className="text-link" to="/physical-geography">进入自然地理 →</Link>}
          />
          <div className="topic-grid">
            {physicalTopics.map((t, i) => (
              <Link key={t.slug} to={`/physical-geography#${t.slug}`} className="topic-chip">
                <span className="topic-num">{String(i + 1).padStart(2, '0')}</span>
                <strong>{t.name}</strong>
                <small>{t.desc}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* F. 人文与文明 */}
      <section className="section" id="human">
        <div className="container">
          <SectionTitle
            kicker="HUMAN GEOGRAPHY · 人文与文明"
            title="人类活动的空间逻辑"
            action={<Link className="text-link" to="/human-geography">进入人文地理 →</Link>}
          />
          <div className="topic-grid">
            {humanTopics.map((t, i) => (
              <Link key={t.slug} to={`/human-geography#${t.slug}`} className="topic-chip light">
                <span className="topic-num">{String(i + 1).padStart(2, '0')}</span>
                <strong>{t.name}</strong>
                <small>{t.desc}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* G. 深度文章 */}
      <section className="section section-paper" id="articles">
        <div className="container">
          <SectionTitle
            kicker="LONG-FORM ARTICLES · 深度地理文章"
            title="杂志式阅读"
            description="每篇文章包含机制解释、区域比较、示意图与参考资料，区分事实、推论与争议。"
            action={<Link className="text-link" to="/articles">浏览全部 →</Link>}
          />
          <div className="card-grid three">
            {deepArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* H. 地理阅读 */}
      <section className="section" id="books">
        <div className="container split-section">
          <div className="split-text">
            <SectionTitle
              kicker="READING ROOM · 地理阅读"
              title="从地图走向书架"
              description="精选可核查的地理读物与三组循序渐进的阅读路径。不虚构书目，不堆砌经典名单。"
            />
            <ul className="book-mini-list">
              {books.slice(0, 4).map((b) => (
                <li key={b.title}>
                  <strong>《{b.title}》</strong>
                  <span>{b.author} · {b.level}</span>
                </li>
              ))}
            </ul>
            <Link className="btn btn-dark" to="/books">查看阅读书单</Link>
          </div>
          <div className="split-visual reading-visual">
            <img src={asset('illustrations/trade-routes.svg')} alt="全球联系网络示意图" loading="lazy" />
          </div>
        </div>
      </section>

      {/* I. 地图与图鉴 */}
      <section className="section section-paper" id="atlas">
        <div className="container">
          <SectionTitle
            kicker="MAPS & ILLUSTRATIONS · 地图与图鉴"
            title="用图看懂地理"
            description="本站地图均为本地 SVG 矢量图，可缩放、可放大查看。示意图用于表达空间关系，不作精确测绘用途。"
            action={<Link className="text-link" to="/atlas">打开图鉴 →</Link>}
          />
          <div className="atlas-grid">
            {atlasItems.map((m) => (
              <Link key={m.src} to="/atlas" className="atlas-card">
                <img src={asset(m.src)} alt={m.title} loading="lazy" />
                <div><strong>{m.title}</strong><span>{m.note}</span></div>
              </Link>
            ))}
          </div>
          <div className="topic-strip">
            {topics.map((t) => (
              <Link key={t.slug} to={`/topics#${t.slug}`}>
                <span>{t.kicker}</span>
                <strong>{t.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
