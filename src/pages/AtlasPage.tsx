import Breadcrumb from '@/components/Breadcrumb'
import SectionTitle from '@/components/SectionTitle'
import MapViewer from '@/components/MapViewer'
import { asset, docTitle } from '@/utils/assets'
import { useEffect } from 'react'

const atlasGroups = [
  {
    title: '世界格局',
    desc: '海陆分布、板块边界、气候带与全球联系',
    items: [
      { src: 'maps/world-simple.svg', alt: '世界海陆分布简图', caption: '图 1：世界海陆分布。陆地集中于北半球，海洋在南半球占主导。' },
      { src: 'maps/world-plates.svg', alt: '世界板块构造示意图', caption: '图 2：主要板块边界（简化）。红线为示意边界，不用于工程或防灾。' },
      { src: 'maps/world-climate.svg', alt: '世界气候带示意图', caption: '图 3：理想化气候带。实际边界受海陆分布、地形与洋流明显偏移。' },
      { src: 'maps/world-mountains.svg', alt: '世界主要山脉分布示意图', caption: '图 4：全球高大山脉集中于环太平洋与特提斯两条造山带。' },
      { src: 'maps/world-rivers.svg', alt: '世界主要河流分布示意图', caption: '图 5：世界主要河流。线条为简化表达，不代表精确河道。' },
      { src: 'maps/population.svg', alt: '世界人口分布示意图', caption: '图 6：人口集聚趋势。点密度为示意，不是人口栅格数据。' },
    ],
  },
  {
    title: '区域与机制',
    desc: '中国地形、亚洲季风、高原剖面与圈层结构',
    items: [
      { src: 'maps/china-steps.svg', alt: '中国地形三级阶梯示意图', caption: '图 7：中国地势自西向东呈三级阶梯下降（概化模型，非按比例）。' },
      { src: 'maps/asia-monsoon.svg', alt: '亚洲季风示意图', caption: '图 8：夏季风由海洋吹向大陆，冬季风方向相反；箭头为简化表达。' },
      { src: 'maps/tibet-profile.svg', alt: '青藏高原及周边地形剖面示意图', caption: '图 9：从印度洋到东部平原的地形剖面示意，高程与距离不作定量依据。' },
      { src: 'illustrations/earth-layers.svg', alt: '地球圈层结构示意图', caption: '图 10：地球圈层概念示意，非按比例。' },
      { src: 'illustrations/trade-routes.svg', alt: '全球联系网络示意图', caption: '图 11：全球航线与节点示意，不代表实际航路。' },
    ],
  },
]

export default function AtlasPage() {
  useEffect(() => { document.title = docTitle('地理图鉴') }, [])
  return (
    <>
      <div className="page-hero compact-hero navy-hero">
        <div className="container">
          <Breadcrumb items={[{ label: '地理图鉴' }]} />
          <p className="kicker light">MAPS & DIAGRAMS</p>
          <h1>地理图鉴</h1>
          <p className="page-lead">本地 SVG 矢量插图库。点击任一图可放大查看，支持缩放按钮。示意图用于表达空间关系，不作测绘或边界依据。</p>
        </div>
      </div>
      <section className="section">
        <div className="container narrow">
          {atlasGroups.map((g) => (
            <div key={g.title} className="atlas-group">
              <SectionTitle kicker="ATLAS PLATE" title={g.title} description={g.desc} />
              <div className="atlas-detail-grid">
                {g.items.map((item) => (
                  <MapViewer key={item.src} figure={{ src: item.src, alt: item.alt, caption: item.caption }} />
                ))}
              </div>
            </div>
          ))}
          <div className="atlas-note">
            <h2>关于本站地图</h2>
            <p>所有地图由本站脚本基于简化的经纬度控制点生成，采用等距圆柱投影思路绘制，仅用于教学与空间关系表达。图中边界、海岸线、山脉与河流位置均经过简化，不表示精确地理位置，也不作为国界、行政区划、航海或工程依据。数据底图参考 Natural Earth（公共领域）等开放资源。</p>
            <p>如需精确数据，请访问 Natural Earth、USGS、NASA Earth Observatory 或各国官方测绘机构。</p>
          </div>
        </div>
      </section>
      <div className="hidden-asset" aria-hidden="true"><img src={asset('icons/logo.svg')} alt="" /></div>
    </>
  )
}
