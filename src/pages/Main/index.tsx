'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import CardList from '#components/CardList';
import { LanguageSwitcher } from '#components/LanguageSwitcher';
import Pagination from '#components/Pagination';
import Search from '#components/Search';
import Spinner from '#components/Spinner';
import ThemeButton from '#components/ThemeButton';
import { LOCAL_STORAGE_SEARCH, MAIN_ROUTE } from '#constants/index';
import useLocalStorage from '#hooks/useLocalStorage';
import { useGetItemsQuery } from '#store/api';
import { useAppDispatch, useAppSelector } from '#store/index';
import {
  areSelectedItemsCountSelector,
  selectedItemsSelector,
  unselectAllItems,
} from '#store/slices/selectedItemsSlice';
import getCSVHref from '#utils/getCSVHref';

import Error from './Error';
import styles from './Main.module.scss';

const Main = ({ children }: { children?: React.ReactNode }) => {
  const t = useTranslations('HomePage');

  const { value, setValue } = useLocalStorage(LOCAL_STORAGE_SEARCH);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectedItemsSelector);
  const areSelectedItemsCount = useAppSelector(areSelectedItemsCountSelector);

  const [search, setSearch] = useState<string>(value);
  const [limit] = useState<number>(10);
  const page = useMemo(() => +(searchParams?.get('page') || 1), [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const {
    data,
    isLoading: isGetItemsLoading,
    error,
    isError,
    isFetching: isGetItemsFetching,
    refetch,
  } = useGetItemsQuery({
    name: search,
    limit,
    page,
    expanded: true,
  });

  const isLoading = isGetItemsLoading || isGetItemsFetching;

  const onPageChange = (currentPage: number) => {
    router.push(
      `${pathname}?${createQueryString('page', currentPage.toString())}`
    );
  };

  const handleSearch = (term: string): void => {
    setValue(term);
    setSearch(term);
  };

  const onMainPanelClick = () => router.push(`${MAIN_ROUTE}?${searchParams}`);

  const href = useMemo(() => getCSVHref(selectedItems), [selectedItems]);
  const download = `${areSelectedItemsCount}_items.csv`;

  const unselectAllHandle = () => dispatch(unselectAllItems());

  const getContent = () => {
    switch (true) {
      case isError:
        return <Error error={error} />;
      case Boolean(data):
      case isLoading:
        return (
          <>
            {isLoading && <Spinner />}
            {data && <CardList characters={data.data} isLoading={isLoading} />}
          </>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <div>
          <Link href="/about" className={styles.aboutLink}>
            {t('about')}
          </Link>

          <ThemeButton />

          <LanguageSwitcher />
        </div>
        <Search
          initialValue={search}
          onSearch={handleSearch}
          loading={isLoading}
        />
      </div>

      <div className={styles.contentWrapper}>
        <div onClick={onMainPanelClick} className={styles.mainPanel}>
          <div className={styles.headerPanel}>
            <h2 className={styles.panelTitle}>
              {search ? `${t('results')} "${search}"` : t('all_characters')}
            </h2>

            <button onClick={refetch} className={styles.button}>
              {t('refresh')}
            </button>
          </div>
          {getContent()}
        </div>
        {children}
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
            <b>
              {areSelectedItemsCount} {t('items')}
            </b>
          </h4>
          <button onClick={unselectAllHandle} className={styles.button}>
            {t('unselect')}
          </button>
          <a href={href} download={download} className={styles.button}>
            {t('download')}
          </a>
        </div>
      )}
    </div>
  );
};

export default Main;
