import React, { useState, type FormEvent } from 'react';
import { INPUT_PLACEHOLDER } from '../../constants';
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
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <form role="form" className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={INPUT_PLACEHOLDER}
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={loading}
          data-testid="search-input"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
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
