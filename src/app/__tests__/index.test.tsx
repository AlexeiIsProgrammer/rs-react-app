import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stub } from '../../router/utils';

describe('App Component', () => {
  it('renders App', async () => {
    render(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Star Wars Character Search/i)
      ).toBeInTheDocument();
    });
  });
});
