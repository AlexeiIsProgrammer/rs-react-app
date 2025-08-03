import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  GetItemResponse,
  GetItemsResponse,
  StarWarsGetItemResponse,
  StarWarsGetItemsResponse,
} from '#types/interfaces';

import type { GetItemRequest, GetItemsRequest } from './types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.swapi.tech/api/',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  endpoints: (build) => ({
    getItems: build.query<GetItemsResponse, GetItemsRequest>({
      query: (params) => ({
        url: 'people',
        params,
      }),
      transformResponse: (
        data: StarWarsGetItemsResponse,
        _,
        { page, limit }
      ) => ({
        data:
          (data.results || data.result)?.map((item) => ({
            ...item.properties,
            id: item?.uid,
          })) || [],
        total: data.total_records || 0,
        page,
        limit,
        totalPages: data.total_pages,
      }),
    }),
    getItem: build.query<GetItemResponse, GetItemRequest>({
      query: ({ id }) => ({
        url: `people/${id}`,
      }),
      transformResponse: (data: StarWarsGetItemResponse) => ({
        ...data?.result.properties,
        id: data?.result.uid,
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useLazyGetItemQuery,
  useLazyGetItemsQuery,
} = starWarsApi;
