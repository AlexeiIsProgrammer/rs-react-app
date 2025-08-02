import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stub } from '../../../router/utils';

describe('About page', () => {
  it('displays text correctly', () => {
    render(<Stub initialEntries={['/about']} />);

    expect(screen.getByTitle('React course')).toBeInTheDocument();
    expect(screen.getByTitle('Back to main')).toBeInTheDocument();
  });
});
