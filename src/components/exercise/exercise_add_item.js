import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setErrors({});
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors_values = {};

    if (values.title.length === 0) errors_values.title = true;
    if (values.description.length === 0) errors_values.description = true;
    if (values.times === 0) errors_values.times = true;

    return errors_values;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors_values = validate();

    if (Object.keys(errors_values).length > 0) {
      setErrors(errors_values);
    } else {
      console.log(values);
      const item = { id: Date.now(), exerciseId, ...values };

      addExercisesItem(item);
      setValues(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.head}>
        <div style={{ fontSize: 20 }}>Add exercise item</div>
        <span onClick={toggle} className={styles.close}>
          Close
        </span>
      </div>

      <div className={styles.form_item}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>

        <Input
          id="title"
          name="title"
          placeholder="Ex. Bench Press Medium Grip"
          value={values.title}
          onChange={handleOnChange}
          autoFocus
        />
        {errors.title && <span className={styles.error}>Required</span>}
      </div>
      <div className={styles.form_item}>
        <label htmlFor="description" className={styles.label}>
          Information
        </label>

        <Input
          id="description"
          name="description"
          placeholder="Ex. 50 lb x 5, 60 lb x 5, 70 lb x 5"
          value={values.description}
          onChange={handleOnChange}
        />
        {errors.description && <span className={styles.error}>Required</span>}
      </div>
      <div className={styles.form_item}>
        <label htmlFor="times" className={styles.label}>
          Times
        </label>
        <Input
          id="times"
          name="times"
          type="number"
          min={1}
          value={values.times}
          onChange={handleOnChange}
          style={{ marginBottom: 10 }}
        />
        {errors.times && <span className={styles.error}>Required</span>}
      </div>

      <Button block type="primary" size="large">
        Add
      </Button>
    </form>
  );
};

FormAddItem.propTypes = {
  toggle: PropTypes.func,
  exerciseId: PropTypes.number,
};

export default FormAddItem;
