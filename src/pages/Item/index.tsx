import { useLocation, useNavigate, useParams } from 'react-router';
import Spinner from '../../components/Spinner';
import { MAIN_ROUTE } from '../../constants';
import close from '../../assets/close.svg';
import styles from './Item.module.scss';
import { useGetItemQuery, useLazyGetItemQuery } from '../../store/api';

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

  const content = (() => {
    switch (true) {
      case Boolean(isLoading):
        return (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        );
      case isError:
        return (
          <div data-testid="error-message" className={styles.errorMessage}>
            {'error' in error ? error.error : 'Unknown error'}
          </div>
        );
      case !!data:
        return (
          <div className={styles.content}>
            <div>
              <h4 className={styles.name}>{data.name}</h4>
            </div>
            <div className={styles.detailsGrid}>
              <div>
                <p className={styles.detailLabel}>Birth Year</p>
                <p className={styles.detailValue}>{data.birth_year}</p>
              </div>
              <div>
                <p className={styles.detailLabel}>Gender</p>
                <p className={styles.detailValue}>{data.gender}</p>
              </div>
              <div>
                <p className={styles.detailLabel}>Height</p>
                <p className={styles.detailValue}>{data.height} cm</p>
              </div>
              <div>
                <p className={styles.detailLabel}>Mass</p>
                <p className={styles.detailValue}>{data.mass} kg</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.emptyState}>
            No character details available
          </div>
        );
    }
  })();

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <button
          title="close"
          onClick={closePanel}
          className={styles.closeButton}
          aria-label="Close panel"
        >
          <img src={close} alt="Close" />
        </button>
        <div className={styles.header}>
          <h3 className={styles.title}>Character Details</h3>
          <button onClick={refreshHandle} className={styles.button}>
            Refresh
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Item;
