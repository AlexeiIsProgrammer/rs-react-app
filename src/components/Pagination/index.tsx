import type { PaginationProps } from './types';

import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';
import useGetPaginationNumbers from '../../hooks/useGetPaginationNumbers';
import { useMemo } from 'react';

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
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700 flex gap-1">
          Showing
          <span className="font-medium">{firstResultsIndexPerCurrentPage}</span>
          to
          <span className="font-medium">{maxResultsIndexPerCurrentPage}</span>
          of <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <nav
        className="isolate inline-flex sm:flex-none flex-1 justify-between -space-x-px rounded-md sm:shadow-sm"
        aria-label="Pagination"
      >
        <button
          title="prev"
          onClick={onClickButtonHandle(() => handlePageChange(currentPage - 1))}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-l-md sm:rounded-r-none rounded-r-md px-2 py-2  text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <img className="hidden sm:inline h-5 w-5" src={leftArrow} />
          <span className="sm:hidden block">Previous</span>
        </button>

        {currentPage > Math.ceil(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <button
              onClick={onClickButtonHandle(() => handlePageChange(1))}
              className="hidden:inline-flex relative none items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              1
            </button>
          )}

        {currentPage > Math.ceil(maxVisiblePages / 2) + 1 &&
          totalPages > maxVisiblePages && (
            <span className="hidden sm:inline-flex relative none items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
          )}

        {paginationNumbers.map((page) => (
          <button
            key={page}
            onClick={onClickButtonHandle(() => handlePageChange(page))}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`hidden sm:inline-flex relative none items-center px-4 py-2 text-sm font-semibold ${
              page === currentPage
                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - Math.floor(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <span className="hidden sm:inline-flex relative none items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
          )}

        {currentPage <= totalPages - Math.floor(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <button
              onClick={onClickButtonHandle(() => handlePageChange(totalPages))}
              className="hidden sm:inline-flex relative none items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {totalPages}
            </button>
          )}

        <button
          title="next"
          onClick={onClickButtonHandle(() => handlePageChange(currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center rounded-r-md sm:rounded-l-none rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="sm:hidden block">Next</span>

          <img src={rightArrow} className="hidden sm:inline h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
