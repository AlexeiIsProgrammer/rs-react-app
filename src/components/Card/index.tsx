import React from 'react';
import type { Character } from '../../types/interfaces';

interface CardProps {
  character: Character;
}

const Card: React.FC<CardProps> = ({ character }) => (
  <div
    data-testid="card"
    className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
  >
    <h3 className="text-lg font-semibold text-gray-800">{character.name}</h3>
    <p className="text-gray-600">
      Born: {character.birth_year} | Gender: {character.gender}
    </p>
    <p className="text-sm text-gray-500 mt-1">
      Height: {character.height}cm, Mass: {character.mass}kg
    </p>
  </div>
);

export default Card;
