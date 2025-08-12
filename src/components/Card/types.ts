import type { MouseEvent } from 'react';

import type { Character } from '#types/interfaces';

export type CardProps = {
  character: Character;
  onClick: (id: string) => (e: MouseEvent<HTMLDivElement>) => void;
  onCheckboxChange: (
    item: Character,
    checked: boolean
  ) => (e: MouseEvent<HTMLInputElement>) => void;
  checked: boolean;
  isActive?: boolean;
};
