import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from '../index';

const charactersMock = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    height: '172',
    mass: '77',
  },
  {
    name: 'Leia Organa',
    birth_year: '19BBY',
    gender: 'female',
    height: '150',
    mass: '49',
  },
];

describe('CardList Component', () => {
  it('renders correct number of items when data is provided', () => {
    const { container } = render(
      <CardList characters={charactersMock} loading={false} />
    );
    const cards = within(container).getAllByText(/Born:/i);
    expect(cards.length).toBe(charactersMock.length);
  });

  it('displays "no results" message when data array is empty', () => {
    render(<CardList characters={[]} loading={false} />);
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    const { container } = render(<CardList characters={[]} loading={true} />);
    expect(
      container.querySelectorAll('div.animate-pulse').length
    ).toBeGreaterThan(0);
  });

  it('correctly displays item names and descriptions', () => {
    render(<CardList characters={charactersMock} loading={false} />);
    expect(screen.getAllByText('Luke Skywalker')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Born: 19BBY/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Gender: male/i)[0]).toBeInTheDocument();
  });

  it('handles missing or undefined data gracefully', () => {
    const incompleteCharacters = [
      { name: 'Unknown', birth_year: '', gender: '', height: '', mass: '' },
    ];
    render(<CardList characters={incompleteCharacters} loading={false} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
