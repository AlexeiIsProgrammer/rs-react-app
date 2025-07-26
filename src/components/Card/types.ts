import type { Character } from '../../types/interfaces';

export type CardProps = {
  character: Character;
  onClick: (id: string) => void;
  isActive: boolean;
};
