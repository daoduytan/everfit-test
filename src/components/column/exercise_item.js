import React from 'react';
import styles from './exercise_item.module.css';

const ExerciseItem = ({ item }) => {
  return (
    <div className={styles.exercise_item}>
      <div className={styles.exercise_item_title}>{item.title}</div>
      <div className={styles.content}>
        <div className={styles.times}>{item.times}x</div>
        <div className={styles.description}>{item.description}</div>
      </div>
    </div>
  );
};

export default ExerciseItem;
