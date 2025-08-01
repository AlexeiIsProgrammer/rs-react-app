import { useEffect, useState } from 'react';
import type { GetItemsResponse } from '../types/interfaces';
import StarWarsApiService from '../api/StarWarsApiService';

type useGetItemsProps = {
  search: string;
  page: number;
  limit: number;
};

const useGetItems = ({ search, page, limit }: useGetItemsProps) => {
  const [data, setData] = useState<GetItemsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCharacters = (searchTerm: string): void => {
      setIsLoading(true);
      setError('');

      StarWarsApiService.getItems(page, limit, searchTerm)
        .then((data: GetItemsResponse) => {
          setData(data);
        })
        .catch((error) => {
          setError(error.message || 'Failed to fetch data');
          setData(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchCharacters(search);
  }, [search, page, limit]);

  return { data, isLoading, error };
};

export default useGetItems;
