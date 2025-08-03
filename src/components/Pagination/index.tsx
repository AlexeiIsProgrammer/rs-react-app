import { useMemo } from 'react';

import leftArrow from '#assets/left-arrow.svg';
import rightArrow from '#assets/right-arrow.svg';
import useGetPaginationNumbers from '#hooks/useGetPaginationNumbers';

import styles from './Pagination.module.scss';
import type { PaginationProps } from './types';

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const firstResultsIndexPerCurrentPage = (currentPage - 1) * itemsPerPage + 1;

  const maxResultsIndexPerCurrentPage = useMemo(
    () => Math.min(currentPage * itemsPerPage, totalItems),
    [currentPage, itemsPerPage, totalItems]
  );

  const paginationNumbers = useGetPaginationNumbers({
    currentPage,
    maxVisiblePages,
    totalPages,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const onClickButtonHandle =
    (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      fn();
    };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.resultsText}>
        Showing
        <span className={styles.fontMedium}>
          {firstResultsIndexPerCurrentPage}
        </span>
        to
        <span className={styles.fontMedium}>
          {maxResultsIndexPerCurrentPage}
        </span>
        of <span className={styles.fontMedium}>{totalItems}</span> results
      </div>
      <nav className={styles.paginationNav} aria-label="Pagination">
        <button
          title="prev"
          onClick={onClickButtonHandle(() => handlePageChange(currentPage - 1))}
          disabled={currentPage === 1}
          className={`${styles.paginationButton} ${styles.leftButton}`}
        >
          <img className={styles.arrowIcon} src={leftArrow} alt="Previous" />
          <span className={styles.mobileText}>Previous</span>
        </button>

        {currentPage > Math.ceil(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <button
              onClick={onClickButtonHandle(() => handlePageChange(1))}
              className={styles.pageButton}
            >
              1
            </button>
          )}

        {currentPage > Math.ceil(maxVisiblePages / 2) + 1 &&
          totalPages > maxVisiblePages && (
            <span className={styles.ellipsis}>...</span>
          )}

        {paginationNumbers.map((page) => (
          <button
            key={page}
            onClick={onClickButtonHandle(() => handlePageChange(page))}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.activePage : ''
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - Math.floor(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <span className={styles.ellipsis}>...</span>
          )}

        {currentPage < totalPages - Math.floor(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <button
              onClick={onClickButtonHandle(() => handlePageChange(totalPages))}
              className={styles.pageButton}
            >
              {totalPages}
            </button>
          )}

        <button
          title="next"
          onClick={onClickButtonHandle(() => handlePageChange(currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`${styles.paginationButton} ${styles.rightButton}`}
        >
          <span className={styles.mobileText}>Next</span>
          <img className={styles.arrowIcon} src={rightArrow} alt="Next" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
