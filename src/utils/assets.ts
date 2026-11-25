const BASE = import.meta.env.BASE_URL || '/'

export function asset(path: string): string {
  return `${BASE}${path.replace(/^\/+/, '')}`
}

export function docTitle(title?: string): string {
  return title ? `${title} — 世界地理志 GeoAtlas` : '世界地理志 GeoAtlas — 从大地出发，理解世界'
}
