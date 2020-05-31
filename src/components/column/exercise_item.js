import React from 'react';
import PropTypes from 'prop-types';
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

ExerciseItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    times: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default ExerciseItem;
