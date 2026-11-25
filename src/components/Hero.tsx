import { Link } from 'react-router-dom'
import { asset } from '@/utils/assets'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero-bg" src={asset('images/hero/hero-world.svg')} alt="深色世界地图与经纬网" loading="eager" decoding="sync" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-kicker">GEOATLAS · 世界地理志</p>
        <h1 id="hero-title">世界地理志</h1>
        <p className="hero-subtitle">A Geographic Perspective on Our World</p>
        <p className="hero-slogan">从大地出发，理解世界。</p>
        <p className="hero-intro">
          以地球为整体，以空间关系为线索。我们把中国放回大陆、海洋、气候、生态与文明的网络中观察，
          用解释而非罗列，理解每一处山川、季风与城市为何出现在那里。
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/world">探索世界</Link>
          <Link className="btn btn-outline-light" to="/topics">阅读专题</Link>
        </div>
        <p className="hero-meta">30 篇深度文章 · 7 大洲 · 本地 SVG 地图图鉴</p>
      </div>
      <div className="hero-scroll" aria-hidden="true"><span>向下阅读</span><i /></div>
    </section>
  )
}
