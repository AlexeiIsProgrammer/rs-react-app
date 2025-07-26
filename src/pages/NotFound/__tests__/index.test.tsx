import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stub } from '../../../router';

describe('Not found page', () => {
  it('displays 404 text if page is not exists', () => {
    render(<Stub initialEntries={['/not-found-page']} />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
