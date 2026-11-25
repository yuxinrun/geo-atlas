import { useEffect, useState } from 'react'
import type { Figure } from '@/data/types'
import { asset } from '@/utils/assets'

export default function MapViewer({ figure }: { figure: Figure }) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [open])

  const src = asset(figure.src)

  return (
    <figure className="figure-block">
      <button type="button" className="figure-button" onClick={() => { setZoom(1); setOpen(true) }} aria-label={`放大查看：${figure.caption}`}>
        <img src={src} alt={figure.alt} loading="lazy" />
        <span className="figure-zoom" aria-hidden="true">＋ 放大查看</span>
      </button>
      <figcaption>{figure.caption}</figcaption>
      {open && (
        <div className="map-modal" role="dialog" aria-modal="true" aria-label={figure.caption} onClick={() => setOpen(false)}>
          <div className="map-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-bar">
              <span>{figure.caption}</span>
              <div className="map-modal-controls">
                <button type="button" onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))} aria-label="缩小">−</button>
                <span>{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))} aria-label="放大">＋</button>
                <button type="button" className="close" onClick={() => setOpen(false)} aria-label="关闭">×</button>
              </div>
            </div>
            <div className="map-modal-stage">
              <img src={src} alt={figure.alt} style={{ transform: `scale(${zoom})` }} />
            </div>
            <p className="map-modal-hint">滚动可查看原图说明；按 Esc 或点击空白处关闭</p>
          </div>
        </div>
      )}
    </figure>
  )
}
