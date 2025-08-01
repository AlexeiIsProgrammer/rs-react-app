import '@testing-library/jest-dom';

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
