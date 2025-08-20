'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Close from '#assets/close.svg';
import { MAIN_ROUTE } from '#constants/index';
import { useGetItemQuery } from '#store/api';

import Data from './Data';
import Error from './Error';
import styles from './Item.module.scss';
import Loading from './Loading';
import type { ItemProps } from './types';

const Item = ({ detailsId: id }: ItemProps) => {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data,
    isLoading: isGetItemLoading,
    error,
    isError,
    isFetching: isGetItemFetching,
    refetch,
  } = useGetItemQuery({ id });

  const isLoading = isGetItemLoading || isGetItemFetching;

  const closePanel = () => {
    router.push(`${MAIN_ROUTE}?${searchParams}`);
  };

  const getContent = () => {
    switch (true) {
      case Boolean(isLoading):
        return <Loading />;
      case isError:
        return <Error error={error} />;
      case !!data:
        return <Data data={data} />;
      default:
        return (
          <div className={styles.emptyState}>
            No character details available
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <button
          title="close"
          onClick={closePanel}
          className={styles.closeButton}
          aria-label="Close panel"
        >
          <Image width="20" height="20" alt="close-button" src={Close.src} />
        </button>
        <div className={styles.header}>
          <h3 className={styles.title}>{t('details')}</h3>
          <button onClick={refetch} className={styles.button}>
            {t('refresh')}
          </button>
        </div>
        {getContent()}
      </div>
    </div>
  );
};

export default Item;
