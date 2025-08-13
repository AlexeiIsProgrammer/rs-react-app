import { screen, waitFor } from '@testing-library/react';
import { defineGlobals } from 'tests/setup';
import { beforeAll, describe, expect, it } from 'vitest';

import { Stub } from '#router/utils';
import { renderWithProviders } from '#store/util';

describe('App Component', () => {
  beforeAll(() => {
    defineGlobals();
  });

  it('renders App', async () => {
    renderWithProviders(<Stub initialEntries={['/']} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Star Wars Character Search/i)
      ).toBeInTheDocument();
    });
  });
});
