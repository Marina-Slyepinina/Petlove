import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Title } from "../../components/Title/Title";
import { SearchField } from "../../components/SearchField/SearchField";
import { NewsList } from "../../components/NewsList/NewsList";
import { Pagination } from "../../components/Pagination/Pagination";
import { NEWS_PER_PAGE, type News, type NewsQueryParams, type NewsResponse } from "../../types/news";
import css from "./NewsPage.module.css";

const NewsPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params: NewsQueryParams = {
          page,
          limit: NEWS_PER_PAGE,
        }

        if (query.trim()) {
          params.keyword = query;
        }

        const res = await api.get<NewsResponse>('/news', { params })

        setNews(res.data.results);
        setTotalPages(res.data.totalPages);

      } catch (error) {
        console.error(error);
        setError('Something went wrong. Please try again.');
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    }

    getNews();
  }, [page, query])

  const handleSearch = (value: string) => {
    if (value === query) return;
    setQuery(value);
    setPage(1);
  }

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={css.newsContainer}>

      <div className={css.headerBlock}>
        <Title title="News" />
        <SearchField onSearch={handleSearch} placeholder="Search" className={css.newsPageSearch} />
      </div>

      {isLoading && <div>Featching news ...</div>}

      {error && <div>{error}</div>}

      {news.length > 0 && !isLoading && !error && <NewsList data={news} />}

      {news.length === 0 && !isLoading && !error && (
        <div>Unfortunately, no results were found for "{query}".</div>
      )}

      <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />

    </div>
  )
}

export default NewsPage;