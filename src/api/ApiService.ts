import type { ApiResponse, GetItemsResponse } from '../types/interfaces';

class ApiService {
  private static readonly baseUrl: string = 'https://www.swapi.tech/api';
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
      const queryParams = new URLSearchParams({
        name: searchTerm,
        page: page.toString(),
        limit: limit.toString(),
        expanded: 'true',
      });

      const response = await fetch(`${this.baseUrl}/people?${queryParams}`, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      return {
        data:
          (data.results || data.result)?.map((item) => item.properties) || [],
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
}

export default ApiService;
