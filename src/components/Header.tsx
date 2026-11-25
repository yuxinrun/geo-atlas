import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '@/data/site'
import { asset } from '@/utils/assets'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="世界地理志首页">
          <img src={asset('icons/logo.svg')} alt="" width="40" height="40" />
          <span className="brand-text">
            <strong>GeoAtlas</strong>
            <small>世界地理志</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/search" className="icon-button" aria-label="搜索文章" title="搜索">
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
          </Link>
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 5 19 19M19 5 5 19" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="移动端导航">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-nav-extra">
            <Link to="/continents">七大洲</Link>
            <Link to="/physical-geography">自然地理</Link>
            <Link to="/human-geography">人文地理</Link>
            <Link to="/economic-geography">经济地理</Link>
            <Link to="/historical-geography">历史地理</Link>
            <Link to="/articles">全部文章</Link>
          </div>
        </nav>
      )}
    </header>
  )
}
