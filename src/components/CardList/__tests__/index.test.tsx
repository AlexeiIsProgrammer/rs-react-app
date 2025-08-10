import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { beforeAll, describe, expect, it } from 'vitest';

import { defineGlobals } from '../../../../tests/setup';
import { StubProvider } from '../../../router/utils';
import { renderWithProviders } from '../../../store/util';
import type { Character } from '../../../types/interfaces';
import CardList from '../index';

const charactersMock: Character[] = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'other',
    height: '172',
    mass: '77',
    id: '1',
  },
  {
    name: 'Leia Organa',
    birth_year: '19BYT',
    gender: 'female',
    height: '150',
    mass: '49',
    id: '2',
  },
];

describe('CardList Component', () => {
  beforeAll(() => {
    defineGlobals();
  });

  it('renders correct number of items when data is provided', () => {
    renderWithProviders(
      <StubProvider
        element={<CardList characters={charactersMock} isLoading={false} />}
      />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(charactersMock.length);
  });

  it('displays "no results" message when data array is empty', () => {
    renderWithProviders(
      <StubProvider element={<CardList characters={[]} isLoading={false} />} />
    );
    expect(screen.getByTestId('not-items-found')).toBeInTheDocument();
  });

  it('shows isLoading state while fetching data', () => {
    renderWithProviders(
      <StubProvider element={<CardList characters={[]} isLoading={true} />} />
    );
    expect(screen.getAllByTestId('skeleton')).toHaveLength(5);
  });

  it('correctly displays item names and descriptions', () => {
    renderWithProviders(
      <StubProvider
        element={<CardList characters={charactersMock} isLoading={false} />}
      />
    );

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
      {
        name: 'Unknown',
        birth_year: '',
        gender: '',
        height: '',
        mass: '',
        id: '1',
      },
    ];
    renderWithProviders(
      <StubProvider
        element={
          <CardList characters={incompleteCharacters} isLoading={false} />
        }
      />
    );
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
