import { Link } from 'react-router-dom'
import { asset } from '@/utils/assets'
import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={asset('icons/logo.svg')} alt="" width="34" height="34" />
            <span>GeoAtlas / 世界地理志</span>
          </Link>
          <p>{site.slogan}</p>
          <p className="footer-quiet">
            以地球为整体研究对象，以空间关系为核心。把中国放入世界地理框架中观察、比较和理解。
          </p>
        </div>
        <div className="footer-col">
          <h3>内容分类</h3>
          <Link to="/world">世界地理</Link>
          <Link to="/continents">七大洲</Link>
          <Link to="/china-world">中国与世界</Link>
          <Link to="/physical-geography">自然地理</Link>
          <Link to="/human-geography">人文地理</Link>
        </div>
        <div className="footer-col">
          <h3>阅读与探索</h3>
          <Link to="/economic-geography">经济地理</Link>
          <Link to="/historical-geography">历史地理</Link>
          <Link to="/topics">专题研究</Link>
          <Link to="/articles">地理文章</Link>
          <Link to="/atlas">地理图鉴</Link>
          <Link to="/books">阅读书单</Link>
        </div>
        <div className="footer-col">
          <h3>关于本站</h3>
          <Link to="/about">网站理念</Link>
          <Link to="/about#sources">数据来源</Link>
          <Link to="/about#editorial">编辑规范</Link>
          <a href={site.repo} target="_blank" rel="noopener noreferrer">GitHub 仓库</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GeoAtlas 世界地理志 · 内容采用知识共享署名-非商业性使用 4.0 许可（另行声明除外）</span>
        <span>地图为简化示意，不作国界或工程依据 · 数据来源见各文章参考资料</span>
      </div>
    </footer>
  )
}
