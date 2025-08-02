export type GetItemsRequest = {
  name: string;
  page: number;
  limit: number;
  expanded: boolean;
};

export type GetItemRequest = {
  id: string;
};
