import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/data/articles'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

const pillars = [
  { title: '欧亚大陆位置', desc: '中国位于世界最大大陆的东部，兼具大陆腹地与太平洋西岸的双重属性。', img: 'maps/world-simple.svg' },
  { title: '高原与山地系统', desc: '青藏高原把中国与喜马拉雅、帕米尔、中亚高山连成一体。', img: 'maps/tibet-profile.svg' },
  { title: '季风与水汽通道', desc: '东亚季风连接西太平洋、印度洋与大陆腹地，决定降水与农业格局。', img: 'maps/asia-monsoon.svg' },
  { title: '海陆关系', desc: '海岸线、岛弧与大陆架使中国成为西太平洋海上网络的重要节点。', img: 'maps/world-plates.svg' },
]

export default function ChinaWorldPage() {
  useEffect(() => { document.title = docTitle('中国与世界') }, [])
  const list = articles.filter((a) => a.category === '中国与世界')

  return (
    <>
      <div className="page-hero china-hero">
        <img src={asset('maps/china-steps.svg')} alt="" aria-hidden="true" />
        <div className="container">
          <Breadcrumb items={[{ label: '中国与世界' }]} />
          <p className="kicker light">CHINA IN THE WORLD</p>
          <h1>中国与世界</h1>
          <p className="page-lead">把中国放回全球大陆、海洋、气候、生态与文明网络中观察——不是削弱中国地理，而是为它提供解释框架。</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle kicker="FOUR PILLARS" title="四个分析支点" description="位置、地形、气候与海陆关系，构成中国—世界比较的基本坐标。" />
          <div className="pillar-grid">
            {pillars.map((p, i) => (
              <div key={p.title} className="pillar-card">
                <img src={asset(p.img)} alt="" loading="lazy" />
                <div><span>0{i + 1}</span><h3>{p.title}</h3><p>{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionTitle kicker="ARTICLE SERIES" title="中国与世界系列文章" description={`共 ${list.length} 篇，按地理机制与区域比较组织。`} />
          <div className="card-grid three">{list.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container method-band">
          <div><p className="kicker">METHODOLOGY</p><h2>我们的比较方法</h2></div>
          <ol>
            <li><strong>区域比较</strong>：与同纬度、同气候带或同构造背景的区域对照。</li>
            <li><strong>尺度转换</strong>：在全球—大洲—国家—地方之间切换观察尺度。</li>
            <li><strong>历史演变</strong>：把现状理解为长期过程的一个片段。</li>
            <li><strong>因果机制</strong>：区分直接原因、背景条件与偶然因素。</li>
          </ol>
          <Link className="text-link" to="/topics/china-in-world">进入相关专题 →</Link>
        </div>
      </section>
    </>
  )
}
