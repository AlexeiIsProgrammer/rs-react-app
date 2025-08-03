import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { routes } from '../../../router';
import Item from '..';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { MAIN_ROUTE } from '../../../constants';
import { StubProvider } from '../../../router/utils';
import { renderWithProviders } from '../../../store/util';
import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

describe('Item page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders details panel', async () => {
    renderWithProviders(<StubProvider element={<Item />} />);

    expect(screen.getByText('Character Details')).toBeInTheDocument();
  });

  it('makes initial API call on component mount', async () => {
    renderWithProviders(
      <StubProvider
        element={<Item />}
        route={`${MAIN_ROUTE}/:detailsId`}
        initialEntries={[`${MAIN_ROUTE}/1`]}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('manages loading states during API calls', async () => {
    server.use(
      http.get('https://www.swapi.tech/api/people/:id', async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return HttpResponse.json({});
      })
    );

    renderWithProviders(<StubProvider element={<Item />} />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('handles API error responses', async () => {
    server.use(
      http.get('https://www.swapi.tech/api/people/:id', () => {
        return HttpResponse.json(null, { status: 404 });
      })
    );

    renderWithProviders(<StubProvider element={<Item />} />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('handles click on close panel', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`${MAIN_ROUTE}/2`],
    });

    renderWithProviders(<RouterProvider router={router} />);

    const closeButton = screen.getByTitle('close');

    expect(router.state.location.pathname).toBe(`${MAIN_ROUTE}/2`);

    fireEvent.click(closeButton);

    expect(router.state.location.pathname).toBe(MAIN_ROUTE);
  });
});
