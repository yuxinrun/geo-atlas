import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import { continents } from '@/data/continents'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function ContinentsPage() {
  useEffect(() => { document.title = docTitle('七大洲') }, [])
  return (
    <>
      <div className="page-hero compact-hero navy-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '七大洲' }]} />
          <p className="kicker light">SEVEN CONTINENTS</p>
          <h1>七大洲</h1>
          <p className="page-lead">大陆不是静态舞台。构造、气候、水系与人类活动在每个大陆上形成独特的空间结构。</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <SectionTitle kicker="OVERVIEW" title="七个大陆，七种地理逻辑" description="点击任一洲，阅读它的构造骨架、气候格局、区域差异与代表性事实。" />
          <div className="continent-grid large">
            {continents.map((c) => (
              <Link key={c.slug} to={`/continents/${c.slug}`} className="continent-card">
                <img src={asset(c.image)} alt={`${c.name}轮廓示意图`} loading="lazy" />
                <div className="continent-card-body">
                  <h3>{c.name}</h3><span>{c.english}</span>
                  <p>{c.summary}</p>
                  <div className="continent-facts"><span>{c.area}</span><span>{c.population}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
