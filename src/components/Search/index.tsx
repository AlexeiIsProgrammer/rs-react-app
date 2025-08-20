import { useTranslations } from 'next-intl';
import React, { type FormEvent, useState } from 'react';

import styles from './Search.module.scss';
import type { SearchProps } from './types';

function Search({ initialValue, onSearch, loading }: SearchProps) {
  const t = useTranslations('HomePage');
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
          placeholder={t('search_characters')}
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
          {loading ? t('searching') : t('search')}
        </button>
      </form>
    </div>
  );
}

export default Search;
