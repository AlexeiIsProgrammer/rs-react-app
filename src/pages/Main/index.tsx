import { useMemo, useState } from 'react';
import Search from '../../components/Search';
import CardList from '../../components/CardList';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import useGetItems from '../../hooks/useGetItems';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_SEARCH, MAIN_ROUTE } from '../../constants';

const Main = () => {
  const { value, setValue } = useLocalStorage(LOCAL_STORAGE_SEARCH);

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState<string>(value);
  const [limit] = useState<number>(10);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => +(searchParams.get('page') || 1), [searchParams]);

  const { data, isLoading, error } = useGetItems({
    search,
    limit,
    page,
  });

  const onPageChange = (currentPage: number) => {
    setSearchParams({ page: currentPage.toString() });
  };

  const handleSearch = (term: string): void => {
    setValue(term);
    setSearch(term);
  };

  const onMainPanelClick = () =>
    navigate({ pathname: MAIN_ROUTE, search: location.search });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Star Wars Character Search
        </h1>
        <p className="text-center">
          <Link
            className="text-blue-600 hover:text-blue-800 hover:underline"
            to="/about"
          >
            About me
          </Link>
        </p>
        <Search
          initialValue={search}
          onSearch={handleSearch}
          loading={isLoading}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div onClick={onMainPanelClick} className="flex-1">
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
                    onPageChange={onPageChange}
                  />
                </>
              )}
            </>
          )}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Main;
