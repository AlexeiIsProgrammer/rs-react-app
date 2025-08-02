import Card from '../Card';
import { useLocation, useNavigate, useParams } from 'react-router';
import { MAIN_ROUTE } from '../../constants';
import type { CardListProps } from './types';
import { useCallback, useMemo, type MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectedItemsSelector,
  selectItem,
  unselectItem,
} from '../../store/slices/selectedItemsSlice';
import type { Character } from '../../types/interfaces';

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
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            data-testid="skeleton"
            key={i}
            className="p-4 bg-white rounded-lg shadow animate-pulse"
          >
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div
        data-testid="not-items-found"
        className="text-center py-8 text-gray-500"
      >
        No characters found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
