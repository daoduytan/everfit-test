import React, { useState } from 'react';
import { useData } from '../../context';
import { Input } from '../input';
import Button from '../button';
import styles from './exercise_add_item.module.css';

const FormAddItem = ({ toggle, exerciseId }) => {
  const initialState = {
    title: '',
    description: '',
    times: 1,
  };
  const { addExercisesItem } = useData();
  const [values, setValues] = useState(initialState);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      values.title.length === 0 ||
      values.description.length === 0 ||
      values.times === 0
    ) {
    } else {
      console.log(values);
      const item = { id: Date.now(), exerciseId, ...values };

      addExercisesItem(item);
      setValues(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 20 }}>Add exercise item</div>
        <span onClick={toggle} className={styles.close}>
          Close
        </span>
      </div>

      <Input
        placeholder="Title"
        name="title"
        value={values.title}
        onChange={handleOnChange}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Information"
        name="description"
        value={values.description}
        onChange={handleOnChange}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Times"
        name="times"
        type="number"
        value={values.times}
        onChange={handleOnChange}
        style={{ marginBottom: 10 }}
      />

      <Button block type="primary">
        Add
      </Button>
    </form>
  );
};

export default FormAddItem;
