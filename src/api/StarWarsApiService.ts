import type {
  Character,
  GetItemsResponse,
  StarWarsGetItemResponse,
  StarWarsGetItemsResponse,
} from '../types/interfaces';

class StarWarsApiService {
  private static readonly baseUrl: string = 'https://www.swapi.tech/';
  private static readonly defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  static async getItems(
    page: number = 1,
    limit: number = 10,
    searchTerm: string
  ): Promise<GetItemsResponse> {
    try {
      const url = new URL('api/people', this.baseUrl);

      const searchParams = new URLSearchParams({
        name: searchTerm,
        page: page.toString(),
        limit: limit.toString(),
        expanded: 'true',
      });

      url.search = searchParams.toString();

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StarWarsGetItemsResponse = await response.json();

      return {
        data:
          (data.results || data.result)?.map((item) => ({
            ...item.properties,
            id: item?.uid,
          })) || [],
        total: data.total_records || 0,
        page,
        limit,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
  static async getItem(id: string): Promise<Character> {
    const url = new URL(`api/people/${id}`, this.baseUrl);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StarWarsGetItemResponse = await response.json();

      return { ...data?.result.properties, id: data?.result.uid };
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
}

export default StarWarsApiService;
