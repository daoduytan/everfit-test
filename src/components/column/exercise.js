import React, { useRef } from 'react';
import ExerciseAdd from './exercise_add';
import styles from './exercise.module.css';
import ExerciseItem from './exercise_item';

import { useDrag, useDrop } from 'react-dnd';
import { useData } from '../../context';
import Dropdown from '../dropdown';

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
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // console.log(dragIndex, hoverIndex);
      moveExercises(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'CARD', id: exercise.id, index },
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
                <span />
                <span />
                <span />
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

export default Exercise;
