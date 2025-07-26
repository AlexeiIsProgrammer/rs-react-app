import type { CardProps } from './types';

const Card = ({ character, onClick, isActive }: CardProps) => (
  <div
    onClick={() => onClick(character.id)}
    data-testid="card"
    className={`p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow ${isActive ? 'shadow-lg' : ''}`}
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
