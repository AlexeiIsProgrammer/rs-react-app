import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stub } from '../../router/utils';
import { renderWithProviders } from '../../store/util';

describe('App Component', () => {
  it('renders App', async () => {
    renderWithProviders(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Star Wars Character Search/i)
      ).toBeInTheDocument();
    });
  });
});
