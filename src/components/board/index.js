import React, { useEffect, useState } from 'react';
import moment from 'moment';

import styles from './board.module.css';
import Column from '../column';
import days from './days';
import { useData } from '../../context';

const Board = () => {
  const { week } = useData();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // const weekStart = moment().startOf('isoweek');

    const weekStart = moment().year(2020).week(week).startOf('isoweek');

    let ds = [];

    for (let index = 0; index <= 6; index += 1) {
      const dateValue = moment(weekStart)
        .add(index, 'days')
        .format('DD/MM/YYYY');

      ds = [...ds, dateValue];
    }

    setDates(ds);
  }, [week]);

  return (
    <div className={styles.board}>
      {days.map((day, index) => (
        <Column key={day.id} day={{ ...day, date: dates[index] }} />
      ))}
    </div>
  );
};

export default Board;
