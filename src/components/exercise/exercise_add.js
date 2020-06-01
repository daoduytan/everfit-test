import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './exercise_add.module.css';
import FormAddItem from './exercise_add_item';
import { Plus } from '../icon';

const ExerciseAdd = ({ isExerciseItemBlank, exerciseId }) => {
  const [show, setShow] = useState(false);
  const style = {
    textAlign: isExerciseItemBlank ? 'center' : 'right',
    marginTop: 2,
  };

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div style={style}>
      {show && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <FormAddItem toggle={toggleShow} exerciseId={exerciseId} />
          </div>
          {show && <div className={styles.overlay} onClick={toggleShow} />}
        </div>
      )}

      <div className={styles.button_add} onClick={toggleShow}>
        <Plus />
      </div>
    </div>
  );
};

ExerciseAdd.propTypes = {
  isExerciseItemBlank: PropTypes.bool,
  exerciseId: PropTypes.number,
};

export default ExerciseAdd;
