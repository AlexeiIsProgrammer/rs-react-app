import { render, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../index';
import { brokenCharacter, mockCharacter } from '../../../../tests/setup';

describe('Card Component', () => {
  it('displays item name and description correctly', () => {
    const { container } = render(<Card character={mockCharacter} />);
    const card = container.firstChild;
    if (!card || !(card instanceof HTMLElement)) {
      throw new Error('Card container not found');
    }
    expect(within(card).getByText('Luke Skywalker')).toBeInTheDocument();
    expect(within(card).getByText(/Born: 19BBY/i)).toBeInTheDocument();
    expect(within(card).getByText(/Gender: male/i)).toBeInTheDocument();
    expect(within(card).getByText(/Height: 172cm/i)).toBeInTheDocument();
    expect(within(card).getByText(/Mass: 77kg/i)).toBeInTheDocument();
  });

  it('handles missing props gracefully', () => {
    const { container } = render(<Card character={brokenCharacter} />);
    const card = container.firstChild;
    if (!card || !(card instanceof HTMLElement)) {
      throw new Error('Card container not found');
    }
    expect(within(card).getAllByText('')[0]).toBeInTheDocument();
  });
});
