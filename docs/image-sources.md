# 图片与地图资源来源说明

本站不使用外部图片 URL。页面中所有位图与矢量图均存放在项目 `public/` 目录内，通过本地路径引用。

## 一、本地 SVG 资源清单

| 路径 | 内容 | 生成方式 / 来源 |
| --- | --- | --- |
| `icons/logo.svg` | 站点标志（地球经纬线与陆块） | 本站手工绘制 |
| `images/hero/hero-world.svg` | 首页 Hero 世界地图背景 | 本站脚本 `scripts/generate-assets.mjs` 生成 |
| `images/continents/*.svg` | 七大洲轮廓示意图（7 张） | 同上，基于简化经纬度控制点 |
| `maps/world-simple.svg` | 世界海陆分布图 | 同上 |
| `maps/world-climate.svg` | 世界气候带示意图 | 同上 |
| `maps/world-plates.svg` | 板块边界示意图 | 同上 |
| `maps/world-mountains.svg` | 世界主要山脉分布图 | 同上 |
| `maps/world-rivers.svg` | 世界主要河流分布图 | 同上 |
| `maps/population.svg` | 世界人口分布点密度示意图 | 同上 |
| `maps/china-steps.svg` | 中国地形三级阶梯示意图 | 同上 |
| `maps/asia-monsoon.svg` | 亚洲季风示意图 | 同上 |
| `maps/tibet-profile.svg` | 青藏高原地形剖面示意图 | 同上 |
| `illustrations/earth-layers.svg` | 地球圈层示意图 | 同上 |
| `illustrations/trade-routes.svg` | 全球联系网络示意图 | 同上 |

所有 SVG 均由项目脚本从简化经纬度控制点生成，可重复构建。脚本位置：`scripts/generate-assets.mjs`。

## 二、参考数据与许可

- **Natural Earth**：公共领域（Public Domain）地理数据集，用于参考海陆关系与大陆轮廓概化。https://www.naturalearthdata.com/
- **USGS**：公开出版物 *This Dynamic Earth* 用于板块构造科普表述参考。https://pubs.usgs.gov/gip/dynamic/
- **NASA Earth Observatory**：地表过程与卫星影像描述参考。https://earthobservatory.nasa.gov/

本站 SVG 是基于上述公开地理事实重新绘制的**简化示意图**，并非对原始数据的直接复制。图中边界、海岸线、山脉和河流均经过概化，**不表示精确地理位置，不作为国界、行政区划、航海、工程或防灾依据**。

## 三、地理摄影

本项目当前版本未包含第三方摄影图片。首页 Hero 与所有配图均为本站自绘 SVG。原因是项目要求禁止直接使用未经核实的外部图片 URL，且需保证许可清晰、离线可部署。

如后续引入 Wikimedia Commons、NASA 或 USGS 的开放许可照片，须在本文件中逐张记录：文件名、原始页面、作者、许可证、署名要求与下载日期，并保存本地副本。

## 四、重新生成地图

```bash
node scripts/generate-assets.mjs
```

生成结果写入 `public/`，不会覆盖其他文件。若修改控制点或配色，请同步更新本说明。
