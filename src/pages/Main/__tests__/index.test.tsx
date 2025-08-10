import { fireEvent, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineGlobals } from '../../../../tests/setup';
import { server } from '../../../__mocks__/server';
import { MAIN_ROUTE } from '../../../constants';
import { routes } from '../../../router';
import { Stub } from '../../../router/utils';
import { renderWithProviders } from '../../../store/util';

const SEARCHED_TEXT = 'Luke Skywalker';
const SEARCHED_TERM = 'Luke';

describe('Main Component', () => {
  beforeAll(() => {
    defineGlobals();
  });

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('makes initial API call on component mount and handles search term from localStorage', async () => {
    localStorage.setItem('swapiSearch', SEARCHED_TERM);

    renderWithProviders(<Stub initialEntries={['/main']} />);

    await waitFor(() => {
      expect(screen.getByText(/Results for "Luke"/i)).toBeInTheDocument();
      expect(screen.getByText(SEARCHED_TEXT)).toBeInTheDocument();
    });
  });

  it('saves search term to localStorage when searching', async () => {
    renderWithProviders(<Stub initialEntries={['/main']} />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: SEARCHED_TERM } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(SEARCHED_TEXT)).toBeInTheDocument();
      expect(localStorage.getItem('swapiSearch')).toBe(SEARCHED_TERM);
    });
  });

  it('handle pagination page change', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`${MAIN_ROUTE}?page=1`],
    });

    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      const nextPaginationButton = screen.getByTitle('next');

      expect(router.state.location.search).toBe('?page=1');

      fireEvent.click(nextPaginationButton);

      expect(router.state.location.search).toBe('?page=2');
    });
  });

  it('calls API with correct parameters and handles successful API responses', async () => {
    renderWithProviders(<Stub initialEntries={['/main']} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: SEARCHED_TERM } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(SEARCHED_TEXT)).toBeInTheDocument();
    });
  });

  it('manages loading states during API calls', async () => {
    server.use(
      http.get('https://www.swapi.tech/api/people', async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return HttpResponse.json({ results: [] });
      })
    );

    renderWithProviders(<Stub initialEntries={['/main']} />);
    expect(screen.getByText(/searching.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/searching.../i)).not.toBeInTheDocument();
    });
  });

  it('handles API error responses', async () => {
    server.use(
      http.get('https://www.swapi.tech/api/people', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<Stub initialEntries={['/main']} />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});
