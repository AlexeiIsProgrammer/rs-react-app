import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { mockCharacter } from '../../../../tests/setup';
import { routes, Stub } from '../../../router';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { MAIN_ROUTE } from '../../../constants';

const SEARCHED_TEXT = 'Luke Skywalker';
const SEARCHED_TERM = 'Luke';

describe('Main Component', () => {
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

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('makes initial API call on component mount and handles search term from localStorage', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => responseMock,
    } as Response);

    localStorage.setItem('swapiSearch', SEARCHED_TERM);

    render(<Stub initialEntries={['/main']} />);

    await waitFor(() => {
      expect(screen.getByText(/Results for "Luke"/i)).toBeInTheDocument();
      expect(screen.getByText(SEARCHED_TEXT)).toBeInTheDocument();
    });
  });

  it('manages loading states during API calls', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({ results: [] }),
            } as Response);
          }, 100);
        })
    );

    render(<Stub initialEntries={['/main']} />);
    expect(screen.getByText(/searching.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/searching.../i)).not.toBeInTheDocument();
    });
  });

  it('calls API with correct parameters and handles successful API responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => responseMock,
    } as Response);

    render(<Stub initialEntries={['/main']} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: SEARCHED_TERM } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(SEARCHED_TEXT)).toBeInTheDocument();
    });
  });

  it('handles API error responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    render(<Stub initialEntries={['/main']} />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('saves search term to localStorage when searching', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => responseMock,
    } as Response);

    render(<Stub initialEntries={['/main']} />);

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
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => responseMock,
    } as Response);

    const router = createMemoryRouter(routes, {
      initialEntries: [`${MAIN_ROUTE}?page=1`],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const nextPaginationButton = screen.getByTitle('next');

      expect(router.state.location.search).toBe('?page=1');

      fireEvent.click(nextPaginationButton);

      expect(router.state.location.search).toBe('?page=2');
    });
  });
});
