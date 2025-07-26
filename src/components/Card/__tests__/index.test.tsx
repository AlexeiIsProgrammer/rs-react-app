import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Card from '../index';
import { brokenCharacter, mockCharacter } from '../../../../tests/setup';

describe('Card Component', () => {
  const ACTIVE_CLASS = 'shadow-lg';
  const TEST_ID = 'card';
  beforeEach(() => {
    vi.clearAllMocks();
  });
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

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('handle click on Button', () => {
    const TEST_LOG = 'Call.';
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Card
        character={mockCharacter}
        onClick={() => {
          console.log(TEST_LOG);
        }}
      />
    );

    const card = screen.getByTestId(TEST_ID);

    expect(card).toBeInTheDocument();

    fireEvent.click(card);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(TEST_LOG);
  });

  it('handle active Card', () => {
    render(<Card character={mockCharacter} onClick={() => {}} isActive />);

    const card = screen.getByTestId(TEST_ID);

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(ACTIVE_CLASS);
  });
  it('handle not active Card', () => {
    render(<Card character={mockCharacter} onClick={() => {}} />);

    const card = screen.getByTestId(TEST_ID);

    expect(card).toBeInTheDocument();
    expect(card).not.toHaveClass(ACTIVE_CLASS);
  });
});
