import { http, HttpResponse } from 'msw';

import { mockCharacter } from '../../tests/setup';

export const handlers = [
  http.get('https://www.swapi.tech/api/people', () => {
    const responseMock = {
      results: [mockCharacter].map((character) => ({
        properties: character,
        uid: '1',
      })),
      total_records: 101,
      page: 1,
      limit: 10,
      total_pages: 10,
    };

    return HttpResponse.json(responseMock);
  }),
  http.get('https://www.swapi.tech/api/people/:id', () => {
    const responseMock = { result: { properties: mockCharacter, uid: '1' } };

    return HttpResponse.json(responseMock);
  }),
];
