import React, { type FormEvent, useState } from 'react';

import { INPUT_PLACEHOLDER } from '#constants/index';

import styles from './Search.module.scss';
import type { SearchProps } from './types';

function Search({ initialValue, onSearch, loading }: SearchProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const processedTerm = inputValue.trim();
    onSearch(processedTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <form role="form" className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={INPUT_PLACEHOLDER}
          className={styles.searchInput}
          disabled={loading}
          data-testid="search-input"
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading}
          data-testid="search-button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}

export default Search;
