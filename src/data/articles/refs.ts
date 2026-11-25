import type { Reference } from '../types'

export const commonRefs: Record<string, Reference> = {
  ipcc: { title: 'IPCC 第六次评估报告（AR6）第一工作组报告', source: '政府间气候变化专门委员会', year: '2021', url: 'https://www.ipcc.ch/report/ar6/wg1/' },
  naturalEarth: { title: 'Natural Earth 公共领域地理数据集', source: 'Natural Earth', note: '用于本站示意地图底图，公共领域' },
  unpop: { title: '世界人口展望（World Population Prospects）', source: '联合国经济和社会事务部人口司', year: '2024', url: 'https://population.un.org/wpp/' },
  usgs: { title: 'This Dynamic Earth: The Story of Plate Tectonics', source: 'USGS', url: 'https://pubs.usgs.gov/gip/dynamic/' },
  nasa: { title: 'Earth Observatory', source: 'NASA', url: 'https://earthobservatory.nasa.gov/' },
}
