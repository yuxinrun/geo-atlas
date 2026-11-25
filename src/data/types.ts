export interface Reference {
  title: string
  source: string
  year?: string
  url?: string
  note?: string
}

export interface Figure {
  src: string
  alt: string
  caption: string
}

export interface ArticleSection {
  id: string
  heading: string
  paragraphs: string[]
  list?: string[]
  figure?: Figure
  callout?: { label: string; text: string }
}

export interface Article {
  slug: string
  title: string
  summary: string
  category: string
  tags: string[]
  readingMinutes: number
  date: string
  cover: string
  sections: ArticleSection[]
  concepts: string[]
  related: string[]
  references: Reference[]
  featured?: boolean
}

export interface Continent {
  slug: string
  name: string
  english: string
  area: string
  population: string
  highest: string
  image: string
  summary: string
  highlights: string[]
  body: ArticleSection[]
  facts: { label: string; value: string; note?: string }[]
}

export interface Book {
  title: string
  author: string
  year: string
  category: string
  level: '入门' | '进阶' | '经典'
  summary: string
  why: string
  note?: string
}
