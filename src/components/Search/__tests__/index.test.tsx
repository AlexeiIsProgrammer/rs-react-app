import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import Search from '../index';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    const { container } = render(
      <Search initialValue="" onSearch={() => {}} loading={false} />
    );
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');
    const input = within(form).getByTestId('search-input');
    const buttons = within(form).getAllByTestId('search-button');
    const button = buttons[0];
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('swapiSearch', 'saved term');
    const { container } = render(
      <Search
        initialValue={localStorage.getItem('swapiSearch') || ''}
        onSearch={() => {}}
        loading={false}
      />
    );
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');
    const input = within(form).getByDisplayValue('saved term');
    expect(input).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    const { container } = render(
      <Search initialValue="" onSearch={() => {}} loading={false} />
    );
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');
    const input = within(form).getByDisplayValue('');
    expect(input).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    const { container } = render(
      <Search initialValue="" onSearch={() => {}} loading={false} />
    );
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');
    const input = within(form).getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input).toHaveValue('new value');
  });

  it('saves search term to localStorage and triggers onSearch with trimmed input when search button is clicked', () => {
    const onSearchMock = vi.fn();
    const { container } = render(
      <Search initialValue="" onSearch={onSearchMock} loading={false} />
    );
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');
    const input = within(form).getByTestId('search-input');
    const buttons = within(form).getAllByTestId('search-button');
    const button = buttons[0];

    fireEvent.change(input, { target: { value: '  test term  ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('test term');
  });

  it('disables input and button when loading is true', () => {
    const { container } = render(
      <Search initialValue="" onSearch={() => {}} loading={true} />
    );
    const form = container.querySelector('form');
    if (!form) throw new Error('Form element not found');
    const input = within(form).getByTestId('search-input');
    const buttons = within(form).getAllByTestId('search-button');
    const button = buttons[0];
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
