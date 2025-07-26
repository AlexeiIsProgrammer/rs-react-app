import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../index';
import { brokenCharacter, mockCharacter } from '../../../../tests/setup';

describe('Card Component', () => {
  it('displays item name and description correctly', () => {
    render(<Card character={mockCharacter} onClick={() => {}} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/Born: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77kg/i)).toBeInTheDocument();
  });

  it('handles missing props gracefully', () => {
    render(<Card character={brokenCharacter} onClick={() => {}} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
