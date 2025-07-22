import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { mockCharacter } from '../../../tests/setup';

const SEARCHED_TEXT = 'Luke Skywalker';
const SEARCHED_TERM = 'Luke';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('makes initial API call on component mount and handles search term from localStorage', async () => {
    const mockCharacters = [mockCharacter];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters.map((character) => ({ properties: character })),
      }),
    } as Response);

    localStorage.setItem('swapiSearch', SEARCHED_TERM);

    render(<App />);

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

    render(<App />);
    expect(screen.getByText(/searching.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/searching.../i)).not.toBeInTheDocument();
    });
  });

  it('calls API with correct parameters and handles successful API responses', async () => {
    const mockCharacters = [mockCharacter];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters.map((character) => ({ properties: character })),
      }),
    } as Response);

    render(<App />);

    const inputs = screen.getAllByTestId('search-input');
    const input = inputs[0];
    const buttons = screen.getAllByTestId('search-button');
    const button = buttons[0];

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

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('saves search term to localStorage when searching', async () => {
    const mockCharacters = [mockCharacter];

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters.map((character) => ({ properties: character })),
      }),
    } as Response);

    render(<App />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: SEARCHED_TERM } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(SEARCHED_TEXT)).toBeInTheDocument();
      expect(localStorage.getItem('swapiSearch')).toBe(SEARCHED_TERM);
    });
  });
});
