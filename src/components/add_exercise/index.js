import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './add_exercise.module.css';
import AddExerciseForm from './add_exercise_form';
import { Plus } from '../icon';

const AddExercise = ({ day }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  if (show) return <AddExerciseForm toggleShow={toggleShow} day={day} />;

  return (
    <div className={styles.add} onClick={toggleShow}>
      <Plus color="#a0a8b1" />
    </div>
  );
};

AddExercise.propTypes = {
  day: PropTypes.string,
};

export default AddExercise;
