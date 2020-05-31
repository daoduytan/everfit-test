import React, { useState } from 'react';
import styles from './add_exercise_form.module.css';
import { useData } from '../../context';
import Button from '../button';
import { Input } from '../input';

const AddExerciseForm = ({ toggleShow, day }) => {
  const { addExercises } = useData();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.length > 0) {
      const exercise = {
        id: Date.now(),
        day,
        title: text,
      };

      addExercises(exercise);
      toggleShow();
    }
  };

  const onChangetext = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 10 }}>
        <Input onChange={onChangetext} />
      </div>

      <Button type="primary" style={{ marginRight: 10 }}>
        Add
      </Button>
      <span
        className={styles.button}
        style={{ marginLeft: 5 }}
        onClick={toggleShow}
      >
        Close
      </span>
    </form>
  );
};

export default AddExerciseForm;
