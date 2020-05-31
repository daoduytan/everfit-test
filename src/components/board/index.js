import React from 'react';

import styles from './board.module.css';
import Column from '../column';
import { useData } from '../../context';

const Board = () => {
  const { dates } = useData();

  return (
    <div className={styles.board}>
      {dates.map((date, index) => (
        <Column key={date.id} day={date} />
      ))}
    </div>
  );
};

export default Board;
