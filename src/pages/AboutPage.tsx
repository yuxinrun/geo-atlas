import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import { site } from '@/data/site'
import { docTitle } from '@/utils/assets'
import { useEffect } from 'react'

export default function AboutPage() {
  useEffect(() => { document.title = docTitle('关于本站') }, [])
  return (
    <>
      <div className="page-hero compact-hero navy-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '关于本站' }]} />
          <p className="kicker light">ABOUT GEOATLAS</p>
          <h1>关于本站</h1>
          <p className="page-lead">{site.slogan} 这是一份长期积累的中文地理知识工程，而不是流量导向的内容集合。</p>
        </div>
      </div>

      <section className="section">
        <div className="container narrow prose-page">
          <SectionTitle kicker="OUR PHILOSOPHY" title="网站理念" />
          <p>{site.description}</p>
          <p>我们尤其重视“大地理观”：以地球为整体研究对象，以空间关系为核心；以自然地理为基础，结合人文、经济、历史、政治与环境地理；把中国地理放入世界地理框架中观察、比较和理解。</p>

          <SectionTitle kicker="EDITORIAL STANDARD" title="编辑规范" id="editorial" />
          <ol className="numbered-list">
            <li><strong>解释优先。</strong>文章需要说明机制与因果，而不是罗列事实。</li>
            <li><strong>区分层次。</strong>明确区分事实、学术观点、推论与存在争议的问题。</li>
            <li><strong>标注数据。</strong>涉及人口、面积、气候、资源等可变信息时，标注来源与年份。</li>
            <li><strong>不虚构。</strong>不编造书籍、作者、论文、数据与参考文献；无法核实的内容标注“待核查”。</li>
            <li><strong>中文为主。</strong>主要内容使用简体中文，专业术语可附英文。</li>
            <li><strong>地图谨慎。</strong>示意图注明简化性质，不作为国界、测绘或工程依据。</li>
          </ol>

          <SectionTitle kicker="DATA & SOURCES" title="数据来源与许可" id="sources" />
          <p>本站地图与插图为本地生成的 SVG，绘制控制点为简化概化，参考 Natural Earth 公共领域数据集的通用海陆关系。气候与变化相关讨论参考 IPCC 第六次评估报告；人口数据参考联合国经济和社会事务部人口司估计；板块构造科普参考 USGS 公开出版物；卫星影像与地表过程描述参考 NASA Earth Observatory。</p>
          <p>文章参考资料列于每篇文末。部分中文教材与译著的版次信息标注“待核查”，表示本站未能在写作时确认具体版本，请读者以图书馆目录或出版社信息为准。</p>
          <p>除另行声明外，本站原创文字与 SVG 插图采用知识共享署名-非商业性使用 4.0 国际许可协议（CC BY-NC 4.0）。外部来源内容版权归原权利人所有。</p>

          <SectionTitle kicker="TECHNOLOGY" title="技术实现" />
          <p>网站由 Vite + React + TypeScript 构建，内容以结构化本地数据管理，不依赖后端、数据库或第三方 CDN。静态产物可直接部署到 GitHub Pages。全站地图为本地 SVG，图片均为项目内资源，页面不引用外部图片地址。</p>

          <SectionTitle kicker="WHAT'S NEXT" title="后续规划" />
          <ul className="numbered-list">
            <li>持续扩充“中国与世界”系列，增加区域比较与水文、农业、城市专题。</li>
            <li>完善图鉴中的示意图种类，加入更清晰的投影与比例尺说明。</li>
            <li>建立文章版本与更新日期记录，便于读者追踪数据变化。</li>
            <li>在条件允许时引入经核实的开放许可地理摄影，并补充来源与署名。</li>
          </ul>

          <div className="about-links">
            <Link className="btn btn-dark" to="/articles">开始阅读</Link>
            <a className="btn btn-outline" href={site.repo} target="_blank" rel="noopener noreferrer">查看源代码</a>
          </div>
        </div>
      </section>
    </>
  )
}
