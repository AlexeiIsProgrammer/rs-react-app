import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { StubProvider } from '../../../router/utils';
import Pagination from '..';

describe('Pagination Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('render pagination component', async () => {
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={100}
            itemsPerPage={10}
            currentPage={1}
            onPageChange={() => {}}
          />
        }
      />
    );

    const nextPaginationButton = screen.getByTitle('next');
    const prevPaginationButton = screen.getByTitle('prev');

    expect(nextPaginationButton).toBeInTheDocument();
    expect(prevPaginationButton).toBeInTheDocument();
  });

  it('render first ...', async () => {
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={100}
            itemsPerPage={10}
            currentPage={1}
            maxVisiblePages={5}
            onPageChange={() => {}}
          />
        }
      />
    );

    const manyDotesComponent = screen.getByText('...');

    expect(manyDotesComponent).toBeInTheDocument();
  });

  it('render two ...', async () => {
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={5}
            maxVisiblePages={5}
            onPageChange={() => {}}
          />
        }
      />
    );

    const manyDotesComponent = screen.getAllByText('...');

    expect(manyDotesComponent).toHaveLength(2);
  });

  it('render last ...', async () => {
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={9}
            maxVisiblePages={5}
            onPageChange={() => {}}
          />
        }
      />
    );

    const manyDotesComponent = screen.getByText('...');

    expect(manyDotesComponent).toBeInTheDocument();
  });

  it('click previous button', async () => {
    let page = 8;

    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={page}
            maxVisiblePages={5}
            onPageChange={(currentPage) => {
              page = currentPage;
            }}
          />
        }
      />
    );

    const prevButton = screen.getByTitle('prev');

    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(page).toBe(7);
  });

  it('click next button', async () => {
    let page = 8;
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={page}
            maxVisiblePages={5}
            onPageChange={(currentPage) => {
              page = currentPage;
            }}
          />
        }
      />
    );

    const nextButton = screen.getByTitle('next');

    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(page).toBe(9);
  });

  it('click first page button', async () => {
    let page = 5;
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={page}
            maxVisiblePages={5}
            onPageChange={(currentPage) => {
              page = currentPage;
            }}
          />
        }
      />
    );

    const firstButton = screen.getByText('1');

    expect(firstButton).toBeInTheDocument();

    fireEvent.click(firstButton);

    expect(page).toBe(1);
  });

  it('click first page button', async () => {
    let page = 5;
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={page}
            maxVisiblePages={5}
            onPageChange={(currentPage) => {
              page = currentPage;
            }}
          />
        }
      />
    );

    const firstButton = screen.getByText('1');

    expect(firstButton).toBeInTheDocument();

    fireEvent.click(firstButton);

    expect(page).toBe(1);
  });

  it('click last page button', async () => {
    let page = 5;

    const TOTAL_ITEMS = 82;
    const ITEMS_PER_PAGE = 10;

    const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);
    render(
      <StubProvider
        element={
          <Pagination
            totalItems={TOTAL_ITEMS}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            maxVisiblePages={5}
            onPageChange={(currentPage) => {
              page = currentPage;
            }}
          />
        }
      />
    );

    const lastButton = screen.getByText(totalPages);

    expect(lastButton).toBeInTheDocument();

    fireEvent.click(lastButton);

    expect(page).toBe(totalPages);
  });

  it('click digit button (4)', async () => {
    let page = 5;

    const fourPage = 4;

    render(
      <StubProvider
        element={
          <Pagination
            totalItems={82}
            itemsPerPage={10}
            currentPage={page}
            maxVisiblePages={5}
            onPageChange={(currentPage) => {
              page = currentPage;
            }}
          />
        }
      />
    );

    const fourButton = screen.getByText(fourPage);

    expect(fourButton).toBeInTheDocument();

    fireEvent.click(fourButton);

    expect(page).toBe(fourPage);
  });
});
