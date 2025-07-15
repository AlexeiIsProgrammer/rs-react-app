import React from 'react';
import Search from './components/Search';
import CardList from './components/CardList';
import Spinner from './components/Spinner';

interface Character {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
}

interface SwapiResult {
  properties: Character;
}
interface SwapiResponse {
  results?: SwapiResult[];
  result?: SwapiResult[];
}

interface AppState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  boundaryError: boolean;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      loading: false,
      error: null,
      searchTerm: localStorage.getItem('swapiSearch') || '',
      boundaryError: false,
    };
  }

  componentDidMount(): void {
    this.fetchCharacters(this.state.searchTerm);
  }

  fetchCharacters = (searchTerm: string): void => {
    this.setState({ loading: true, error: null });

    const apiUrl = `https://www.swapi.tech/api/people/?name=${encodeURIComponent(searchTerm)}&expanded=true`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        return response.json();
      })
      .then((data: SwapiResponse) => {
        this.setState({
          characters:
            (data?.results || data?.result)?.map(
              (character) => character?.properties
            ) || [],
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message || 'Failed to fetch data',
          loading: false,
          characters: [],
        });
      });
  };

  handleSearch = (term: string): void => {
    localStorage.setItem('swapiSearch', term);
    this.setState({ searchTerm: term }, () => {
      this.fetchCharacters(term);
    });
  };

  throwTestError = (): void => {
    this.setState({
      boundaryError: true,
    });
  };

  render() {
    const { characters, loading, error, searchTerm, boundaryError } =
      this.state;

    if (boundaryError) throw new Error('Test error triggered by button click');

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Star Wars Character Search
            </h1>
            <div className="flex justify-center mb-4">
              <button
                onClick={this.throwTestError}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Trigger Test Error
              </button>
            </div>
            <Search
              initialValue={searchTerm}
              onSearch={this.handleSearch}
              loading={loading}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {searchTerm ? `Results for "${searchTerm}"` : 'All Characters'}
            </h2>

            {error ? (
              <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300">
                Error: {error}
              </div>
            ) : (
              <>
                {loading && <Spinner />}
                <CardList characters={characters} loading={loading} />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
