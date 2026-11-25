import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import { docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function NotFoundPage() {
  useEffect(() => { document.title = docTitle('页面未找到') }, [])
  return (
    <section className="section not-found">
      <div className="container narrow">
        <Breadcrumb items={[{ label: '页面未找到' }]} />
        <p className="kicker">404 · OFF THE MAP</p>
        <h1>这片区域尚未绘制</h1>
        <p>你访问的页面不存在，或链接已经失效。可以从首页、文章库或地图图鉴重新出发。</p>
        <div className="inline-links">
          <Link className="btn btn-dark" to="/">返回首页</Link>
          <Link className="btn btn-outline" to="/articles">浏览文章</Link>
          <Link className="btn btn-outline" to="/atlas">打开图鉴</Link>
        </div>
      </div>
    </section>
  )
}
