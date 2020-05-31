import React, { useState } from 'react';
import styles from './add_exercise.module.css';
import AddExerciseForm from './add_exercise_form';

const AddExercise = ({ day }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  if (show) return <AddExerciseForm toggleShow={toggleShow} day={day} />;

  return (
    <div className={styles.add} onClick={toggleShow}>
      +
    </div>
  );
};

export default AddExercise;
