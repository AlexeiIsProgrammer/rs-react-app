import type { CardProps } from './types';
import styles from './Card.module.scss';
import clsx from 'clsx';

const Card = ({
  character,
  onClick,
  checked,
  onCheckboxChange,
  isActive,
}: CardProps) => (
  <div
    onClick={onClick(character.id)}
    data-testid="card"
    className={clsx(styles.card, {
      [styles.active]: isActive,
    })}
  >
    <div className={styles.header}>
      <h3 className={styles.title}>{character.name}</h3>

      <input
        key={checked.toString()}
        type="checkbox"
        onChange={() => {}}
        checked={checked}
        onClick={onCheckboxChange(character, !checked)}
      />
    </div>
    <p className={styles.birth}>
      Born: {character.birth_year} | Gender: {character.gender}
    </p>
    <p className={styles.info}>
      Height: {character.height}cm, Mass: {character.mass}kg
    </p>
  </div>
);

export default Card;
