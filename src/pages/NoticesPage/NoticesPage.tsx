import { useEffect } from "react";
import { useNoticesStore } from "../../store/noticesStore";
import { Title } from "../../components/Title/Title";
import { NoticesFilters } from "../../components/NoticesFilters/NoticesFilters";
import { NoticesList } from "../../components/NoticesList/NoticesList";
import { Pagination } from "../../components/Pagination/Pagination";
import css from "./NoticesPage.module.css";

const NoticesPage = () => {

  const fetchOptions = useNoticesStore(state => state.fetchOptions)
  const fetchNotices = useNoticesStore(state => state.fetchNotices)
  const notices = useNoticesStore(state => state.notices)
  const totalPages = useNoticesStore(state => state.totalPages)
  const currentPage = useNoticesStore(state => state.filters.page)
  const setFilters = useNoticesStore(state => state.setFilters)

  useEffect(() => {
    fetchOptions();
    fetchNotices();
  }, [fetchNotices, fetchOptions])

  const handlePageChange = (currentPage: number) => {
    setFilters({ page: currentPage })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={css.container}>
      <Title title="Find your favorite pet" />

      <NoticesFilters />
      <NoticesList data={notices} />

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default NoticesPage;