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
import { useAppDispatch, useAppSelector } from '../../store';
import {
  areSelectedItemsCountSelector,
  selectedItemsSelector,
  unselectAllItems,
} from '../../store/slices/selectedItemsSlice';
import downloadCSV from '../../utils/saveToCsv';

const Main = () => {
  const { value, setValue } = useLocalStorage(LOCAL_STORAGE_SEARCH);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectedItemsSelector);
  const areSelectedItemsCount = useAppSelector(areSelectedItemsCountSelector);

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

  const downloadItemsHandle = () => downloadCSV(selectedItems);

  const unselectAllHandle = () => dispatch(unselectAllItems());

  const content = (() => {
    switch (true) {
      case Boolean(error):
        return (
          <div
            className="p-4 bg-red-100 text-red-700 rounded border border-red-300"
            data-testid="error-message"
          >
            Error: {error}
          </div>
        );

      case Boolean(data):
      case isLoading:
        return (
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
        );
    }
  })();

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
          <h2 className="text-2xl font-semibold text-gray-700 mr-auto">
            {search ? `Results for "${search}"` : 'All Characters'}
          </h2>

          {content}
        </div>

        <Outlet />
      </div>

      {areSelectedItemsCount !== 0 && (
        <div className="fixed flex gap-5 bottom-0 p-5 left-[50%] -translate-x-[50%]">
          <h4>
            <b>{areSelectedItemsCount} items are selected</b>
          </h4>

          <button
            onClick={unselectAllHandle}
            className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Unselect all
          </button>

          <button
            onClick={downloadItemsHandle}
            className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
