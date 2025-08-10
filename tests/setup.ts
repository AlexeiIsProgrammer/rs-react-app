import '@testing-library/jest-dom';

import { afterEach } from 'node:test';

import { afterAll, beforeAll, vi } from 'vitest';

import { server } from '../src/mocks/server';

export const mockCharacter = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  height: '172',
  mass: '77',
  id: '1',
};

export const brokenCharacter = {
  name: '',
  birth_year: '',
  gender: '',
  height: '',
  mass: '',
  id: '',
};

export const setViewport = (width: number, height: number = 720) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

export const defineGlobals = () => {
  global.URL.createObjectURL = vi.fn(() => 'mock-url');

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
