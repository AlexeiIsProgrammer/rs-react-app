import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { routes, StubProvider } from '../../../router';
import { mockCharacter } from '../../../../tests/setup';
import Item from '..';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { MAIN_ROUTE } from '../../../constants';

describe('Item page', () => {
  const responseMock = { result: { properties: mockCharacter, uid: '1' } };

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders details panel', async () => {
    render(<StubProvider element={<Item />} />);

    expect(screen.getByText('Character Details')).toBeInTheDocument();
  });
  it('makes initial API call on component mount', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => responseMock,
    } as Response);

    render(<StubProvider element={<Item />} />);

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('manages loading states during API calls', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => responseMock,
            } as Response);
          }, 100);
        })
    );

    render(<StubProvider element={<Item />} />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('handles API error responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    render(<StubProvider element={<Item />} />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('handles click on close panel', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`${MAIN_ROUTE}/2`],
    });

    render(<RouterProvider router={router} />);

    const closeButton = screen.getByTitle('close');

    expect(router.state.location.pathname).toBe(`${MAIN_ROUTE}/2`);

    fireEvent.click(closeButton);

    expect(router.state.location.pathname).toBe(MAIN_ROUTE);
  });
});
