import { screen } from '@testing-library/react';
import { defineGlobals } from 'tests/setup';
import { beforeAll, describe, expect, it } from 'vitest';

import { Stub } from '#router/utils';
import { renderWithProviders } from '#store/util';

describe('About page', () => {
  beforeAll(() => {
    defineGlobals();
  });

  it('displays text correctly', () => {
    renderWithProviders(<Stub initialEntries={['/about']} />);

    expect(screen.getByTitle(/React course/)).toBeInTheDocument();
    expect(screen.getByTitle('Back to main')).toBeInTheDocument();
  });
});
