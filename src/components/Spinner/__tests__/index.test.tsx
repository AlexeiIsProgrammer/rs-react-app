import React from 'react';
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

  // Since Spinner has no props, no show/hide test based on loading prop is needed here.
  // Accessibility test: add aria-label if applicable in Spinner component for screen readers.
});
