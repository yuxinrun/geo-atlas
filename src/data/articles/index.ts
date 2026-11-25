import type { Article } from '../types'
import { articlesPart1 } from './part1'
import { articlesPart2 } from './part2'
import { articlesPart3 } from './part3'

export const articles: Article[] = [...articlesPart1, ...articlesPart2, ...articlesPart3]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function relatedArticles(article: Article): Article[] {
  const bySlug = article.related.map((slug) => getArticle(slug)).filter((a): a is Article => Boolean(a))
  const byTag = articles
    .filter((a) => a.slug !== article.slug && !bySlug.some((b) => b.slug === a.slug))
    .map((a) => ({ article: a, score: a.tags.filter((t) => article.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 4 - bySlug.length)
    .map((x) => x.article)
  return [...bySlug, ...byTag]
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return articles
    .map((article) => {
      const haystack = [article.title, article.summary, article.category, ...article.tags, ...article.concepts].join(' ').toLowerCase()
      const titleHit = article.title.toLowerCase().includes(q) ? 10 : 0
      const tagHit = article.tags.some((t) => t.toLowerCase().includes(q)) ? 5 : 0
      const bodyHit = haystack.includes(q) ? 1 : 0
      return { article, score: titleHit + tagHit + bodyHit }
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .map((x) => x.article)
}

export const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort()
