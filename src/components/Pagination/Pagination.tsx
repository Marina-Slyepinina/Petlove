import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import clsx from "clsx";
import css from "./Pagination.module.css";


interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  }

  const handleFirstPage = () => {
    onPageChange(1);
  }
 
  const handleLastPage = () => {
    onPageChange(totalPages);
  }
 
  return (
    <div className={css.paginationWrapper}>
      <button type="button" className={clsx(css.navBtn, css.previous, currentPage === 1 && css.disabled)} onClick={handleFirstPage} disabled={currentPage === 1}>
        <svg className={css.svg}>
          <use href="sprite.svg#slider-double"></use>
        </svg>
      </button>

      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <button type="button" className={clsx(css.navBtn, currentPage === totalPages && css.disabled)}>
            <svg className={css.svg}>
              <use href="sprite.svg#slider-single"></use>
            </svg>
          </button>
        }
        previousLabel={
          <button type="button" className={clsx(css.navBtn, currentPage === 1 && css.disabled)}>
            <svg className={css.svg}>
              <use href="sprite.svg#slider-single"></use>
            </svg>
          </button>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMobile ? 1 : 3}
        marginPagesDisplayed={isMobile ? 0 : 1}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}

        containerClassName={css.paginationList}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.pageItem}
        nextClassName={css.next}
        breakClassName={css.pageItem}
        breakLinkClassName={css.breakLink}
        activeClassName={css.activePage}
        disabledClassName={css.disabled}
      />

      <button type="button" className={clsx(css.navBtn, currentPage === totalPages && css.disabled)} disabled={currentPage === totalPages} onClick={handleLastPage}>
        <svg className={clsx(css.svg, css.next)}>
          <use href="sprite.svg#slider-double"></use>
        </svg>
      </button>
    </div>
  )
}
