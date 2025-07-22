import { useEffect, useState } from 'react';
import Search from '../components/Search';
import CardList from '../components/CardList';
import type { ApiResponse, Character } from '../types/interfaces';
import Spinner from '../components/Spinner';

type StateType = {
  characters: Character[];
  loading: boolean;
  error: null | string;
  searchTerm: string;
};

function App() {
  const [state, setState] = useState<StateType>({
    characters: [],
    loading: false,
    error: null,
    searchTerm: localStorage.getItem('swapiSearch') || '',
  });

  useEffect(() => {
    const fetchCharacters = (searchTerm: string): void => {
      setState({ ...state, loading: true, error: null });

      const apiUrl = `https://www.swapi.tech/api/people/?name=${encodeURIComponent(searchTerm)}&expanded=true`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
          }
          return response.json();
        })
        .then((data: ApiResponse) => {
          setState({
            ...state,
            characters:
              (data?.results || data?.result)?.map(
                (character) => character?.properties
              ) || [],
            loading: false,
          });
        })
        .catch((error) => {
          setState({
            ...state,
            error: error.message || 'Failed to fetch data',
            loading: false,
            characters: [],
          });
        });
    };

    fetchCharacters(state.searchTerm);
  }, [state.searchTerm]);

  const handleSearch = (term: string): void => {
    localStorage.setItem('swapiSearch', term);
    setState({ ...state, searchTerm: term });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Star Wars Character Search
          </h1>

          <Search
            initialValue={state.searchTerm}
            onSearch={handleSearch}
            loading={state.loading}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {state.searchTerm
              ? `Results for "${state.searchTerm}"`
              : 'All Characters'}
          </h2>

          {state.error ? (
            <div
              className="p-4 bg-red-100 text-red-700 rounded border border-red-300"
              data-testid="error-message"
            >
              Error: {state.error}
            </div>
          ) : (
            <>
              {state.loading && <Spinner />}
              <CardList characters={state.characters} loading={state.loading} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
