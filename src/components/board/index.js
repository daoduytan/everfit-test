import React, { memo } from 'react';

import { useData } from '../../context';
import styles from './board.module.css';
import Column from '../column';

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

export default memo(Board);
