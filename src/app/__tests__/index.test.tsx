import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('makes initial API call on component mount and handles search term from localStorage', async () => {
    const mockCharacters = [
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
      },
    ];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters.map((c) => ({ properties: c })),
      }),
    } as Response);

    localStorage.setItem('swapiSearch', 'Luke');

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Results for "Luke"/i)).toBeInTheDocument();
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
    const mockCharacters = [
      {
        name: 'Leia Organa',
        birth_year: '19BBY',
        gender: 'female',
        height: '150',
        mass: '49',
      },
    ];
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters.map((c) => ({ properties: c })),
      }),
    } as Response);

    render(<App />);

    const inputs = screen.getAllByTestId('search-input');
    const input = inputs[0];
    const buttons = screen.getAllByTestId('search-button');
    const button = buttons[0];

    fireEvent.change(input, { target: { value: 'Leia' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
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
    const mockCharacters = [
      {
        name: 'Han Solo',
        birth_year: '29BBY',
        gender: 'male',
        height: '180',
        mass: '80',
      },
    ];

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockCharacters.map((c) => ({ properties: c })),
      }),
    } as Response);

    render(<App />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'Han' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Han Solo')).toBeInTheDocument();
      expect(localStorage.getItem('swapiSearch')).toBe('Han');
    });
  });
});
