import { useState } from 'react';
import Search from '../components/Search';
import CardList from '../components/CardList';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import useGetItems from '../hooks/useGetItems';

function App() {
  const [search, setSearch] = useState<string>(
    localStorage.getItem('swapiSearch') || ''
  );
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useGetItems({ search, limit, page });

  const handleSearch = (term: string): void => {
    localStorage.setItem('swapiSearch', term);
    setSearch(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Star Wars Character Search
          </h1>

          <Search
            initialValue={search}
            onSearch={handleSearch}
            loading={isLoading}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {search ? `Results for "${search}"` : 'All Characters'}
          </h2>

          {error ? (
            <div
              className="p-4 bg-red-100 text-red-700 rounded border border-red-300"
              data-testid="error-message"
            >
              Error: {error}
            </div>
          ) : (
            <>
              {isLoading && <Spinner />}
              {data && (
                <>
                  <CardList characters={data.data} isLoading={isLoading} />
                  <Pagination
                    itemsPerPage={limit}
                    totalItems={data.total}
                    currentPage={page}
                    onPageChange={(page) => setPage(page)}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
