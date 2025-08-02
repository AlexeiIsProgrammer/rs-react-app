import { useEffect, useState } from 'react';
import type { Character } from '../types/interfaces';
import StarWarsApiService from '../api/StarWarsApiService';

type useGetItemProps = {
  id: string;
};

const useGetItem = ({ id }: useGetItemProps) => {
  const [data, setData] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCharacters = (id: string): void => {
      setIsLoading(true);
      setError('');

      StarWarsApiService.getItem(id)
        .then((data: Character) => {
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

    fetchCharacters(id);
  }, [id]);

  return { data, isLoading, error };
};

export default useGetItem;
