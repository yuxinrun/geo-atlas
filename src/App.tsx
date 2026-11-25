import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WorldPage from './pages/WorldPage'
import ContinentsPage from './pages/ContinentsPage'
import ContinentDetailPage from './pages/ContinentDetailPage'
import ChinaWorldPage from './pages/ChinaWorldPage'
import { EconomicGeographyPage, HistoricalGeographyPage, HumanGeographyPage, PhysicalGeographyPage } from './pages/GeographyPages'
import TopicsPage from './pages/TopicsPage'
import ArticlesPage from './pages/ArticlesPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import AtlasPage from './pages/AtlasPage'
import BooksPage from './pages/BooksPage'
import AboutPage from './pages/AboutPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/world" element={<WorldPage />} />
          <Route path="/continents" element={<ContinentsPage />} />
          <Route path="/continents/:slug" element={<ContinentDetailPage />} />
          <Route path="/china-world" element={<ChinaWorldPage />} />
          <Route path="/physical-geography" element={<PhysicalGeographyPage />} />
          <Route path="/human-geography" element={<HumanGeographyPage />} />
          <Route path="/economic-geography" element={<EconomicGeographyPage />} />
          <Route path="/historical-geography" element={<HistoricalGeographyPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/atlas" element={<AtlasPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
