import { useMemo } from 'react';

type useGetPaginationNumbersProps = {
  currentPage: number;
  maxVisiblePages: number;
  totalPages: number;
};

const useGetPaginationNumbers = ({
  currentPage,
  maxVisiblePages,
  totalPages,
}: useGetPaginationNumbersProps) => {
  const getPageNumbers = useMemo(() => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, maxVisiblePages, totalPages]);

  return getPageNumbers;
};

export default useGetPaginationNumbers;
