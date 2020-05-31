import React, { memo } from 'react';
import moment from 'moment';
import styles from './column.module.css';
import AddExercise from '../add_exercise';
import { useData } from '../../context';
import Exercise from './exercise';
import DropWrapper from '../board/drop-wrap';

const Column = ({ day }) => {
  const { exercises } = useData();
  const isDate = moment().format('DD/MM/YYYY') === day.date;

  const classDate = isDate
    ? `${styles.column_date} ${styles.column_date_active}`
    : styles.column_date;

  const filterExercises = exercises.filter((exercise) => {
    if (!exercise) return false;
    const date = moment(day.date, 'DD/MM/YYYY').format('DD/MM/YYYY');

    if (date === exercise.day) return true;

    return false;
  });

  return (
    <DropWrapper date={day.date}>
      <div className={styles.column}>
        <div className={styles.column_title}>{day.title}</div>

        <div className={styles.column_content}>
          <div className={classDate}>
            {moment(day.date, 'DD/MM/YYYY').format('DD')}
          </div>

          <div>
            {filterExercises.map((exercise, index) => (
              <Exercise key={exercise.id} exercise={exercise} index={index} />
            ))}
          </div>

          <AddExercise day={day.date} />
        </div>
      </div>
    </DropWrapper>
  );
};

export default memo(Column);
