import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StubProvider } from '../../../router';
import { mockCharacter } from '../../../../tests/setup';
import Item from '..';

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

    waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  // it('handles click on close panel', async () => {
  //   render(<Stub initialEntries={['/main/2']} />);

  //   const closeButton = screen.getByTitle('close');

  //   expect(location.pathname).toBe('/main/2');

  //   fireEvent.click(closeButton);

  //   expect(location.pathname).toBe('/main');
  // });
});
