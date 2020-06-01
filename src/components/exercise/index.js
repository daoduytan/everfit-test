import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

import { useData } from '../../context';
import ExerciseAdd from './exercise_add';
import styles from './exercise.module.css';
import ExerciseItem from './exercise_item';
import Dropdown from '../dropdown';
import { Dot } from '../icon';

const Exercise = ({ exercise, index }) => {
  const { moveExercises, removeExercise } = useData();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveExercises(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'CARD', ...exercise, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const isExerciseItemBlank = !exercise.items || exercise.items.lenght === 0;

  const renderExerciseItems =
    exercise.items &&
    exercise.items.map((item) => <ExerciseItem key={item.id} item={item} />);

  const style = {
    opacity: isDragging ? 0 : 1,
    cursor: isDragging ? 'grabbing' : 'pointer',
  };

  const handleRemoveExercise = () => {
    removeExercise(exercise.id);
  };

  return (
    <div className={styles.exercise} ref={ref} style={{ ...style }}>
      <div className={styles.exercise_head}>
        <div className={styles.exercise_title}>{exercise.title}</div>
        <div className={styles.action}>
          <Dropdown
            title={
              <div className={styles.dots}>
                <Dot color="#C4C4C4" />
              </div>
            }
            menu={
              <div
                onClick={handleRemoveExercise}
                className={styles.remove_exercise}
              >
                Remove
              </div>
            }
          />
        </div>
      </div>

      {renderExerciseItems}
      <ExerciseAdd
        isExerciseItemBlank={isExerciseItemBlank}
        exerciseId={exercise.id}
      />
    </div>
  );
};

Exercise.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number,
    items: PropTypes.array,
  }),
  index: PropTypes.number,
};

export default Exercise;
