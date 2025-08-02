import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Character } from '../../types/interfaces';

type ItemType = Character;

export type ItemsState = {
  selectedItems: ItemType[];
};

const initialState: ItemsState = {
  selectedItems: [],
};

type ItemPayload<T> = PayloadAction<T>;

type SelectItemPayload = ItemPayload<ItemType>;
type UnselectItemPayload = ItemPayload<ItemType>;

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, { payload: item }: SelectItemPayload) => {
      state.selectedItems.push(item);
    },
    unselectItem: (state, { payload: item }: UnselectItemPayload) => {
      state.selectedItems = state.selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
export const selectedItemsSelector = (state: RootState) =>
  state.selectedItems.selectedItems;
export const areSelectedItemsCountSelector = (state: RootState) =>
  state.selectedItems.selectedItems.length;
