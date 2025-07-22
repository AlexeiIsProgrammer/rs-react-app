import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from '../index';

const charactersMock = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'other',
    height: '172',
    mass: '77',
  },
  {
    name: 'Leia Organa',
    birth_year: '19BYT',
    gender: 'female',
    height: '150',
    mass: '49',
  },
];

describe('CardList Component', () => {
  it('renders correct number of items when data is provided', () => {
    render(<CardList characters={charactersMock} loading={false} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(charactersMock.length);
  });

  it('displays "no results" message when data array is empty', () => {
    render(<CardList characters={[]} loading={false} />);
    expect(screen.getByTestId('not-items-found')).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(<CardList characters={[]} loading={true} />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(5);
  });

  it('correctly displays item names and descriptions', () => {
    render(<CardList characters={charactersMock} loading={false} />);

    charactersMock.forEach((character) => {
      expect(
        screen.getByText(new RegExp(character.name, 'i'))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(character.birth_year, 'i'))
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(character.gender, 'i'))
      ).toBeInTheDocument();
    });
  });

  it('handles missing or undefined data gracefully', () => {
    const incompleteCharacters = [
      { name: 'Unknown', birth_year: '', gender: '', height: '', mass: '' },
    ];
    render(<CardList characters={incompleteCharacters} loading={false} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
