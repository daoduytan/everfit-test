import React from 'react';
import { useData } from '../../context';
import styles from './navigation_week.module.css';
import classes from './navigation_week.module.css';
import moment from 'moment';

const NavigationWeek = () => {
  const { setWeek, week } = useData();

  const handlePrevWeek = () => {
    if (week > 0) {
      setWeek(week - 1);
    }
  };

  const handleNextWeek = () => {
    setWeek(week + 1);
  };

  const style_prev_week =
    week === 0 ? `${styles.navigation_week}` : `${styles.navigation_week}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.date}>Date: {moment().format('DD/MM/YYYY')}</div>

      <div className={style_prev_week} onClick={handlePrevWeek}>
        Prev
      </div>

      <div className={classes.line} />

      <div onClick={handleNextWeek} className={styles.navigation_week}>
        Next
      </div>
    </div>
  );
};

export default NavigationWeek;
