import { useLocation, useNavigate, useParams } from 'react-router';

import Close from '#assets/close.svg?react';
import { MAIN_ROUTE } from '#constants/index';
import { useGetItemQuery, useLazyGetItemQuery } from '#store/api';

import Data from './Data';
import Error from './Error';
import styles from './Item.module.scss';
import Loading from './Loading';

const Item = () => {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const id = detailsId || '';

  const [getItem] = useLazyGetItemQuery();
  const {
    data,
    isLoading: isGetItemLoading,
    error,
    isError,
    isFetching: isGetItemFetching,
  } = useGetItemQuery({ id });

  const isLoading = isGetItemLoading || isGetItemFetching;

  const closePanel = () => {
    navigate({ pathname: MAIN_ROUTE, search });
  };

  const refreshHandle = () => getItem({ id });

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
          <Close />
        </button>
        <div className={styles.header}>
          <h3 className={styles.title}>Character Details</h3>
          <button onClick={refreshHandle} className={styles.button}>
            Refresh
          </button>
        </div>
        {getContent()}
      </div>
    </div>
  );
};

export default Item;
