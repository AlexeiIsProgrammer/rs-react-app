import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App component', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText(/Star Wars Character Search/i));
  });
});
