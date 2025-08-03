import { type MouseEvent, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { MAIN_ROUTE } from '#constants/index';
import { useAppDispatch, useAppSelector } from '#store/index';
import {
  selectedItemsSelector,
  selectItem,
  unselectItem,
} from '#store/slices/selectedItemsSlice';
import type { Character } from '#types/interfaces';

import Card from '../Card';
import styles from './CardList.module.scss';
import type { CardListProps } from './types';

const CardList = ({ characters, isLoading }: CardListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const selectedItems = useAppSelector(selectedItemsSelector);

  const { detailsId: id } = useParams();

  const onCardClickHandle = (id: string) => (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    navigate({ pathname: `${MAIN_ROUTE}/${id}`, search });
  };

  const onCheckboxChange =
    (item: Character, checked: boolean) =>
    (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (checked) {
        dispatch(selectItem(item));
      } else {
        dispatch(unselectItem(item));
      }
    };

  const checked = useCallback(
    (id: string) =>
      selectedItems.some((selectedItem) => selectedItem.id === id),
    [selectedItems]
  );

  const sortedItems = useMemo(
    () =>
      [...characters].sort(
        (a, b) => Number(checked(b.id)) - Number(checked(a.id))
      ),
    [characters, checked]
  );

  if (isLoading) {
    return (
      <div className={styles.skeletonContainer}>
        {[...Array(5)].map((_, i) => (
          <div data-testid="skeleton" key={i} className={styles.skeleton}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonSubtitle}></div>
          </div>
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div data-testid="not-items-found" className={styles.notFound}>
        No characters found. Try a different search term.
      </div>
    );
  }

  return (
    <div className={styles.cardList}>
      {sortedItems.map((character) => (
        <Card
          key={character.id}
          checked={checked(character.id)}
          character={character}
          onClick={onCardClickHandle}
          onCheckboxChange={onCheckboxChange}
          isActive={character.id === id}
        />
      ))}
    </div>
  );
};

export default CardList;
