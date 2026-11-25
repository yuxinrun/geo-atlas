import { Link } from 'react-router-dom'
import type { Article } from '@/data/types'
import { asset } from '@/utils/assets'

interface Props {
  article: Article
  variant?: 'default' | 'feature' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  return (
    <article className={`article-card ${variant}`}>
      <Link to={`/articles/${article.slug}`} className="card-image-link" tabIndex={-1} aria-hidden="true">
        <img src={asset(article.cover)} alt="" loading="lazy" />
      </Link>
      <div className="card-body">
        <div className="card-meta-top">
          <span className="tag-category">{article.category}</span>
          <span>{article.readingMinutes} 分钟阅读</span>
        </div>
        <h3><Link to={`/articles/${article.slug}`}>{article.title}</Link></h3>
        <p className="card-summary">{article.summary}</p>
        <div className="card-footer">
          <span>{article.date}</span>
          <Link to={`/articles/${article.slug}`} className="read-more" aria-label={`阅读：${article.title}`}>阅读全文 →</Link>
        </div>
      </div>
    </article>
  )
}
