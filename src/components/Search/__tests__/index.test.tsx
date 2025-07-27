import { render, fireEvent, screen } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import Search from '../index';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders search input and search button', () => {
    render(<Search initialValue="" onSearch={() => {}} loading={false} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('swapiSearch', 'saved term');
    render(
      <Search
        initialValue={localStorage.getItem('swapiSearch') || ''}
        onSearch={() => {}}
        loading={false}
      />
    );

    const input = screen.getByDisplayValue('saved term');
    expect(input).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search initialValue="" onSearch={() => {}} loading={false} />);

    const input = screen.getByDisplayValue('');
    expect(input).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    render(<Search initialValue="" onSearch={() => {}} loading={false} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input).toHaveValue('new value');
  });

  it('saves search term to localStorage and triggers onSearch with trimmed input when search button is clicked', () => {
    const onSearchMock = vi.fn();
    render(<Search initialValue="" onSearch={onSearchMock} loading={false} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: '  test term  ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('test term');
  });

  it('disables input and button when loading is true', () => {
    render(<Search initialValue="" onSearch={() => {}} loading={true} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
