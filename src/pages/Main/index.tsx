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
import getCSVHref from '../../utils/getCSVHref';
import styles from './Main.module.scss';

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

  const { data, isLoading, error } = useGetItems({ search, limit, page });

  const onPageChange = (currentPage: number) => {
    setSearchParams({ page: currentPage.toString() });
  };

  const handleSearch = (term: string): void => {
    setValue(term);
    setSearch(term);
  };

  const onMainPanelClick = () =>
    navigate({ pathname: MAIN_ROUTE, search: location.search });

  const href = useMemo(() => getCSVHref(selectedItems), [selectedItems]);
  const download = `${areSelectedItemsCount}_items.csv`;

  const unselectAllHandle = () => dispatch(unselectAllItems());

  const content = (() => {
    switch (true) {
      case Boolean(error):
        return (
          <div className={styles.errorMessage} data-testid="error-message">
            Error: {error}
          </div>
        );
      case Boolean(data):
      case isLoading:
        return (
          <>
            {isLoading && <Spinner />}
            {data && <CardList characters={data.data} isLoading={isLoading} />}
          </>
        );
    }
  })();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Star Wars Character Search</h1>
        <p>
          <Link to="/about" className={styles.aboutLink}>
            About me
          </Link>
        </p>
        <Search
          initialValue={search}
          onSearch={handleSearch}
          loading={isLoading}
        />
      </div>

      <div className={styles.contentWrapper}>
        <div onClick={onMainPanelClick} className={styles.mainPanel}>
          <h2 className={styles.panelTitle}>
            {search ? `Results for "${search}"` : 'All Characters'}
          </h2>
          {content}
        </div>
        <Outlet />
      </div>

      <Pagination
        itemsPerPage={limit}
        totalItems={data?.total || 0}
        currentPage={page}
        onPageChange={onPageChange}
      />

      {areSelectedItemsCount !== 0 && (
        <div className={styles.selectionPanel}>
          <h4>
            <b>{areSelectedItemsCount} items are selected</b>
          </h4>
          <button onClick={unselectAllHandle} className={styles.button}>
            Unselect all
          </button>
          <a href={href} download={download} className={styles.button}>
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default Main;
