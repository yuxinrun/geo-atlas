import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox({ initial = '', autoFocus = false }: { initial?: string; autoFocus?: boolean }) {
  const [query, setQuery] = useState(initial)
  const navigate = useNavigate()

  return (
    <form
      className="search-box"
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search')
      }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="m16 16 4.5 4.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章标题、摘要或标签，如：季风、板块、青藏高原"
        aria-label="搜索地理文章"
        autoFocus={autoFocus}
      />
      <button type="submit">搜索</button>
    </form>
  )
}
