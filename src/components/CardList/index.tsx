import React from 'react';
import Card from '../Card';
import type { Character } from '../../types/interfaces';

interface CardListProps {
  characters: Character[];
  loading: boolean;
}

const CardList: React.FC<CardListProps> = ({ characters, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No characters found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {characters.map((character, index) => (
        <Card key={index} character={character} />
      ))}
    </div>
  );
};

export default CardList;
