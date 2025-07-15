import React from 'react';

interface SearchProps {
  initialValue: string;
  onSearch: (term: string) => void;
  loading: boolean;
}

interface SearchState {
  inputValue: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: props.initialValue,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (): void => {
    const processedTerm = this.state.inputValue.trim();
    this.props.onSearch(processedTerm);
  };

  render() {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <div className="flex gap-2">
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="Search characters..."
            className="flex-1 p-2 border border-gray-300 rounded"
            disabled={this.props.loading}
          />
          <button
            onClick={this.handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={this.props.loading}
          >
            {this.props.loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
