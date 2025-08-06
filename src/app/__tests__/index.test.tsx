import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { Stub } from '../../router/utils';
import { renderWithProviders } from '../../store/util';
import { defineGlobals } from '../../../tests/setup';

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
