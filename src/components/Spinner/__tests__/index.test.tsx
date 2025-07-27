import { render, screen } from '@testing-library/react';
import Spinner from '../index';
import { describe, it, expect } from 'vitest';

describe('Spinner Component', () => {
  it('renders loading indicator (spinner)', () => {
    render(<Spinner />);
    const spinner =
      screen.getByRole('status', { hidden: true }) ||
      screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
