export interface Character {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  id: string;
}

export interface Result {
  properties: Character;
  uid: string;
}
export interface ApiResponse {
  results?: Result[];
  result?: Result[];
  total_pages: number;
  total_records: number;
}

export type GetItemsResponse = {
  data: Character[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
