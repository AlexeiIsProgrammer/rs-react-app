import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Spinner from '..';

describe('Spinner Component', () => {
  it('renders loading indicator (spinner)', () => {
    render(<Spinner />);
    const spinner =
      screen.getByRole('status', { hidden: true }) ||
      screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
